package validator

import (
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/deveasyclick/tilvio/pkg/tile"
	"github.com/deveasyclick/tilvio/pkg/types"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func init() {
	validate = validator.New()

	err := validate.RegisterValidation("uniqueDimension", uniqueDimension)
	if err != nil {
		slog.Error("failed to register uniqueDimension validation", "error", err)
	}
	err = validate.RegisterValidation("isValidDesc", isValidDescription)
	if err != nil {
		slog.Error("failed to register isValidDesc validation", "error", err)
	}
}

type ValidationError struct {
	Field string `json:"field"`
	Tag   string `json:"tag"`
	Value string `json:"value"`
}

func uniqueDimension(fl validator.FieldLevel) bool {
	items, ok := fl.Field().Interface().([]types.CreatPriceListItemRequest)
	if !ok {
		return false // wrong type
	}

	seen := make(map[string]bool)
	for _, item := range items {
		if seen[item.Dimension] {
			return false // duplicate found
		}
		seen[item.Dimension] = true
	}

	return true
}

// Ensure that the description is valid
func isValidDescription(fl validator.FieldLevel) bool {
	desc := fl.Field().String()
	for _, d := range tile.Descriptions {
		if d == desc {
			return true
		}
	}
	return false
}

func ValidateRequest(r *http.Request, req interface{}) []ValidationError {
	if err := json.NewDecoder(r.Body).Decode(req); err != nil {
		return []ValidationError{{
			Field: "body",
			Tag:   "json",
			Value: err.Error(),
		}}
	}

	var validationErrors []ValidationError

	err := validate.Struct(req)
	if err != nil {
		var validationErr validator.ValidationErrors
		if errors.As(err, &validationErr) {
			for _, err := range validationErr {
				validationErrors = append(validationErrors, ValidationError{
					Field: err.Field(),
					Tag:   err.Tag(),
					Value: fmt.Sprintf("%v", err.Value()),
				})
			}
		}
	}

	return validationErrors
}

func WriteValidationResponse(w http.ResponseWriter, errors []ValidationError) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusBadRequest)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"errors": errors,
	})
}
