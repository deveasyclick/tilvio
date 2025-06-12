package service

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"strconv"

	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/pkg/types"
)

type WebhookService interface {
	HandleDistributorCreated(data map[string]interface{}) error
}

type webhookService struct {
	distributorService DistributorService
}

func (s *webhookService) HandleDistributorCreated(data map[string]interface{}) error {
	var userData types.ClerkUser
	jsonData, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("error marshaling user data: %w", err)
	}

	if err := json.Unmarshal(jsonData, &userData); err != nil {
		return fmt.Errorf("error unmarshaling user data: %w", err)
	}

	distributor := &models.Distributor{
		ClerkID:   userData.ID,
		FirstName: userData.FirstName,
		LastName:  userData.LastName,
		Email:     userData.EmailAddresses[0].EmailAddress,
		Role:      models.RoleDistributor,
	}

	err = s.distributorService.Create(distributor)

	if err != nil {
		return fmt.Errorf("error creating distributor: %w", err)
	}

	insertedDistributor, err := s.distributorService.GetDistributorByEmail(distributor.Email)
	if err != nil {
		slog.Error("error fetching distributor", "error", err)
	}
	externalID := strconv.FormatUint(uint64(insertedDistributor.ID), 10)
	_, err = user.Update(context.Background(), insertedDistributor.ClerkID, &user.UpdateParams{ExternalID: &externalID})

	if err != nil {
		slog.Error("error updating clerk user", "error", err)
	} else {
		slog.Info("Updated clerk user externalId", "externalId", externalID)
	}

	return nil
}

func NewWebhookService(service DistributorService) WebhookService {
	return &webhookService{distributorService: service}
}
