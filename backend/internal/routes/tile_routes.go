package routes

import (
	"github.com/deveasyclick/tilvio/internal/handler"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func registerTileRoutes(router chi.Router, db *gorm.DB) {
	tileRepo := repository.NewTileRepository(db)
	tileService := service.NewTileService(tileRepo)
	tileHandler := handler.NewTileHandler(tileService)

	// All workspace routes require authentication
	router.Route("/tiles", func(r chi.Router) {
		r.Get("/", tileHandler.Filter)
		r.Get("/{id}", tileHandler.Get)
	})
}
