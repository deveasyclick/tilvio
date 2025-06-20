package routes

import (
	"github.com/deveasyclick/tilvio/internal/handler"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func registerManufacturerRoutes(router chi.Router, db *gorm.DB) {
	manufacturerRepo := repository.NewManufacturerRepository(db)
	manufacturerService := service.NewManufacturerService(manufacturerRepo)
	manufacturerHandler := handler.NewManufacturerHandler(manufacturerService)

	router.Route("/manufacturers", func(r chi.Router) {
		r.Get("/", manufacturerHandler.FindAll)
	})
}
