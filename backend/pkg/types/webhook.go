package types

import "time"

// WebhookEvent represents a generic webhook event structure
type WebhookEvent struct {
	ID        string                 `json:"id"`
	Type      string                 `json:"type"`
	Data      map[string]interface{} `json:"data"`
	CreatedAt time.Time              `json:"created_at"`
	WebhookID string                 `json:"webhook_id"`
}
