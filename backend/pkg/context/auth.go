package context

import (
	"context"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/deveasyclick/tilvio/pkg/types"
)

func GetAuthenticatedUser(ctx context.Context) types.AuthenticatedUser {
	claims, _ := clerk.SessionClaimsFromContext(ctx)
	customClaims := claims.Custom.(*types.CustomSessionClaims)
	authenticatedUser := &types.AuthenticatedUser{
		ID:          customClaims.UserId,
		ClerkID:     claims.Subject,
		WorkspaceID: customClaims.WorkspaceId,
	}
	return *authenticatedUser
}
