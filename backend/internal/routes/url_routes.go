package routes

import (
	"github.com/deveasyclick/tilvio/internal/handler"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

// TODO: To be removed
func registerURLRoutes(router chi.Router, db *gorm.DB) {
	urlRepo := repository.NewURLRepository(db)
	urlSvc := service.NewURLService(urlRepo)
	urlHandler := handler.NewURLHandler(urlSvc)

	// Group URL routes under /urls base path
	router.Route("/urls", func(r chi.Router) {
		r.Post("/", urlHandler.CreateShortURL)
	})
}
