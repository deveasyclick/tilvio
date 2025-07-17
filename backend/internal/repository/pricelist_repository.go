package repository

import (
	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/pkg/pagination"
	"gorm.io/gorm"
)

type PriceListRepository interface {
	FindWithFilters(opts pagination.Options) ([]models.PriceList, int64, error)
	FindOneWithFields(fields []string, where map[string]any) (*models.PriceList, error)
	Create(priceList *models.PriceList) error
	Update(ID uint, priceList *models.PriceList) error
	DeleteByID(ID string) error
	BulkDeleteByIds(IDs []uint) error
}

type priceListRepository struct {
	db *gorm.DB
}

func (r *priceListRepository) FindWithFilters(opts pagination.Options) ([]models.PriceList, int64, error) {
	return pagination.Paginate[models.PriceList](r.db, opts)
}

func (r *priceListRepository) FindOneWithFields(fields []string, where map[string]any) (*models.PriceList, error) {
	var result models.PriceList

	query := r.db.Model(models.PriceList{}).Select(fields)

	if where != nil {
		query = query.Where(where)
	}

	err := query.First(&result).Error
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (r *priceListRepository) Create(priceList *models.PriceList) error {
	return r.db.Create(priceList).Error
}

func (r *priceListRepository) Update(ID uint, priceList *models.PriceList) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&models.PriceList{}).Where("id = ?", ID).Updates(priceList).Error; err != nil {
			return err
		}
		if err := tx.Model(priceList).Association("PriceListItems").Replace(priceList.PriceListItems); err != nil {
			return err
		}
		return nil
	})
}
func (r *priceListRepository) DeleteByID(ID string) error {
	return r.db.Where(whereID, ID).Delete(&models.PriceList{}).Error
}

func (r *priceListRepository) BulkDeleteByIds(IDs []uint) error {
	return r.db.
		Where("id IN ?", IDs).
		Delete(&models.PriceList{}).
		Error
}

func NewPriceListRepository(db *gorm.DB) PriceListRepository {
	return &priceListRepository{db: db}
}
