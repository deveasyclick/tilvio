package server

import (
	"github.com/deveasyclick/tilvio/internal/db"
	"github.com/deveasyclick/tilvio/internal/routes"
	"github.com/go-chi/chi"
)

type Server struct {
	DB     db.Service
	Router *chi.Mux
}

func New() *Server {
	db := *db.New()
	r := routes.Register(db)
	server := &Server{
		DB:     db,
		Router: r,
	}

	return server
}
