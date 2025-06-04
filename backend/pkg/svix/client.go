package svix

import (
	"sync"

	"github.com/deveasyclick/tilvio/internal/config"
	svix "github.com/svix/svix-webhooks/go"
)

var (
	wh     *svix.Webhook
	whOnce sync.Once
	whErr  error
)

// GetWebhookVerifier returns a singleton instance of the Svix webhook verifier
func GetWebhookVerifier() (*svix.Webhook, error) {
	whOnce.Do(func() {
		wh, whErr = svix.NewWebhook(config.CLERK_WEBHOOK_SIGNING_SECRET)
	})

	return wh, whErr
}
