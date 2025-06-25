package models

import (
	"gorm.io/gorm"
)

type Tile struct {
	gorm.Model
	ManufacturerID uint          `json:"manufacturer_id"`
	Manufacturer   *Manufacturer `gorm:"foreignKey:ManufacturerID" json:"manufacturer,omitempty"`
	Code           string        `gorm:"uniqueIndex;not null;type:varchar(100)" json:"code"`
	Description    string        `gorm:"type:varchar(255)" json:"description"`
	Dimension      string        `gorm:"index;not null;type:varchar(50)" json:"dimension"`
	Type           string        `gorm:"not null;type:varchar(50)" json:"type"`
	WeightInKg     float32       `gorm:"not null" json:"weightInKg"`
	S3Key          string        `gorm:"type:varchar(255)" json:"s3Key"`
}
