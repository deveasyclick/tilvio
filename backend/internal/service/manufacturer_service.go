package service

import (
	"fmt"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
)

var (
	errFindManfacturer = "error finding manufacturer"
)

type ManufacturerService interface {
	GetOneWithFields(fields []string, where map[string]any) (*models.Manufacturer, error)
	FindOrCreate(where map[string]interface{}) (*models.Manufacturer, error)
	FindAll() ([]models.Manufacturer, error)
}

type manufacturerService struct {
	repo repository.ManufacturerRepository
}

func (s *manufacturerService) GetOneWithFields(fields []string, where map[string]any) (*models.Manufacturer, error) {
	manufacturer, err := s.repo.FindOneWithFields(fields, where)
	if err != nil {
		return nil, fmt.Errorf(errFormat, errFindManfacturer, err)
	}
	return manufacturer, nil
}

func (s *manufacturerService) FindOrCreate(where map[string]interface{}) (*models.Manufacturer, error) {
	manufacturer, err := s.repo.FindOrCreate(where)
	if err != nil {
		return nil, fmt.Errorf(errFormat, errFindManfacturer, err)
	}
	return manufacturer, nil
}

// TODO: Cache manufacturers
func (s *manufacturerService) FindAll() ([]models.Manufacturer, error) {
	manufacturers, err := s.repo.FindMany(map[string]interface{}{})
	if err != nil {
		return nil, err
	}
	return manufacturers, nil
}

func NewManufacturerService(repo repository.ManufacturerRepository) ManufacturerService {
	return &manufacturerService{repo: repo}
}
