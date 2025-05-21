package models

import (
	"gorm.io/gorm"
)

type PriceList struct {
	gorm.Model
	Name           string          `gorm:"not null;type:varchar(100)" json:"name"`
	Status         string          `gorm:"not null;type:varchar(20)" json:"status"`
	DistributorID  uint            `json:"distributorId"` // Foreign key
	CreatedBy      Distributor     `gorm:"foreignKey:DistributorID" json:"createdBy"`
	WorkspaceID    uint            `json:"workspaceId"`
	Workspace      Workspace       `gorm:"foreignKey:WorkspaceID" json:"workspace"`
	PriceListItems []PriceListItem `gorm:"foreignKey:PriceListID" json:"priceListItems"`
}
