package middleware

import (
	"context"
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2"
	clerkHttp "github.com/clerk/clerk-sdk-go/v2/http"
	"github.com/deveasyclick/tilvio/pkg/types"
)

func customClaimsConstructor(ctx context.Context) any {
	return &types.CustomSessionClaims{}
}

func WithCustomClaimsConstructor(params *clerkHttp.AuthorizationParams) error {
	params.VerifyParams.CustomClaimsConstructor = customClaimsConstructor
	return nil
}

func AuthRequiredMiddleware(opts ...clerkHttp.AuthorizationOption) func(http.Handler) http.Handler {
	// Extract custom claims from the request
	opts = append(opts, WithCustomClaimsConstructor)
	return func(next http.Handler) http.Handler {
		return clerkHttp.WithHeaderAuthorization(opts...)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			claims, ok := clerk.SessionClaimsFromContext(r.Context())

			if !ok || claims == nil {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(`{"message": "unauthorized"}`))
				return
			}
			customClaims := claims.Custom.(*types.CustomSessionClaims)
			ctx := context.WithValue(r.Context(), types.ActiveSessionUserId, *customClaims.UserId)
			next.ServeHTTP(w, r.WithContext(ctx))
		}))
	}
}
