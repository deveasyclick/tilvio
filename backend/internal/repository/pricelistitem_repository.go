package repository

import (
	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/pkg/pagination"
	"gorm.io/gorm"
)

type PriceListItemRepository interface {
	FindWithFilters(opts pagination.Options) ([]models.PriceListItem, int64, error)
	FindOneWithFields(fields []string, where map[string]any) (*models.PriceListItem, error)
	Create(priceListItem *models.PriceListItem) error
	Update(ID uint, priceListItem *models.PriceListItem) error
	DeleteByID(ID string) error
	BulkCreate(priceListItem *[]models.PriceListItem) error
}

type priceListItemRepository struct {
	db *gorm.DB
}

func (r *priceListItemRepository) FindWithFilters(opts pagination.Options) ([]models.PriceListItem, int64, error) {
	return pagination.Paginate[models.PriceListItem](r.db, opts)
}

func (r *priceListItemRepository) FindOneWithFields(fields []string, where map[string]any) (*models.PriceListItem, error) {
	var result models.PriceListItem

	query := r.db.Model(models.PriceListItem{}).Select(fields)

	if where != nil {
		query = query.Where(where)
	}

	err := query.First(&result).Error
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (r *priceListItemRepository) Create(priceListItem *models.PriceListItem) error {
	return r.db.Create(priceListItem).Error
}

func (r *priceListItemRepository) BulkCreate(priceListItem *[]models.PriceListItem) error {
	return r.db.Create(priceListItem).Error
}

func (r *priceListItemRepository) Update(ID uint, priceListItem *models.PriceListItem) error {
	return r.db.Where(whereID, ID).Updates(priceListItem).Error
}
func (r *priceListItemRepository) DeleteByID(ID string) error {
	return r.db.Where(whereID, ID).Delete(&models.PriceListItem{}).Error
}

func NewPriceListItemRepository(db *gorm.DB) PriceListItemRepository {
	return &priceListItemRepository{db: db}
}
