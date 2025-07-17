package service

import (
	"errors"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/pkg/pagination"
	"github.com/deveasyclick/tilvio/pkg/types"
	"github.com/deveasyclick/tilvio/pkg/types/error_messages"
	"gorm.io/gorm"
)

type PriceListService interface {
	Create(createPriceListReq *types.CreatePriceListRequest, user types.AuthenticatedUser) (*models.PriceList, *types.APIERROR)
	Update(ID uint, updatePriceListRequest *types.UpdatePriceListRequest) (pricelist *models.PriceList, apiError *types.APIERROR)
	Delete(ID string) *types.APIERROR
	Filter(opts pagination.Options) ([]models.PriceList, int64, *types.APIERROR)
	FindOne(ID uint) (*models.PriceList, *types.APIERROR)
	Exists(ID uint) (bool, *types.APIERROR)
	BulkDelete(IDs []uint) *types.APIERROR
}

type priceListService struct {
	repo                 repository.PriceListRepository
	priceListItemService PriceListItemService
}

func (s *priceListService) Filter(opts pagination.Options) ([]models.PriceList, int64, *types.APIERROR) {
	priceLists, total, err := s.repo.FindWithFilters(opts)
	if err != nil {
		return nil, 0, &types.APIERROR{Message: error_messages.ErrFilterPriceList, Code: http.StatusInternalServerError}
	}
	return priceLists, total, nil
}

func (s *priceListService) Create(createPriceListReq *types.CreatePriceListRequest, user types.AuthenticatedUser) (*models.PriceList, *types.APIERROR) {
	// Check if priceList name already exists
	existing, err := s.repo.FindOneWithFields([]string{"name"}, map[string]any{"name": createPriceListReq.Name})
	if err != nil && err != gorm.ErrRecordNotFound {
		slog.Error(error_messages.ErrCreatePriceList, "error", err, "name", createPriceListReq.Name)
		return nil, &types.APIERROR{Message: error_messages.ErrCreatePriceList, Code: http.StatusInternalServerError}
	}

	if existing != nil {
		return nil, &types.APIERROR{Message: error_messages.ErrPriceListExists, Code: http.StatusConflict}
	}

	var priceListItems []models.PriceListItem
	workspaceID, err := strconv.ParseUint(user.WorkspaceID, 10, 64)
	if err != nil {
		slog.Error(error_messages.ErrParseID, "error", err, "workspace ID", workspaceID)
		return nil, &types.APIERROR{Message: error_messages.ErrCreatePriceList, Code: http.StatusInternalServerError}
	}

	for _, priceListItem := range createPriceListReq.PriceListItems {
		priceListItems = append(priceListItems, models.PriceListItem{
			Price:       priceListItem.Price,
			Dimension:   priceListItem.Dimension,
			WorkspaceID: uint(workspaceID),
			Description: priceListItem.Description,
		})
	}

	distributorID, err := strconv.ParseUint(user.ID, 10, 64)
	if err != nil {
		slog.Error(error_messages.ErrParseID, "error", err, "workspace ID", workspaceID)
		return nil, &types.APIERROR{Message: error_messages.ErrCreatePriceList, Code: http.StatusInternalServerError}
	}
	priceList := &models.PriceList{
		Name:           createPriceListReq.Name,
		PriceListItems: priceListItems,
		WorkspaceID:    uint(workspaceID),
		CreatedByID:    uint(distributorID),
	}
	err = s.repo.Create(priceList)
	if err != nil {
		slog.Error(error_messages.ErrCreatePriceList, "error", err)
		return nil, &types.APIERROR{Message: error_messages.ErrCreatePriceList, Code: http.StatusInternalServerError}
	}

	return priceList, nil
}

func (s *priceListService) Update(ID uint, updatePriceListRequest *types.UpdatePriceListRequest) (pricelist *models.PriceList, apiError *types.APIERROR) {
	existingPriceList, err := s.repo.FindOneWithFields([]string{}, map[string]any{"id": ID})
	if err != nil {
		return nil, &types.APIERROR{Message: error_messages.ErrPriceListNotFound, Code: http.StatusNotFound}
	}

	// Update only provided fields
	if updatePriceListRequest.Name != "" {
		existingPriceList.Name = updatePriceListRequest.Name
	}

	priceListItems := make([]models.PriceListItem, 0, len(updatePriceListRequest.PriceListItems))

	for _, item := range updatePriceListRequest.PriceListItems {
		priceListItems = append(priceListItems, models.PriceListItem{
			Description: item.Description,
			Dimension:   item.Dimension,
			Price:       item.Price,
			WorkspaceID: existingPriceList.WorkspaceID,
			PriceListID: existingPriceList.ID,
		})
	}

	existingPriceList.PriceListItems = priceListItems

	err = s.repo.Update(ID, existingPriceList)
	if err != nil {
		return nil, &types.APIERROR{Message: error_messages.ErrUpdatePriceList, Code: http.StatusInternalServerError}
	}

	return existingPriceList, nil
}

func (s *priceListService) Delete(id string) *types.APIERROR {
	_, err := s.repo.FindOneWithFields([]string{"id"}, map[string]any{"id": id})
	if err != nil {
		slog.Error(error_messages.ErrDeletePriceList, "error", err)
		return &types.APIERROR{Message: error_messages.ErrPriceListNotFound, Code: http.StatusNotFound}
	}

	err = s.repo.DeleteByID(id)
	if err != nil {
		slog.Error(error_messages.ErrDeletePriceList, "error", err)
		return &types.APIERROR{Message: error_messages.ErrDeletePriceList, Code: http.StatusInternalServerError}
	}

	return nil
}

func (s *priceListService) FindOne(ID uint) (*models.PriceList, *types.APIERROR) {
	priceList, err := s.repo.FindOneWithFields([]string{}, map[string]any{"id": ID})

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, &types.APIERROR{Message: error_messages.ErrPriceListNotFound, Code: http.StatusNotFound}
	}

	if err != nil {
		return nil, &types.APIERROR{Message: error_messages.ErrFindPriceList, Code: http.StatusInternalServerError}
	}

	return priceList, nil
}

func (s *priceListService) Exists(ID uint) (bool, *types.APIERROR) {
	existing, err := s.repo.FindOneWithFields([]string{"id"}, map[string]any{"id": ID})
	if err != nil || existing == nil {
		return false, &types.APIERROR{Message: error_messages.ErrPriceListNotFound, Code: http.StatusNotFound}
	}
	return true, nil
}

func (s *priceListService) BulkDelete(IDs []uint) *types.APIERROR {
	err := s.repo.BulkDeleteByIds(IDs)
	if err != nil {
		slog.Error(error_messages.ErrDeletePriceLists, "error", err)
		return &types.APIERROR{Message: error_messages.ErrDeletePriceLists, Code: http.StatusInternalServerError}
	}
	return nil
}

func NewPriceListService(repo repository.PriceListRepository) PriceListService {
	return &priceListService{repo: repo}
}
