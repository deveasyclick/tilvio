package service

import (
	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/pkg/pagination"
)

type TileService interface {
	Filter(opts pagination.Options) ([]models.Tile, int64, error)
	FindOne(ID uint) (*models.Tile, error)
}

type tileService struct {
	repo               repository.TileRepository
	distributorService DistributorService
}

func (s *tileService) Filter(opts pagination.Options) ([]models.Tile, int64, error) {
	tiles, total, err := s.repo.FindWithFilters(opts)
	if err != nil {
		return nil, 0, err
	}
	return tiles, total, nil
}

func (s *tileService) FindOne(ID uint) (*models.Tile, error) {

	tile, err := s.repo.FindOneWithFields([]string{}, map[string]any{"id": ID})
	if err != nil {
		return nil, err
	}
	return tile, nil
}

func NewTileService(repo repository.TileRepository) TileService {
	return &tileService{repo: repo}
}
