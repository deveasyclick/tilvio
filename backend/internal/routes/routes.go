package routes

import (
	"net/http"
	"time"

	"github.com/deveasyclick/tilvio/internal/db"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/httprate"
)

func Register(db db.Service) *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.Logger)

	// Enable rate limiter of 100 requests per minute per IP
	r.Use(httprate.LimitByIP(100, 1*time.Minute))

	// Health check endpoint outside of API versioning
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("alive"))
	})

	r.Route("/api", func(r chi.Router) {
		registerURLRoutes(r, db.DB)
		registerWebhookRoutes(r, db.DB)
	})

	return r
}
