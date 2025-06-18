package s3Client

import (
	"context"
	"fmt"
	"log/slog"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	awsConfig "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

var client *s3.Client
var uploader *manager.Uploader

func init() {
	cfg, err := awsConfig.LoadDefaultConfig(context.TODO())
	if err != nil {
		slog.Error("unable to load SDK config", "error", err)
		os.Exit(1)
	}

	client = s3.NewFromConfig(cfg)
}

func Upload(key, filePath string, bucketName string) (string, error) {
	f, err := os.Open(filePath)
	if err != nil {
		return "", fmt.Errorf("open file: %w", err)
	}
	defer f.Close()
	uploader = manager.NewUploader(client)
	result, err := uploader.Upload(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(key),
		Body:   f,
	})
	if err != nil {
		return "", fmt.Errorf("upload failed: %w", err)
	}

	slog.Info("File uploaded to S3", "result", result)

	return fmt.Sprintf("https://%s.s3.amazonaws.com/%s", bucketName, key), nil
}
