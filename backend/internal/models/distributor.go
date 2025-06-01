package models

import (
	"database/sql/driver"
	"errors"

	"gorm.io/gorm"
)

type Role string

const (
	RoleAdmin   Role = "admin"
	RoleManager Role = "manager"
)

const errInvalidRoleValue = "invalid role value"

// Scan implements the Scanner interface for database deserialization
func (r *Role) Scan(value interface{}) error {
	strValue, ok := value.(string)
	if !ok {
		return errors.New(errInvalidRoleValue)
	}

	switch Role(strValue) {
	case RoleAdmin, RoleManager:
		*r = Role(strValue)
		return nil
	default:
		return errors.New(errInvalidRoleValue)
	}
}

// Value implements the driver Valuer interface for database serialization
func (r Role) Value() (driver.Value, error) {
	switch r {
	case RoleAdmin, RoleManager:
		return string(r), nil
	default:
		return nil, errors.New(errInvalidRoleValue)
	}
}

type Distributor struct {
	gorm.Model
	FirstName string      `gorm:"not null;type:varchar(100);check:first_name <> ''" json:"firstName" validate:"required,max=100"`
	LastName  string      `gorm:"not null;type:varchar(100);check:last_name <> ''" json:"lastName" validate:"required,max=100"`
	Email     string      `gorm:"uniqueIndex;type:varchar(50);check:email <> ''" json:"email" validate:"required,max=50"`
	Phone     string      `gorm:"not null;type:varchar(50);check:phone <> ''" json:"phone" validate:"required,max=50"`
	State     string      `gorm:"not null;type:varchar(30);check:state <> ''" json:"state" validate:"required,max=30"`
	City      string      `gorm:"not null;type:varchar(30);check:city <> ''" json:"city" validate:"required,max=30"`
	Address   string      `gorm:"not null;type:varchar(100);check:address <> ''" json:"address" validate:"required,max=100"`
	Role      string      `gorm:"not null;type:varchar(100);check:role IN ('admin', 'manager');default:'manager'" json:"role" validate:"required,max=100"`
	Workspace []Workspace `gorm:"many2many:distributor_workspaces;" json:"workspaces"`
}
