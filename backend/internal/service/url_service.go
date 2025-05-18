package service

import (
	"fmt"

	"github.com/deveasyclick/tilvio/internal/repository"
)

type URLService interface {
	GetOriginalURL(shortURL string) (string, error)
}

type urlService struct {
	repo repository.URLRepository
}

func (s *urlService) GetOriginalURL(shortCode string) (string, error) {
	// Find the URL with the given short code in the repository
	url, err := s.repo.FindByShortURL(shortCode)
	if err != nil {
		return "", fmt.Errorf("error retrieving URL from repository: %w", err)
	}

	if url == nil {
		// If the short code does not exist, return an error
		return "", fmt.Errorf("Short code not found")
	}

	// Return the long URL associated with the short code
	return url.OriginalUrl, nil
}

func NewURLService(repo repository.URLRepository) URLService {
	return &urlService{repo: repo}
}
