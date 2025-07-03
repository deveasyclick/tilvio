package models

import (
	"gorm.io/gorm"
)

type PriceListItem struct {
	gorm.Model
	Price       float32    `gorm:"not null;type:float" json:"price"`
	Dimension   string     `gorm:"not null;type:varchar(10)" json:"dimension"`
	PriceListID uint       `json:"priceListId"`
	WorkspaceID uint       `json:"workspaceId"`
	Workspace   *Workspace `gorm:"foreignKey:WorkspaceID" json:"workspace"`
}
