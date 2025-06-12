package validator

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
}

type ValidationError struct {
	Field string `json:"field"`
	Tag   string `json:"tag"`
	Value string `json:"value"`
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
					Value: err.Param(),
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
