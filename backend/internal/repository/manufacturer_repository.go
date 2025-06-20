package repository

import (
	"github.com/deveasyclick/tilvio/internal/models"
	"gorm.io/gorm"
)

type ManufacturerRepository interface {
	FindOneWithFields(fields []string, where map[string]any) (*models.Manufacturer, error)
	FindOrCreate(where map[string]interface{}) (*models.Manufacturer, error)
	FindMany(where map[string]interface{}) ([]models.Manufacturer, error)
}

type manufacturerRepository struct {
	db *gorm.DB
}

func (r *manufacturerRepository) FindOneWithFields(fields []string, where map[string]any) (*models.Manufacturer, error) {
	var result models.Manufacturer

	query := r.db.Model(models.Manufacturer{}).Select(fields)

	if where != nil {
		query = query.Where(where)
	}

	err := query.Limit(1).Scan(&result).Error
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (r *manufacturerRepository) FindOrCreate(where map[string]interface{}) (*models.Manufacturer, error) {
	var manufacturer models.Manufacturer
	err := r.db.Where(where).FirstOrCreate(&manufacturer).Error
	if err != nil {
		return nil, err
	}

	return &manufacturer, nil
}

func (r *manufacturerRepository) FindMany(where map[string]interface{}) ([]models.Manufacturer, error) {
	var manufacturers []models.Manufacturer
	err := r.db.Where(where).Find(&manufacturers).Error
	if err != nil {
		return nil, err
	}

	return manufacturers, nil
}

func NewManufacturerRepository(db *gorm.DB) ManufacturerRepository {
	return &manufacturerRepository{db: db}
}
