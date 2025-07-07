package models

import (
	"database/sql/driver"
	"errors"
)

type Role string

const (
	RoleDistributor Role = "distributor"
	RoleManager     Role = "manager"
)

const errInvalidRoleValue = "invalid role value"

// Scan implements the Scanner interface for database deserialization
func (r *Role) Scan(value interface{}) error {
	strValue, ok := value.(string)
	if !ok {
		return errors.New(errInvalidRoleValue)
	}

	switch Role(strValue) {
	case RoleDistributor, RoleManager:
		*r = Role(strValue)
		return nil
	default:
		return errors.New(errInvalidRoleValue)
	}
}

// Value implements the driver Valuer interface for database serialization
func (r Role) Value() (driver.Value, error) {
	switch r {
	case RoleDistributor, RoleManager:
		return string(r), nil
	default:
		return nil, errors.New(errInvalidRoleValue)
	}
}

type Distributor struct {
	BaseModel
	ClerkID     string    `gorm:"uniqueIndex;type:varchar(50)" json:"clerkId"`
	FirstName   string    `gorm:"not null;type:varchar(100);check:first_name <> ''" json:"firstName" validate:"required,max=100"`
	LastName    string    `gorm:"not null;type:varchar(100);check:last_name <> ''" json:"lastName" validate:"required,max=100"`
	Email       string    `gorm:"uniqueIndex;type:varchar(50);check:email <> ''" json:"email" validate:"required,max=50"`
	Phone       *string   `gorm:"type:varchar(50)" json:"phone" validate:"omitempty,max=50"`
	State       *string   `gorm:"type:varchar(30)" json:"state" validate:"omitempty,max=30"`
	City        *string   `gorm:"type:varchar(30)" json:"city" validate:"omitempty,max=30"`
	Address     *string   `gorm:"type:varchar(100)" json:"address" validate:"omitempty,max=100"`
	Role        Role      `gorm:"type:varchar(20);check:role IN ('distributor', 'manager');default:'distributor'" json:"role" validate:"required"`
	WorkspaceID *uint     `json:"workspaceId,omitempty"`
	Workspace   Workspace `gorm:"foreignKey:WorkspaceID" json:"workspace,omitempty"`
}
