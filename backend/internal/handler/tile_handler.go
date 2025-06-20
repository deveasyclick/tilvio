package handler

import (
	"encoding/json"
	"errors"
	"log/slog"
	"math"
	"net/http"
	"strconv"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/deveasyclick/tilvio/pkg/pagination"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

var (
	errEncodeResponse = "Failed to encode response"
)

type TileHandler interface {
	Filter(w http.ResponseWriter, r *http.Request)
	Get(w http.ResponseWriter, r *http.Request)
}

type tileHandler struct {
	tileService service.TileService
}

type TileResponse struct {
	Total      int64         `json:"total"`
	Tiles      []models.Tile `json:"tiles"`
	Page       int           `json:"page"`
	Limit      int           `json:"limit"`
	TotalPages int           `json:"totalPages"`
}

// Sample filter query: ?manufacturer_id_in=0,1&code=33000&manufacturer_Id=1&sort=code desc&preloads=Manufacturer&type_like=floor&search=goodwill&search_fields=code,manufactures
func (h *tileHandler) Filter(w http.ResponseWriter, r *http.Request) {
	filters, err := pagination.ParseFiltersFromQuery(r.URL.Query())
	if err != nil {
		slog.Error("Invalid filters", "error", err, "query", r.URL.Query())
		http.Error(w, "Invalid filters", http.StatusBadRequest)
		return
	}
	allowedFields := map[string]bool{"code": true, "dimension": true, "type": true, "manufacturers.name": true, "description": true}
	opts := pagination.Options{
		Page:            pagination.ParsePage(r.URL.Query().Get("page")),
		Limit:           pagination.ParseLimit(r.URL.Query().Get("limit")),
		Filters:         filters,
		SortBy:          r.URL.Query().Get("sort"),
		Preloads:        pagination.ParsePreloads(r.URL.Query().Get("preloads")),
		SearchFields:    pagination.ParseSearchFields(r.URL.Query(), allowedFields),
		SearchJoinQuery: "LEFT JOIN manufacturers ON tiles.manufacturer_id = manufacturers.id AND manufacturers.deleted_at IS NULL",
	}

	tiles, total, err := h.tileService.Filter(opts)
	if err != nil {
		slog.Error("Failed to fetch tiles", "error", err, "opts", opts)
		http.Error(w, "Failed to fetch tiles", http.StatusInternalServerError)
		return
	}

	resp := TileResponse{
		Total:      total,
		Limit:      opts.Limit,
		Page:       opts.Page,
		TotalPages: int(math.Ceil(float64(total) / float64(opts.Limit))),
		Tiles:      tiles,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		slog.Error(errEncodeResponse, "error", err)
		http.Error(w, errEncodeResponse, http.StatusInternalServerError)
	}
}

func (h *tileHandler) Get(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseUint(chi.URLParam(r, "id"), 10, 64)
	if err != nil {
		slog.Error("invalid tile ID in get request", "error", err)
		http.Error(w, errInvalidWorkspaceID, http.StatusBadRequest)
		return
	}

	tile, err := h.tileService.FindOne(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			http.Error(w, gorm.ErrRecordNotFound.Error(), http.StatusNotFound)
			return
		}
		slog.Error("failed to get tile", "error", err, "id", id)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(&tile); err != nil {
		slog.Error(errEncodeResponse, "error", err)
		http.Error(w, errEncodeResponse, http.StatusInternalServerError)
	}
}

func NewTileHandler(tileService service.TileService) TileHandler {
	return &tileHandler{
		tileService: tileService,
	}
}
