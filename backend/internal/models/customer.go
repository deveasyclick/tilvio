package models

import "gorm.io/gorm"

type Customer struct {
	gorm.Model
	FirstName     string      `gorm:"not null;type:varchar(100);check:first_name <> ''" json:"firstName" validate:"required,max=100"`
	LastName      string      `gorm:"not null;type:varchar(100);check:last_name <> ''" json:"lastName" validate:"required,max=100"`
	PhoneNumber   string      `gorm:"not null;type:varchar(50)" json:"phoneNumber"`
	Email         string      `gorm:"uniqueIndex;not null;type:varchar(100);check:email <> ''" json:"email" validate:"required,max=100"`
	State         string      `gorm:"type:varchar(50)" json:"state"`
	City          string      `gorm:"type:varchar(50)" json:"city"`
	Country       string      `gorm:"type:varchar(50)" json:"country"`
	Address       string      `gorm:"not null;type:varchar(200)" json:"address"`
	WorkspaceID   uint        `json:"workspaceId"`
	Workspace     Workspace   `gorm:"foreignKey:WorkspaceID" json:"workspace"`
	DistributorID uint        `json:"distributorId"`
	Distributor   Distributor `gorm:"foreignKey:DistributorID" json:"distributor"`
	Orders        []Order     `gorm:"foreignKey:CustomerID" json:"orders"`
}
