package models

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	ManufacturerID uint         `json:"manufacturerId"`
	Manufacturer   Manufacturer `gorm:"foreignKey:ManufacturerID" json:"manufacturer"`
	Code           string       `gorm:"uniqueIndex;not null;type:varchar(100)" json:"code"`
	Description    string       `gorm:"type:varchar(255)" json:"description"`
	Dimension      string       `gorm:"index;not null;type:varchar(50)" json:"dimension"`
	Type           string       `gorm:"not null;type:varchar(50)" json:"type"`
	ImageURL       string       `gorm:"type:varchar(255)" json:"imageUrl"`
	WeightInKg     int          `gorm:"not null" json:"weightInKg"`
	WorkspaceID    uint         `json:"workspaceId"`
	Workspace      Workspace    `gorm:"foreignKey:WorkspaceID" json:"workspace"`
	DistributorID  uint         `json:"distributorId"` // Foreign key
	CreatedBy      Distributor  `gorm:"foreignKey:DistributorID" json:"createdBy"`
}
