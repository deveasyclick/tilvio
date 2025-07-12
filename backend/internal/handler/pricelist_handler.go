package handler

import (
	"encoding/json"
	"log/slog"
	"math"
	"net/http"
	"strconv"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/deveasyclick/tilvio/pkg/context"
	"github.com/deveasyclick/tilvio/pkg/httphelper"
	"github.com/deveasyclick/tilvio/pkg/pagination"
	"github.com/deveasyclick/tilvio/pkg/types"
	"github.com/deveasyclick/tilvio/pkg/types/error_messages"
	"github.com/deveasyclick/tilvio/pkg/validator"
	"github.com/go-chi/chi"
)

type PriceListHandler interface {
	Filter(w http.ResponseWriter, r *http.Request)
	Create(w http.ResponseWriter, r *http.Request)
	Get(w http.ResponseWriter, r *http.Request)
	Update(w http.ResponseWriter, r *http.Request)
	Delete(w http.ResponseWriter, r *http.Request)
	BulkDelete(w http.ResponseWriter, r *http.Request)
}

type priceListHandler struct {
	service service.PriceListService
}

type PriceListResponse struct {
	Total      int64              `json:"total"`
	PriceLists []models.PriceList `json:"price_lists"`
	Page       int                `json:"page"`
	Limit      int                `json:"limit"`
	TotalPages int                `json:"totalPages"`
}

func (h *priceListHandler) Get(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.ParseUint(chi.URLParam(r, "id"), 10, 64)

	priceList, apiError := h.service.FindOne(uint(id))
	if apiError != nil {
		slog.Error(error_messages.ErrFindPriceList, "error", apiError.Message, "id", id)
		http.Error(w, apiError.Message, apiError.Code)
		return
	}

	if err := json.NewEncoder(w).Encode(&priceList); err != nil {
		slog.Error(errEncodeResponse, "error", err)
		http.Error(w, errEncodeResponse, http.StatusInternalServerError)
	}
}

func (h *priceListHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req types.CreatePriceListRequest
	if errors := validator.ValidateRequest(r, &req); len(errors) > 0 {
		slog.Error(error_messages.ErrInvalidRequestPayload, "errors", errors)
		validator.WriteValidationResponse(w, errors)
		return
	}

	authenticatedUser := context.GetAuthenticatedUser(r.Context())
	pricelist, err := h.service.Create(&req, authenticatedUser)
	if err != nil {
		httphelper.WriteJSONError(w, error_messages.ErrCreatePriceList, err)
		return
	}

	if err := json.NewEncoder(w).Encode(pricelist); err != nil {
		slog.Warn(error_messages.ErrEncodeResponseFailed, "error", err)
	}
}

func (h *priceListHandler) Filter(w http.ResponseWriter, r *http.Request) {
	filters, err := pagination.ParseFiltersFromQuery(r.URL.Query())
	if err != nil {
		slog.Error("Invalid filters", "error", err, "query", r.URL.Query())
		http.Error(w, "Invalid filters", http.StatusBadRequest)
		return
	}
	allowedFields := map[string]bool{"name": true}
	opts := pagination.Options{
		Page:         pagination.ParsePage(r.URL.Query().Get("page")),
		Limit:        pagination.ParseLimit(r.URL.Query().Get("limit")),
		Filters:      filters,
		SortBy:       r.URL.Query().Get("sort"),
		Preloads:     pagination.ParsePreloads(r.URL.Query().Get("preloads")),
		SearchFields: pagination.ParseSearchFields(r.URL.Query(), allowedFields),
	}

	pricelists, total, apiError := h.service.Filter(opts)
	if apiError != nil {
		slog.Error(error_messages.ErrFilterPriceList, "error", apiError.Message, "opts", opts)
		http.Error(w, error_messages.ErrFilterPriceList, http.StatusInternalServerError)
		return
	}

	resp := PriceListResponse{
		Total:      total,
		Limit:      opts.Limit,
		Page:       opts.Page,
		TotalPages: int(math.Ceil(float64(total) / float64(opts.Limit))),
		PriceLists: pricelists,
	}

	if err := json.NewEncoder(w).Encode(types.APIResult{Data: resp, Message: "success", Code: http.StatusOK}); err != nil {
		slog.Error(errEncodeResponse, "error", err)
		http.Error(w, errEncodeResponse, http.StatusInternalServerError)
	}
}

func (h *priceListHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.ParseUint(chi.URLParam(r, "id"), 10, 64)
	var req types.UpdatePriceListRequest
	if errors := validator.ValidateRequest(r, &req); len(errors) > 0 {
		slog.Error(error_messages.ErrInvalidRequestPayload, "errors", errors)
		validator.WriteValidationResponse(w, errors)
		return
	}

	existingPriceList, apiError := h.service.Update(uint(id), &req)
	if apiError != nil {
		slog.Error(error_messages.ErrUpdatePriceList, "error", apiError.Message, "id", id)
		http.Error(w, apiError.Message, apiError.Code)
		return
	}

	if err := json.NewEncoder(w).Encode(types.APIResult{Data: existingPriceList, Message: "success", Code: http.StatusOK}); err != nil {
		slog.Error(error_messages.ErrEncodeResponseFailed, "error", err)
		http.Error(w, error_messages.ErrEncodeResponseFailed, http.StatusInternalServerError)
	}
}

func (h *priceListHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if err := h.service.Delete(id); err != nil {
		slog.Error(error_messages.ErrDeletePriceList, "error", err, "id", id)
		http.Error(w, error_messages.ErrDeletePriceList, http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(types.APIResult{Data: map[string]string{"id": id}, Message: "success", Code: http.StatusOK}); err != nil {
		slog.Error(error_messages.ErrEncodeResponseFailed, "error", err)
		http.Error(w, error_messages.ErrEncodeResponseFailed, http.StatusInternalServerError)
	}
}

func (h *priceListHandler) BulkDelete(w http.ResponseWriter, r *http.Request) {
	var req types.BulkDeletePriceListRequest
	if errors := validator.ValidateRequest(r, &req); len(errors) > 0 {
		slog.Error(error_messages.ErrInvalidRequestPayload, "errors", errors)
		validator.WriteValidationResponse(w, errors)
		return
	}

	if err := h.service.BulkDelete(req.IDs); err != nil {
		slog.Error(error_messages.ErrDeletePriceList, "error", err, "ids", req.IDs)
		http.Error(w, error_messages.ErrDeletePriceList, http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(types.APIResult{Data: map[string][]uint{"ids": req.IDs}, Message: "success", Code: http.StatusOK}); err != nil {
		slog.Error(error_messages.ErrEncodeResponseFailed, "error", err)
		http.Error(w, error_messages.ErrEncodeResponseFailed, http.StatusInternalServerError)
	}
}
func NewPriceListHandler(service service.PriceListService) PriceListHandler {
	return &priceListHandler{service: service}
}
