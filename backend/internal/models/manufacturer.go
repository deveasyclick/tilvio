package models

import (
	"gorm.io/gorm"
)

type Manufacturer struct {
	gorm.Model
	Name     string `gorm:"uniqueIndex;not null;type:varchar(100)" json:"name"`
	Location string `gorm:"type:varchar(100)" json:"location"`
	Logo     string `gorm:"type:varchar(255)" json:"logo"`
	Url      string `gorm:"type:varchar(255)" json:"url"`
}
