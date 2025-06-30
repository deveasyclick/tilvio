package context

import (
	"context"

	"github.com/deveasyclick/tilvio/pkg/types"
)

type key int

const (
	webhookEventKey key = iota
	// Add more keys here as needed
)

// WithWebhookEvent stores the webhook event in the context
func WithWebhookEvent(ctx context.Context, event *types.WebhookEvent) context.Context {
	return context.WithValue(ctx, webhookEventKey, event)
}

// GetWebhookEvent retrieves the webhook event from the context
func GetWebhookEvent(ctx context.Context) *types.WebhookEvent {
	event, _ := ctx.Value(webhookEventKey).(*types.WebhookEvent)
	return event
}

func GetActiveUserID(ctx context.Context) string {
	return ctx.Value(types.ActiveSessionUserId).(string)
}
