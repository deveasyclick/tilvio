package httphelper

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/pkg/types"
)

// TODO: Replace all handlers error handling with this function
func WriteJSONError(w http.ResponseWriter, message string, err *types.APIERROR) {
	slog.Error(err.Message, "err", err.Message)

	w.WriteHeader(err.Code)
	_ = json.NewEncoder(w).Encode(err)
}
