package server

import (
	"fmt"

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

	fmt.Println("Server is running on port 8080")
	return server
}
