package config

import (
	"log/slog"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

var (
	PORT                         int
	ENV                          string
	DB_HOST                      string
	DB_NAME                      string
	DB_USER                      string
	DB_PASSWORD                  string
	APP_URL                      string
	REDIS_PORT                   int
	CLERK_SECRET_KEY             string
	CLERK_WEBHOOK_SIGNING_SECRET string
	AWS_ACCESS_KEY               string
	AWS_SECRET_KEY               string
	AWS_REGION                   string
	AWS_S3_TILES_BUCKET          string
	BASE_URL                     string
)

func init() {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		slog.Error("No .env file found, using environment variables instead")
	}

	PORT, _ = strconv.Atoi(os.Getenv("PORT"))
	ENV = os.Getenv("ENV")
	DB_HOST = os.Getenv("DB_HOST")
	DB_NAME = os.Getenv("DB_NAME")
	DB_USER = os.Getenv("DB_USER")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
	REDIS_PORT, _ = strconv.Atoi(os.Getenv("REDIS_PORT"))
	CLERK_SECRET_KEY = os.Getenv("CLERK_SECRET_KEY")
	CLERK_WEBHOOK_SIGNING_SECRET = os.Getenv("CLERK_WEBHOOK_SIGNING_SECRET")
	AWS_ACCESS_KEY = os.Getenv("AWS_ACCESS_KEY_ID")
	AWS_SECRET_KEY = os.Getenv("AWS_SECRET_ACCESS_KEY")
	AWS_REGION = os.Getenv("AWS_REGION")
	AWS_S3_TILES_BUCKET = os.Getenv("AWS_S3_TILES_BUCKET")
	BASE_URL, _ = os.Getwd()
	// Validate required Clerk configuration
	if CLERK_SECRET_KEY == "" || CLERK_WEBHOOK_SIGNING_SECRET == "" {
		slog.Error("Missing required Clerk configuration")
		os.Exit(1)
	}

	if AWS_ACCESS_KEY == "" || AWS_SECRET_KEY == "" || AWS_REGION == "" {
		slog.Error("Missing required AWS configuration")
		os.Exit(1)
	}
}
