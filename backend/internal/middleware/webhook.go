package middleware

import (
	"bytes"
	"encoding/json"
	"io"
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/pkg/context"
	"github.com/deveasyclick/tilvio/pkg/svix"
	"github.com/deveasyclick/tilvio/pkg/types"
)

// VerifyClerkWebhook is a middleware that verifies Clerk webhook signatures
func VerifyClerkWebhook(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Verify webhook signature
		wh, err := svix.GetWebhookVerifier()
		if err != nil {
			slog.Error("Webhook verifier not initialized", "err", err)
			http.Error(w, "Webhook verifier not initialized", http.StatusInternalServerError)
			return
		}

		// Read and validate the request body
		body, err := io.ReadAll(r.Body)
		if err != nil {
			slog.Error("Error reading request body", "err", err)
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Create a new reader with the body for verification
		r.Body = io.NopCloser(bytes.NewBuffer(body))

		// Create headers for verification
		headers := http.Header{}
		headers.Set("svix-id", r.Header.Get("svix-id"))
		headers.Set("svix-timestamp", r.Header.Get("svix-timestamp"))
		headers.Set("svix-signature", r.Header.Get("svix-signature"))

		// Verify the webhook
		err = wh.Verify(body, headers)
		if err != nil {
			slog.Error("Invalid webhook signature", "err", err)
			http.Error(w, "Invalid webhook signature", http.StatusUnauthorized)
			return
		}

		// Parse the webhook event
		event := types.WebhookEvent{}
		if err := json.Unmarshal(body, &event); err != nil {
			slog.Error("Invalid webhook payload", "err", err)
			http.Error(w, "Invalid webhook payload", http.StatusBadRequest)
			return
		}
		// Store the parsed event in the request context
		ctx := r.Context()
		ctx = context.WithWebhookEvent(ctx, &event)
		r = r.WithContext(ctx)

		// Call the next handler
		next(w, r)
	}
}
