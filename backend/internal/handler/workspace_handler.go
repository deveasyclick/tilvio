package handler

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/deveasyclick/tilvio/pkg/types"
	"github.com/deveasyclick/tilvio/pkg/validator"
	"github.com/go-chi/chi"
)

const (
	errInvalidWorkspaceID   = "Invalid workspace ID"
	errInvalidDistributorID = "Invalid distributor ID"
	errWorkspaceNotFound    = "Workspace not found"
)

type WorkspaceHandler interface {
	Create(w http.ResponseWriter, r *http.Request)
	Update(w http.ResponseWriter, r *http.Request)
	Delete(w http.ResponseWriter, r *http.Request)
	Get(w http.ResponseWriter, r *http.Request)
}

type workspaceHandler struct {
	service service.WorkspaceService
}

func (h *workspaceHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req types.CreateWorkspaceRequest
	if errors := validator.ValidateRequest(r, &req); len(errors) > 0 {
		slog.Error("invalid request body in workspace create", "errors", errors)
		validator.WriteValidationResponse(w, errors)
		return
	}

	// Convert request to model
	workspace := models.Workspace{
		Name:             req.Name,
		Logo:             req.Logo,
		OrganizationName: req.OrganizationName,
		OrganizationUrl:  req.OrganizationUrl,
		Email:            req.Email,
		Phone:            req.Phone,
		State:            req.State,
		City:             req.City,
		Address:          req.Address,
		Country:          req.Country,
	}

	distributorClerkId := r.Context().Value("userClerkId").(string)
	if err := h.service.Create(&workspace, distributorClerkId); err != nil {
		slog.Error("failed to create workspace", "error", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(workspace)
}

func (h *workspaceHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseUint(chi.URLParam(r, "id"), 10, 64)
	if err != nil {
		slog.Error("invalid workspace ID in update", "error", err)
		http.Error(w, errInvalidWorkspaceID, http.StatusBadRequest)
		return
	}

	var req types.UpdateWorkspaceRequest
	if errors := validator.ValidateRequest(r, &req); len(errors) > 0 {
		slog.Error("invalid request in workspace update", "errors", errors)
		validator.WriteValidationResponse(w, errors)
		return
	}

	// Get existing workspace
	existingWorkspace, err := h.service.GetWorkspace(uint(id))
	if err != nil {
		slog.Error("workspace not found", "error", err, "id", id)
		http.Error(w, errWorkspaceNotFound, http.StatusNotFound)
		return
	}

	// Update only provided fields
	if req.Name != "" {
		existingWorkspace.Name = req.Name
	}
	if req.Logo != "" {
		existingWorkspace.Logo = req.Logo
	}
	if req.OrganizationName != "" {
		existingWorkspace.OrganizationName = req.OrganizationName
	}
	if req.OrganizationUrl != "" {
		existingWorkspace.OrganizationUrl = req.OrganizationUrl
	}
	if req.Email != "" {
		existingWorkspace.Email = req.Email
	}
	if req.Phone != "" {
		existingWorkspace.Phone = req.Phone
	}
	if req.State != "" {
		existingWorkspace.State = req.State
	}
	if req.City != "" {
		existingWorkspace.City = req.City
	}
	if req.Address != "" {
		existingWorkspace.Address = req.Address
	}
	if req.OnboardedAt != nil {
		existingWorkspace.OnboardedAt = *req.OnboardedAt
	}

	if err := h.service.Update(existingWorkspace); err != nil {
		slog.Error("failed to update workspace", "error", err, "id", id)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(existingWorkspace)
}

func (h *workspaceHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseUint(chi.URLParam(r, "id"), 10, 64)
	if err != nil {
		slog.Error("invalid workspace ID in delete", "error", err)
		http.Error(w, errInvalidWorkspaceID, http.StatusBadRequest)
		return
	}

	if err := h.service.Delete(uint(id)); err != nil {
		slog.Error("failed to delete workspace", "error", err, "id", id)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *workspaceHandler) Get(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseUint(chi.URLParam(r, "id"), 10, 64)
	if err != nil {
		slog.Error("invalid workspace ID in get", "error", err)
		http.Error(w, errInvalidWorkspaceID, http.StatusBadRequest)
		return
	}

	workspace, err := h.service.GetWorkspace(uint(id))
	if err != nil {
		slog.Error("failed to get workspace", "error", err, "id", id)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(workspace)
}

func NewWorkspaceHandler(service service.WorkspaceService) WorkspaceHandler {
	return &workspaceHandler{service: service}
}
