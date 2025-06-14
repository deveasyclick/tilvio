package repository

import (
	"errors"

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
	Update(ID uint, distributor *models.Distributor) error
	DeleteByID(clerkID string) error
	FindByID(ID string) (*models.Distributor, error)
	FindByEmail(email string) (*models.Distributor, error)
	FindByClerkID(clerkID string, preloads ...string) (*models.Distributor, error)
}

type distributorRepository struct {
	db *gorm.DB
}

func (r *distributorRepository) Create(distributor *models.Distributor) error {
	return r.db.Create(distributor).Error
}

func (r *distributorRepository) Update(ID uint, distributor *models.Distributor) error {
	return r.db.Where(whereID, ID).Updates(distributor).Error
}

func (r *distributorRepository) DeleteByID(ID string) error {
	return r.db.Where(whereID, ID).Delete(&models.Distributor{}).Error
}

func (r *distributorRepository) FindByID(ID string) (*models.Distributor, error) {
	var distributor models.Distributor
	err := r.db.Where(whereID, ID).First(&distributor).Error
	if err != nil {
		return nil, err
	}
	return &distributor, nil
}

func (r *distributorRepository) FindByEmail(email string) (*models.Distributor, error) {
	var distributor models.Distributor
	err := r.db.Where(whereEmail, email).First(&distributor).Error
	if err != nil {
		return nil, err
	}
	return &distributor, nil
}

func (r *distributorRepository) FindByClerkID(clerkID string, preloads ...string) (*models.Distributor, error) {
	var distributor models.Distributor

	// Start building the query
	query := r.db.Model(&models.Distributor{})

	// Conditionally preload relations
	for _, relation := range preloads {
		query = query.Preload(relation)
	}

	// Execute the query
	err := query.Where(whereClerkID, clerkID).First(&distributor).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return &distributor, nil
}

func NewDistributorRepository(db *gorm.DB) DistributorRepository {
	return &distributorRepository{db: db}
}
