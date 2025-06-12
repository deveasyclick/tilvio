package service

import (
	"errors"
	"fmt"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/repository"
)

const (
	errWorkspaceExists   = "workspace already exists"
	errWorkspaceNotFound = "workspace not found"
	errCreateWorkspace   = "error creating workspace"
	errUpdateWorkspace   = "error updating workspace"
	errFindWorkspace     = "error finding workspace"
)

type WorkspaceService interface {
	Create(workspace *models.Workspace, distributorClerkID string) error
	Update(workspace *models.Workspace) error
	Delete(ID uint) error
	GetWorkspace(ID uint) (*models.Workspace, error)
}

type workspaceService struct {
	repo               repository.WorkspaceRepository
	distributorService DistributorService
}

func (s *workspaceService) Create(workspace *models.Workspace, distributorClerkID string) error {
	distributor, err := s.distributorService.GetDistributorByClerkID(distributorClerkID)
	if err != nil {
		return fmt.Errorf("error finding distributor by clerkID: %w", err)
	}

	if err = s.repo.Create(workspace); err != nil {
		return fmt.Errorf("error creating workspace: %w", err)
	}

	workspaceID := workspace.ID
	err = s.distributorService.UpdateDistributor(distributor.ID, &models.Distributor{WorkspaceID: &workspaceID})
	if err != nil {
		return fmt.Errorf("error attaching workspace to distributor: %w", err)
	}

	return nil
}

func (s *workspaceService) Update(workspace *models.Workspace) error {
	existing, err := s.repo.FindByID(workspace.ID)
	if err != nil || existing == nil {
		return errors.New(errWorkspaceNotFound)
	}

	err = s.repo.Update(workspace)
	if err != nil {
		return fmt.Errorf(errFormat, errUpdateWorkspace, err)
	}

	return nil
}

func (s *workspaceService) Delete(ID uint) error {
	return s.repo.Delete(ID)
}

func (s *workspaceService) GetWorkspace(ID uint) (*models.Workspace, error) {
	workspace, err := s.repo.FindByID(ID)
	if err != nil {
		return nil, fmt.Errorf(errFormat, errFindWorkspace, err)
	}
	return workspace, nil
}

func NewWorkspaceService(repo repository.WorkspaceRepository, distributorService DistributorService) WorkspaceService {
	return &workspaceService{repo: repo, distributorService: distributorService}
}
