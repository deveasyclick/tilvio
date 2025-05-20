package service

import (
	"fmt"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
)

type URLService interface {
	Create(url string) (*models.URL, error)
}

type urlService struct {
	repo repository.URLRepository
}

func (s *urlService) Create(url string) (*models.URL, error) {
	// Find the URL with the given short code in the repository
	urlObject := &models.URL{}
	err := s.repo.Create(urlObject)
	if err != nil {
		return urlObject, fmt.Errorf("error retrieving URL from repository: %w", err)
	}

	return urlObject, nil
}

func NewURLService(repo repository.URLRepository) URLService {
	return &urlService{repo: repo}
}
