package db

import (
	"fmt"
	"log"
	"log/slog"

	"github.com/deveasyclick/tilvio/internal/config"
	"github.com/deveasyclick/tilvio/internal/models"
	_ "github.com/jackc/pgx/v5/stdlib"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Service struct {
	DB *gorm.DB
}

var (
	database   = config.DB_NAME
	password   = config.DB_PASSWORD
	username   = config.DB_USER
	host       = config.DB_HOST
	dbInstance *Service
)

func New() *Service {
	// Reuse Connection
	if dbInstance != nil {
		return dbInstance
	}
	connStr := fmt.Sprintf("postgres://%s:%s@%s/%s", username, password, host, database)
	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		panic("failed to connect database ")
	}

	// Migrate the schema
	db.AutoMigrate(
		&models.Customer{},
		&models.Manufacturer{},
		&models.Tile{},
		&models.PriceList{},
		&models.PriceListItem{},
		&models.Order{},
		&models.OrderItem{},
		&models.Distributor{},
		&models.Workspace{},
		&models.URL{},
	)

	slog.Info("Connected to database")

	dbInstance = &Service{
		DB: db,
	}
	return dbInstance
}

// Close closes the database connection.
// It logs a message indicating the disconnection from the specific database.
// If the connection is successfully closed, it returns nil.
// If an error occurs while closing the connection, it returns the error.
func (s *Service) Close() error {
	log.Printf("Disconnected from database: %s", database)
	dbInstance, err := s.DB.DB()
	if err != nil {
		return err
	}
	dbInstance.Close()
	return nil
}
