package service

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"strconv"

	"github.com/deveasyclick/tilvio/internal/models"
	"github.com/deveasyclick/tilvio/pkg/types"
)

type WebhookService interface {
	HandleDistributorCreated(data map[string]interface{}) error
}

type webhookService struct {
	distributorService DistributorService
	clerkService       ClerkService
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
	externalID := strconv.FormatUint(uint64(distributor.ID), 10)
	err = s.clerkService.SetExternalID(distributor.ClerkID, externalID)

	if err != nil {
		slog.Error("error updating clerk user", "error", err)
	} else {
		slog.Info("Updated clerk user externalId", "externalId", externalID)
	}

	return nil
}

func NewWebhookService(service DistributorService, clerkService ClerkService) WebhookService {
	return &webhookService{distributorService: service, clerkService: clerkService}
}
