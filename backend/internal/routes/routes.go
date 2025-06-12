package routes

import (
	"time"

	"github.com/deveasyclick/tilvio/internal/db"
	"github.com/deveasyclick/tilvio/internal/middleware"
	"github.com/go-chi/chi"
	chiMiddleware "github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/httprate"
)

func Register(db db.Service) *chi.Mux {
	r := chi.NewRouter()

	r.Use(chiMiddleware.Logger)
	r.Use(chiMiddleware.Recoverer)
	// Enable rate limiter of 100 requests per minute per IP
	r.Use(httprate.LimitByIP(100, 1*time.Minute))
	r.Use(chiMiddleware.Heartbeat("/ping"))
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		// TODO: AllowedOrigins should be a list of domains that are allowed to access the API
		AllowedOrigins:   []string{"https://*", "http://*", "http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Route("/api", func(r chi.Router) {

		// Public routes
		r.Group(func(r chi.Router) {
			registerWebhookRoutes(r, db.DB)
		})

		// Private routes
		r.Group(func(r chi.Router) {
			r.Use(middleware.AuthRequiredMiddleware())
			registerURLRoutes(r, db.DB)
			registerWorkspaceRoutes(r, db.DB)
		})

	})

	return r
}
