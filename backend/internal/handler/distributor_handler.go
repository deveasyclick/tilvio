package handler

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/deveasyclick/tilvio/pkg/context"
	"github.com/deveasyclick/tilvio/pkg/httphelper"
	"github.com/deveasyclick/tilvio/pkg/types/error_messages"
)

type DistributorHandler interface {
	GetAuthenticated(w http.ResponseWriter, r *http.Request)
}

type distributorHandler struct {
	service service.DistributorService
}

func (h *distributorHandler) GetAuthenticated(w http.ResponseWriter, r *http.Request) {
	user := context.GetAuthenticatedUser(r.Context())
	distributor, err := h.service.GetDistributorByID(user.ID, []string{"Workspace"})

	if err != nil {
		httphelper.WriteJSONError(w, error_messages.ErrFindDistributor, err)
		return
	}

	if err := json.NewEncoder(w).Encode(distributor); err != nil {
		slog.Warn(error_messages.ErrEncodeResponseFailed, "error", err)
	}
}

func NewDistributorHandler(service service.DistributorService) DistributorHandler {
	return &distributorHandler{service: service}
}
