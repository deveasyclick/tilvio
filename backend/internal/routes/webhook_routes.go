package routes

import (
	"github.com/deveasyclick/tilvio/internal/handler"
	"github.com/deveasyclick/tilvio/internal/middleware"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func registerWebhookRoutes(r chi.Router, db *gorm.DB) {
	distributorRepo := repository.NewDistributorRepository(db)
	webhookSvc := service.NewWebhookService(service.NewDistributorService(distributorRepo))
	webhookHandler := handler.NewWebhookHandler(webhookSvc)

	// Public routes (no auth required, but webhook signature is verified)
	r.Route("/webhooks", func(r chi.Router) {
		r.Post("/", middleware.VerifyClerkWebhook(webhookHandler.HandleWebhook))
	})
}
