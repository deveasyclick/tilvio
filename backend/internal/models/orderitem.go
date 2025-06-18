package models

import (
	"gorm.io/gorm"
)

type OrderItem struct {
	gorm.Model
	OrderID       uint        `json:"orderId"`
	UnitPrice     float64     `gorm:"not null" json:"unitPrice"`
	TotalPrice    float64     `gorm:"not null" json:"totalPrice"`
	TileID        uint        `json:"tileId"`
	Tile          Tile        `gorm:"foreignKey:TileID" json:"tile"`
	Quantity      int         `gorm:"not null" json:"quantity"`
	Weight        float64     `gorm:"not null" json:"weight"`
	TotalWeight   float64     `gorm:"not null" json:"totalWeight"`
	DistributorID uint        `json:"distributorId"` // Foreign key
	CreatedBy     Distributor `gorm:"foreignKey:DistributorID" json:"createdBy"`
	WorkspaceID   uint        `json:"workspaceId"`
	Workspace     Workspace   `gorm:"foreignKey:WorkspaceID" json:"workspace"`
}
