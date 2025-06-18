package main

import (
	"fmt"
	"log"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/deveasyclick/tilvio/internal/config"
	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	s3Client "github.com/deveasyclick/tilvio/pkg/s3"
	"github.com/deveasyclick/tilvio/pkg/tile"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type UploadedFile struct {
	FileName string
	URL      string
}

type FailedFile struct {
	FileName string
	Error    error
}

func main() {
	db := DB{}
	dbInstance := db.Connect()
	//defer db.Close()

	if len(os.Args) < 2 {
		log.Fatal("❌ Please provide the manufacturer name as the first argument.")
	}
	manufacturer := os.Args[1]
	dir := filepath.Join(config.BASE_URL, "assets", "images", manufacturer)
	uploaded, failed, err := ParallelUpload(dir, config.AWS_S3_TILES_BUCKET, 5)
	if err != nil {
		log.Fatal("WalkDir error:", err)
		return
	}
	fmt.Printf("✅ %d uploaded, ❌ %d failed\n", len(uploaded), len(failed))

	err = saveToDatabase(dbInstance, uploaded, manufacturer)
	if err != nil {
		slog.Error("failed to save to database", "error", err)
		return
	}
	fmt.Println("Current working directory:", dir)
}

func CapitalizeFirst(s string) string {
	if s == "" {
		return s
	}
	return strings.ToUpper(s[:1]) + s[1:]
}

func ParallelUpload(baseDir string, bucket string, workers int) ([]UploadedFile, []FailedFile, error) {
	var uploaded []UploadedFile
	var failed []FailedFile
	var mu sync.Mutex
	var wg sync.WaitGroup

	fileChan := make(chan string)

	// Start worker goroutines
	for i := 0; i < workers; i++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			for path := range fileChan {
				relPath := strings.TrimPrefix(path, baseDir+"/")
				key := "images/" + relPath

				url, err := uploadWithRetry(key, path, bucket, 3)
				mu.Lock()
				if err != nil {
					log.Printf("❌ Worker %d failed to upload %s: %v", workerID, relPath, err)
					failed = append(failed, FailedFile{FileName: relPath, Error: err})
				} else {
					uploaded = append(uploaded, UploadedFile{FileName: relPath, URL: url})
					fmt.Printf("✅ Worker %d uploaded: %s → %s\n", workerID, relPath, url)
				}
				mu.Unlock()
			}
		}(i)
	}

	// Walk and send file paths to workers
	err := filepath.WalkDir(baseDir, func(path string, d os.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}

		fileChan <- path
		return nil
	})

	close(fileChan) // no more files

	wg.Wait() // wait for all workers to finish

	return uploaded, failed, err
}

/**
* Manufacturer = goodwill, goldencrown, royalcastle
 */
func saveToDatabase(db *gorm.DB, files []UploadedFile, manufacturer string) error {
	manufacturerRepo := repository.NewManufacturerRepository(db)
	manufacturerService := service.NewManufacturerService(manufacturerRepo)
	DBManufacturer, err := manufacturerService.FindOrCreate(map[string]any{"name": CapitalizeFirst(manufacturer)})

	if err != nil {
		return err
	}

	var tiles []models.Tile
	var fileWithoutMetadata []string
	for _, file := range files {
		code, dimension, err := parseTileString(file.FileName)
		if err != nil {
			slog.Error("failed to parse tile string", "error", err, "file", file.FileName)
			continue
		}
		tileMedata, err := tile.GetTileMetadata(DBManufacturer.Name, code)
		if err != nil {
			slog.Error("failed to get tile metadata", "error", err, "file", file.FileName)
			fileWithoutMetadata = append(fileWithoutMetadata, file.FileName)
			continue
		}

		tiles = append(tiles, models.Tile{
			Code:           code,
			ImageURL:       file.URL,
			ManufacturerID: DBManufacturer.ID,
			Dimension:      dimension,
			WeightInKg:     tileMedata.WeightInKg,
			Type:           tileMedata.Type,
			Description:    tileMedata.Description,
		})
	}

	result := db.Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "code"}},
		DoNothing: true,
	}).Create(&tiles)

	if result.Error != nil {
		slog.Error("failed to insert tiles", "error", result.Error)
	} else {
		slog.Info("✅ Inserted tiles", "count", result.RowsAffected)
	}

	if len(fileWithoutMetadata) > 0 {
		slog.Error("❌ Failed to fix metadata for files", "files", fileWithoutMetadata)
	}

	return nil
}

func parseTileString(s string) (code, dimension string, err error) {
	parts := strings.Split(s, "_")
	if len(parts) != 2 {
		return "", "", fmt.Errorf("invalid format, expected 'code_dimension'")
	}
	return parts[0], parts[1], nil
}

func uploadWithRetry(key, path, bucket string, maxRetries int) (string, error) {
	var lastErr error
	backoff := time.Second

	for i := 0; i < maxRetries; i++ {
		url, err := s3Client.Upload(key, path, bucket)
		if err == nil {
			return url, nil
		}

		lastErr = err
		time.Sleep(backoff)
		backoff *= 2 // Exponential backoff: 1s → 2s → 4s ...

		// Optionally log each retry
		log.Printf("Retry %d for %s after error: %v", i+1, path, err)
	}

	return "", fmt.Errorf("failed after %d retries: %w", maxRetries, lastErr)
}
