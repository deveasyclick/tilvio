package service

import (
	"context"
	"encoding/json"

	"github.com/clerk/clerk-sdk-go/v2/user"
)

type ClerkService interface {
	SetWorkspace(clerkUserID string, workspaceID string) error
	SetExternalID(userClerkID string, externalID string) error
}

type clerkService struct {
}

func (s *clerkService) SetWorkspace(userClerkID string, workspaceID string) error {
	dataBytes, _ := json.Marshal(map[string]string{
		"workspace_id": workspaceID,
	})
	raw := json.RawMessage(dataBytes)
	_, err := user.Update(context.Background(), userClerkID, &user.UpdateParams{PublicMetadata: &raw})

	return err
}

func (s *clerkService) SetExternalID(userClerkID string, externalID string) error {
	_, err := user.Update(context.Background(), userClerkID, &user.UpdateParams{ExternalID: &externalID})

	return err
}

func NewClerkService() ClerkService {
	return &clerkService{}
}
