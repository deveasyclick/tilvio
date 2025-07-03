package usecases

import (
	"fmt"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/internal/service"
)

type CreateWorkspaceInput struct {
	Workspace     models.Workspace
	DistributorID string
	ClerkUserID   string
}

type CreateWorkspaceUseCase interface {
	Execute(input CreateWorkspaceInput) error
}

type createWorkspaceUseCase struct {
	workspaceService   service.WorkspaceService
	distributorService service.DistributorService
	clerkUserService   service.ClerkService
}

func (uc *createWorkspaceUseCase) Execute(input CreateWorkspaceInput) error {
	err := uc.workspaceService.Create(&input.Workspace, input.ClerkUserID)
	if err != nil {
		return err
	}

	if err := uc.distributorService.AssignWorkspace(input.DistributorID, input.Workspace.ID); err != nil {
		return err
	}

	if err := uc.clerkUserService.SetWorkspace(input.ClerkUserID, fmt.Sprintf("%d", input.Workspace.ID)); err != nil {
		return err
	}

	return nil
}

func NewCreateWorkspaceUseCase(
	ws service.WorkspaceService,
	ds service.DistributorService,
	cs service.ClerkService,
) CreateWorkspaceUseCase {
	return &createWorkspaceUseCase{
		workspaceService:   ws,
		distributorService: ds,
		clerkUserService:   cs,
	}
}
