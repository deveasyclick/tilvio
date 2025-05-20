package handler

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/internal/service"
)

type URLHandler struct {
	service service.URLService
}

func (h *URLHandler) CreateShortURL(w http.ResponseWriter, r *http.Request) {

	// Set the Content-Type header and write the JSON response
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode("{}"); err != nil {
		slog.Error("Error in createShortUrl", "error", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

func NewURLHandler(service service.URLService) *URLHandler {
	return &URLHandler{service: service}
}
