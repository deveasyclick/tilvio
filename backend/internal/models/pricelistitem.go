package models

import (
	"gorm.io/gorm"
)

type PriceListItem struct {
	gorm.Model
	Price       string    `gorm:"not null;type:varchar(50)" json:"price"`
	Dimension   string    `gorm:"not null;type:varchar(50)" json:"dimension"`
	PriceListID uint      `json:"priceListId"`
	WorkspaceID uint      `json:"workspaceId"`
	Workspace   Workspace `gorm:"foreignKey:WorkspaceID" json:"workspace"`
}
