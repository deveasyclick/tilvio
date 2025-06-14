package routes

import (
	"github.com/deveasyclick/tilvio/internal/handler"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func registerDistributorRoutes(router chi.Router, db *gorm.DB) {
	distributorRepo := repository.NewDistributorRepository(db)
	distributorService := service.NewDistributorService(distributorRepo)
	distributorHandler := handler.NewDistributorHandler(distributorService)

	router.Route("/distributors", func(r chi.Router) {
		// Get workspace by ID
		r.Get("/me", distributorHandler.GetAuthenticated)
	})
}
