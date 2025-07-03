package service

import (
	"errors"
	"net/http"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/pkg/pagination"
	"github.com/deveasyclick/tilvio/pkg/types"
	"github.com/deveasyclick/tilvio/pkg/types/error_messages"
	"gorm.io/gorm"
)

type PriceListItemService interface {
	Create(priceListItem *models.PriceListItem) *types.APIERROR
	BulkCreate(priceListItem *[]models.PriceListItem) *types.APIERROR
	Update(ID uint, priceListItem *models.PriceListItem) *types.APIERROR
	Delete(ID string) *types.APIERROR
	FindOne(ID uint) (*models.PriceListItem, *types.APIERROR)
}

type priceListItemService struct {
	repo repository.PriceListItemRepository
}

func (s *priceListItemService) Filter(opts pagination.Options) ([]models.PriceListItem, int64, *types.APIERROR) {
	priceLists, total, err := s.repo.FindWithFilters(opts)
	if err != nil {
		return nil, 0, &types.APIERROR{Message: error_messages.ErrFilterPriceListItem, Code: http.StatusInternalServerError}
	}
	return priceLists, total, nil
}

func (s *priceListItemService) Create(priceListItem *models.PriceListItem) *types.APIERROR {
	// Check if priceListItem already exists
	existing, err := s.repo.FindOneWithFields([]string{"id"}, map[string]any{"id": priceListItem.ID})
	if err == nil && existing != nil {
		return &types.APIERROR{Message: error_messages.ErrPriceListItemExists, Code: http.StatusNotFound}
	}

	err = s.repo.Create(priceListItem)
	if err != nil {
		return &types.APIERROR{Message: error_messages.ErrCreatePriceListItem, Code: http.StatusInternalServerError}
	}

	return nil
}

func (s *priceListItemService) BulkCreate(priceListItem *[]models.PriceListItem) *types.APIERROR {
	err := s.repo.BulkCreate(priceListItem)
	if err != nil {
		return &types.APIERROR{Message: error_messages.ErrCreatePriceListItems, Code: http.StatusInternalServerError}
	}

	return nil
}

func (s *priceListItemService) Update(ID uint, priceListItem *models.PriceListItem) *types.APIERROR {
	err := s.repo.Update(ID, priceListItem)
	if err != nil {
		return &types.APIERROR{Message: error_messages.ErrUpdatePriceListItem, Code: http.StatusInternalServerError}
	}

	return nil
}

func (s *priceListItemService) Delete(id string) *types.APIERROR {
	existing, err := s.repo.FindOneWithFields([]string{id}, map[string]any{"id": id})
	if err != nil || existing == nil {
		return &types.APIERROR{Message: error_messages.ErrPriceListItemNotFound, Code: http.StatusNotFound}
	}

	err = s.repo.DeleteByID(id)
	if err != nil {
		return &types.APIERROR{Message: error_messages.ErrDeletePriceListItem, Code: http.StatusInternalServerError}
	}

	return nil
}

func (s *priceListItemService) FindOne(ID uint) (*models.PriceListItem, *types.APIERROR) {
	priceListItem, err := s.repo.FindOneWithFields([]string{}, map[string]any{"id": ID})

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, &types.APIERROR{Message: error_messages.ErrPriceListItemNotFound, Code: http.StatusNotFound}
	}

	if err != nil {
		return nil, &types.APIERROR{Message: error_messages.ErrFindPriceListItem, Code: http.StatusInternalServerError}
	}

	return priceListItem, nil
}

func NewPriceListItemService(repo repository.PriceListItemRepository) PriceListItemService {
	return &priceListItemService{repo: repo}
}
