package main

import (
	"fmt"
	"log/slog"
	"net/http"

	server "github.com/deveasyclick/tilvio/internal"
	"github.com/deveasyclick/tilvio/internal/config"
	logger "github.com/deveasyclick/tilvio/pkg"
)

func main() {
	logger.Init()
	s := server.New()
	slog.Info("Starting server....", slog.Int("port", config.PORT))
	_ = http.ListenAndServe(fmt.Sprintf(":%d", config.PORT), s.Router)
}
