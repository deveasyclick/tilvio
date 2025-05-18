package config

import (
	"log/slog"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

var (
	PORT        int
	ENV         string
	DB_HOST     string
	DB_NAME     string
	DB_USER     string
	DB_PASSWORD string
	APP_URL     string
	REDIS_PORT  int
)

func init() {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		slog.Error("No .env file found, using environment variables")
		os.Exit(1)
	}

	PORT, _ = strconv.Atoi(os.Getenv("PORT"))
	ENV = os.Getenv("ENV")
	DB_HOST = os.Getenv("DB_HOST")
	DB_NAME = os.Getenv("DB_NAME")
	DB_USER = os.Getenv("DB_USER")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
	REDIS_PORT, _ = strconv.Atoi(os.Getenv("REDIS_PORT"))
}
