package repository

import (
	"github.com/deveasyclick/tilvio/internal/models"
	"gorm.io/gorm"
)

const (
	whereID      = "id = ?"
	whereEmail   = "email = ?"
	whereClerkID = "clerk_id = ?"
)

type DistributorRepository interface {
	Create(distributor *models.Distributor) error
	Update(ID string, distributor *models.Distributor) error
	DeleteByID(clerkID string) error
	FindOneWithFields(where map[string]any, fields []string, preloads []string) (*models.Distributor, error)
}

type distributorRepository struct {
	db *gorm.DB
}

func (r *distributorRepository) Create(distributor *models.Distributor) error {
	return r.db.Create(distributor).Error
}

func (r *distributorRepository) Update(ID string, distributor *models.Distributor) error {
	return r.db.Where(whereID, ID).Updates(distributor).Error
}

func (r *distributorRepository) DeleteByID(ID string) error {
	return r.db.Where(whereID, ID).Delete(&models.Distributor{}).Error
}

func (r *distributorRepository) FindOneWithFields(where map[string]any, fields []string, preloads []string) (*models.Distributor, error) {
	var result models.Distributor

	query := r.db.Model(models.Distributor{}).Select(fields)

	if where != nil {
		query = query.Where(where)
	}

	for _, preload := range preloads {
		query = query.Preload(preload)
	}

	err := query.First(&result).Error
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func NewDistributorRepository(db *gorm.DB) DistributorRepository {
	return &distributorRepository{db: db}
}
