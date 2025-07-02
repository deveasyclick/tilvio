package context

import (
	"context"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/deveasyclick/tilvio/pkg/types"
)

type AuthenticatedUser struct {
	ID          string
	ClerkID     string
	WorkspaceID string
}

func GetAuthenticatedUser(ctx context.Context) AuthenticatedUser {
	claims, _ := clerk.SessionClaimsFromContext(ctx)
	customClaims := claims.Custom.(*types.CustomSessionClaims)
	authenticatedUser := &AuthenticatedUser{
		ID:          customClaims.UserId,
		ClerkID:     claims.Subject,
		WorkspaceID: customClaims.WorkspaceId,
	}
	return *authenticatedUser
}
