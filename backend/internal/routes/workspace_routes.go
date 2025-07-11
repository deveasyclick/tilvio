package routes

import (
	"github.com/deveasyclick/tilvio/internal/handler"
	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/deveasyclick/tilvio/internal/usecases"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func registerWorkspaceRoutes(router chi.Router, db *gorm.DB) {
	distributorRepo := repository.NewDistributorRepository(db)
	distributorService := service.NewDistributorService(distributorRepo)
	workspaceRepo := repository.NewWorkspaceRepository(db)
	workspaceSvc := service.NewWorkspaceService(workspaceRepo, distributorService)
	clerkSvc := service.NewClerkService()
	createWorkspaceUC := usecases.NewCreateWorkspaceUseCase(workspaceSvc, distributorService, clerkSvc)
	workspaceHandler := handler.NewWorkspaceHandler(workspaceSvc, createWorkspaceUC)

	// All workspace routes require authentication
	router.Route("/workspaces", func(r chi.Router) {
		r.Post("/", workspaceHandler.Create)

		// Get workspace by ID
		r.Get("/{id}", workspaceHandler.Get)

		// Update workspace by ID
		r.Put("/{id}", workspaceHandler.Update)

		// Delete workspace by ID
		r.Delete("/{id}", workspaceHandler.Delete)

	})
}
