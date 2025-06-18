package repository

import (
	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/pkg/pagination"
	"gorm.io/gorm"
)

type TileRepository interface {
	FindWithFilters(opts pagination.Options) ([]models.Tile, int64, error)
	FindOneWithFields(fields []string, where map[string]any) (*models.Tile, error)
}

type tileRepository struct {
	db *gorm.DB
}

func (r *tileRepository) FindWithFilters(opts pagination.Options) ([]models.Tile, int64, error) {
	return pagination.Paginate[models.Tile](r.db, opts)
}

func (r *tileRepository) FindOneWithFields(fields []string, where map[string]any) (*models.Tile, error) {
	var result models.Tile

	query := r.db.Model(models.Tile{}).Select(fields)

	if where != nil {
		query = query.Where(where)
	}

	err := query.First(&result).Error
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func NewTileRepository(db *gorm.DB) TileRepository {
	return &tileRepository{db: db}
}
