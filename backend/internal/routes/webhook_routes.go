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
	distributorSvc := service.NewDistributorService(distributorRepo)
	clerkSvc := service.NewClerkService()
	webhookSvc := service.NewWebhookService(distributorSvc, clerkSvc)
	webhookHandler := handler.NewWebhookHandler(webhookSvc)

	// Public routes (no auth required, but webhook signature is verified)
	r.Route("/webhooks", func(r chi.Router) {
		r.With(middleware.VerifyClerkWebhook).Post("/handleUserCreated", webhookHandler.HandleWebhook)
	})
}
