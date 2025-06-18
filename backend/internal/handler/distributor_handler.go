package handler

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/internal/service"
)

type DistributorHandler interface {
	GetAuthenticated(w http.ResponseWriter, r *http.Request)
}

type distributorHandler struct {
	service service.DistributorService
}

func (h *distributorHandler) GetAuthenticated(w http.ResponseWriter, r *http.Request) {
	distributorClerkId := r.Context().Value("userClerkId").(string)
	distributor, err := h.service.GetDistributorByClerkID(distributorClerkId, "Workspace")
	if err != nil {
		slog.Error("failed to get distributor", "error", err, "clerkId", distributorClerkId)
		http.Error(w, "failed to get distributor, try again later", http.StatusInternalServerError)
		return
	}

	if err := json.NewEncoder(w).Encode(distributor); err != nil {
		slog.Error("Failed to encode response", "error", err)
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func NewDistributorHandler(service service.DistributorService) DistributorHandler {
	return &distributorHandler{service: service}
}
