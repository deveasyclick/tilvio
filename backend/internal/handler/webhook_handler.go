package handler

import (
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/deveasyclick/tilvio/pkg/context"
)

type WebhookHandler interface {
	HandleWebhook(w http.ResponseWriter, r *http.Request)
}

type webhookHandler struct {
	webhookService service.WebhookService
}

func (h *webhookHandler) HandleWebhook(w http.ResponseWriter, r *http.Request) {
	event := context.GetWebhookEvent(r.Context())
	if event == nil {
		slog.Error("No webhook event in context")
		http.Error(w, "No webhook event in context", http.StatusBadRequest)
		return
	}

	slog.Info("Handling webhook event", "event", event.Data)
	var err error
	switch event.Type {
	case "user.created":
		err = h.webhookService.HandleDistributorCreated(event.Data)
	default:
		// Ignore unknown event types
		slog.Info("Ignoring unknown webhook event type", "type", event.Type)
		w.WriteHeader(http.StatusOK)
		return
	}

	if err != nil {
		slog.Error("Error handling webhook event", "err", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func NewWebhookHandler(webhookService service.WebhookService) WebhookHandler {
	return &webhookHandler{
		webhookService: webhookService,
	}
}
