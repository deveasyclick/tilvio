package scripts

import (
	"fmt"
	"log/slog"

	"github.com/deveasyclick/tilvio/internal/config"
	_ "github.com/jackc/pgx/v5/stdlib"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DB struct {
}

var (
	database   = config.DB_NAME
	password   = config.DB_PASSWORD
	username   = config.DB_USER
	host       = config.DB_HOST
	dbInstance *gorm.DB
)

func (d *DB) Connect() *gorm.DB {

	if dbInstance != nil {
		return dbInstance
	}

	connStr := fmt.Sprintf("postgres://%s:%s@%s/%s", username, password, host, database)
	dbInstance, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		panic("failed to connect database ")
	}

	slog.Info("Connected to database")
	return dbInstance
}
