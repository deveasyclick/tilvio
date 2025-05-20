package repository

import (
	"github.com/deveasyclick/tilvio/internal/models"
	"gorm.io/gorm"
)

type URLRepository interface {
	Create(url *models.URL) error
}

type urlRepository struct {
	db *gorm.DB
}

func (r *urlRepository) Create(url *models.URL) error {
	result := r.db.Create(url)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func NewURLRepository(db *gorm.DB) URLRepository {
	return &urlRepository{db: db}
}
