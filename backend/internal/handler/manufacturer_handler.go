package handler

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/internal/service"
)

type ManufacturerHandler interface {
	FindAll(w http.ResponseWriter, r *http.Request)
}

type manufacturerHandler struct {
	manufacturerService service.ManufacturerService
}

func (h *manufacturerHandler) FindAll(w http.ResponseWriter, r *http.Request) {

	manufacturers, err := h.manufacturerService.FindAll()
	if err != nil {
		slog.Error("Failed to fetch manufacturers", "error", err)
		http.Error(w, "Failed to fetch manufacturers", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(manufacturers); err != nil {
		slog.Error(errEncodeResponse, "error", err)
		http.Error(w, errEncodeResponse, http.StatusInternalServerError)
	}
}

func NewManufacturerHandler(manufacturerService service.ManufacturerService) ManufacturerHandler {
	return &manufacturerHandler{
		manufacturerService: manufacturerService,
	}
}
