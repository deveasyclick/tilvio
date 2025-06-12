package middleware

import (
	"context"
	"net/http"

	"github.com/clerk/clerk-sdk-go/v2"
	clerkHttp "github.com/clerk/clerk-sdk-go/v2/http"
)

type CustomSessionClaims struct {
	UserID *string `json:"userId"`
}

func AuthRequiredMiddleware(opts ...clerkHttp.AuthorizationOption) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return clerkHttp.WithHeaderAuthorization(opts...)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			claims, ok := clerk.SessionClaimsFromContext(r.Context())

			if !ok || claims == nil {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(`{"message": "unauthorized"}`))
				return
			}
			// TODO: This should be a user ID, not a Clerk ID but we need to figure out how to get the user ID from Clerk
			ctx := context.WithValue(r.Context(), "userClerkId", claims.Subject)
			next.ServeHTTP(w, r.WithContext(ctx))
		}))
	}
}
