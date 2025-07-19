package httphelper

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/pkg/types"
)

// TODO: Replace all handlers error handling with this function
func WriteJSONError(w http.ResponseWriter, message string, err *types.APIERROR) {
	slog.Error(message, "err", err.Message)

	// If the error is an internal server error, overwrite the message
	if err.Code == http.StatusInternalServerError {
		err.Message = message
	}
	w.WriteHeader(err.Code)
	_ = json.NewEncoder(w).Encode(err)
}
