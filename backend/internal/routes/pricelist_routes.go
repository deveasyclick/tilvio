package routes

import (
	"github.com/deveasyclick/tilvio/internal/handler"
	"github.com/deveasyclick/tilvio/internal/middleware"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func registerPriceListRoutes(router chi.Router, db *gorm.DB) {
	priceListRepo := repository.NewPriceListRepository(db)
	priceListService := service.NewPriceListService(priceListRepo)
	workspaceHandler := handler.NewPriceListHandler(priceListService)

	// All pricelist routes require authentication
	router.Route("/pricelists", func(r chi.Router) {
		r.Post("/", workspaceHandler.Create)

		// Get pricelist by ID
		r.Get("/filter", workspaceHandler.Filter)

		// Get pricelist by ID
		r.With(middleware.ValidatePriceListId(db)).Get("/{id}", workspaceHandler.Get)

		// Update pricelist by ID
		r.With(middleware.ValidatePriceListId(db)).Patch("/{id}", workspaceHandler.Update)

		// Delete pricelist by ID
		r.With(middleware.ValidatePriceListId(db)).Delete("/{id}", workspaceHandler.Delete)

		// Delete many pricelists by IDs
		r.Post("/delete/bulk", workspaceHandler.BulkDelete)

	})
}
