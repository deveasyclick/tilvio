package middleware

import (
	"log/slog"
	"net/http"
	"strconv"

	"github.com/deveasyclick/tilvio/internal/repository"
	"github.com/deveasyclick/tilvio/internal/service"
	"github.com/deveasyclick/tilvio/pkg/types/error_messages"
	"github.com/go-chi/chi"
	"gorm.io/gorm"
)

func ValidatePriceListId(db *gorm.DB) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			id, err := strconv.ParseUint(chi.URLParam(r, "id"), 10, 64)
			if err != nil {
				slog.Error(error_messages.ErrInvalidID, "error", err)
				http.Error(w, error_messages.ErrInvalidID, http.StatusBadRequest)
				return
			}
			priceListRepo := repository.NewPriceListRepository(db)
			priceListService := service.NewPriceListService(priceListRepo)
			// Check if price list exists
			if exists, err := priceListService.Exists(uint(id)); err != nil || !exists {
				slog.Error(error_messages.ErrPriceListNotFound, "error", err, "id", id)
				http.Error(w, error_messages.ErrPriceListNotFound, http.StatusNotFound)
				return
			}

			// Call the next handler
			next.ServeHTTP(w, r)
		})
	}
}
