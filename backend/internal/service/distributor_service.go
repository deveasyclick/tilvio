package service

import (
	"errors"
	"fmt"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
)

const (
	errDistributorExists   = "distributor already exists"
	errDistributorNotFound = "distributor not found"
	errCreateDistributor   = "error creating distributor"
	errUpdateDistributor   = "error updating distributor"
	errFindDistributor     = "error finding distributor"
	errFormat              = "%s: %w"
)

type DistributorService interface {
	Create(distributor *models.Distributor) error
	UpdateDistributor(ID string, distributor *models.Distributor) error
	DeleteDistributor(id string) error
	GetDistributorByEmail(email string) (*models.Distributor, error)
	GetDistributorByID(ID string, preloads []string) (*models.Distributor, error)
}

type distributorService struct {
	repo repository.DistributorRepository
}

func (s *distributorService) Create(distributor *models.Distributor) error {
	// Check if distributor already exists
	existing, err := s.repo.FindOneWithFields(map[string]any{"email": distributor.Email}, []string{"id"}, nil)
	if err == nil && existing != nil {
		return errors.New(errDistributorExists)
	}

	err = s.repo.Create(distributor)
	if err != nil {
		return fmt.Errorf(errFormat, errCreateDistributor, err)
	}

	return nil
}

func (s *distributorService) UpdateDistributor(ID string, distributor *models.Distributor) error {
	err := s.repo.Update(ID, distributor)
	if err != nil {
		return fmt.Errorf(errFormat, errUpdateDistributor, err)
	}

	return nil
}

func (s *distributorService) DeleteDistributor(id string) error {
	// Check if distributor exists
	existing, err := s.repo.FindOneWithFields(map[string]any{"id": id}, []string{"id"}, nil)
	if err != nil || existing == nil {
		return errors.New(errDistributorNotFound)
	}

	return s.repo.DeleteByID(id)
}

func (s *distributorService) GetDistributorByEmail(email string) (*models.Distributor, error) {
	distributor, err := s.repo.FindOneWithFields(map[string]any{"email": email}, nil, nil)
	if err != nil {
		return nil, fmt.Errorf(errFormat, errFindDistributor, err)
	}

	return distributor, nil
}

func (s *distributorService) GetDistributorByID(ID string, preloads []string) (*models.Distributor, error) {
	distributor, err := s.repo.FindOneWithFields(map[string]any{"id": ID}, nil, preloads)
	if err != nil {
		return nil, fmt.Errorf(errFormat, errFindDistributor, err)
	}

	return distributor, nil
}

func NewDistributorService(repo repository.DistributorRepository) DistributorService {
	return &distributorService{repo: repo}
}
