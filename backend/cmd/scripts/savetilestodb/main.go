package main

import (
	"fmt"
	"log"
	"log/slog"
	"os"
	"path/filepath"
	"strings"

	"github.com/deveasyclick/tilvio/cmd/scripts"
	"github.com/deveasyclick/tilvio/internal/config"
	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/deveasyclick/tilvio/pkg/tile"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

const (
	s3BaseImagePath = "images"
)

type File struct {
	Key  string
	Name string
}

func main() {
	db := scripts.DB{}
	dbInstance := db.Connect()
	//defer db.Close()

	if len(os.Args) < 2 {
		log.Fatal("❌ Please provide the manufacturer name as the first argument.")
	}
	manufacturer := os.Args[1]
	dir := filepath.Join(config.BASE_URL, "assets", "images", manufacturer)
	files, err := GetFileNames(dir, strings.ToLower(manufacturer))
	if err != nil {
		log.Fatal("WalkDir error:", err)
		return
	}
	fmt.Printf("✅ %d files \n", len(files))

	err = saveToDatabase(dbInstance, files, manufacturer)
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

/**
* Get all files in the baseDir and generate there s3 keys based on the local file name and the manufacturer name. The files are already uploaded to s3 and will have this path structure images/${manufacturer}/${code}_${dimension}.png
 */
func GetFileNames(baseDir string, manufacturer string) ([]File, error) {
	var uploaded []File
	folder := fmt.Sprintf("%s/%s/", s3BaseImagePath, manufacturer)
	err := filepath.WalkDir(baseDir, func(path string, d os.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		relPath := strings.TrimPrefix(path, baseDir+"/")
		s3Key := folder + relPath

		uploaded = append(uploaded, File{Key: s3Key, Name: relPath})
		return nil
	})

	if err != nil {
		return nil, err
	}

	return uploaded, nil
}

/**
* Manufacturer = goodwill, goldencrown, royalcastle
 */
func saveToDatabase(db *gorm.DB, files []File, manufacturer string) error {
	manufacturerRepo := repository.NewManufacturerRepository(db)
	manufacturerService := service.NewManufacturerService(manufacturerRepo)
	DBManufacturer, err := manufacturerService.FindOrCreate(map[string]any{"name": CapitalizeFirst(manufacturer)})

	if err != nil {
		return err
	}

	var tiles []models.Tile
	var fileWithoutMetadata []string
	for _, file := range files {
		code, dimension, err := parseTileString(file.Name)
		if err != nil {
			slog.Error("failed to parse tile string", "error", err, "file", file.Name)
			continue
		}
		tileMedata, err := tile.GetTileMetadata(DBManufacturer.Name, code)
		if err != nil {
			slog.Error("failed to get tile metadata", "error", err, "file", file.Name)
			fileWithoutMetadata = append(fileWithoutMetadata, file.Name)
			continue
		}

		tiles = append(tiles, models.Tile{
			Code:           code,
			ManufacturerID: DBManufacturer.ID,
			Dimension:      dimension,
			WeightInKg:     tileMedata.WeightInKg,
			Type:           tileMedata.Type,
			Description:    tileMedata.Description,
			S3Key:          file.Key,
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

// parse 40001_400X400.png to 40001 and 400X400
func parseTileString(s string) (code, dimension string, err error) {
	base := strings.TrimSuffix(s, filepath.Ext(s))
	parts := strings.Split(base, "_")
	if len(parts) != 2 {
		return "", "", fmt.Errorf("invalid format, expected 'code_dimension'")
	}
	return parts[0], parts[1], nil
}
