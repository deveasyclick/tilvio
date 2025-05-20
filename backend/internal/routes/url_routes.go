package routes

import (
	"github.com/deveasyclick/tilvio/internal/handler"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func registerURLRoutes(router *chi.Mux, db *gorm.DB) {
	urlRepo := repository.NewURLRepository(db)
	urlSvc := service.NewURLService(urlRepo)
	urlHandler := handler.NewURLHandler(urlSvc)

	router.Get("/", urlHandler.CreateShortURL)
}
