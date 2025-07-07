package models

type PriceList struct {
	BaseModel
	Name           string          `gorm:"not null;type:varchar(100);unique" json:"name"`
	Status         string          `gorm:"not null;type:varchar(20);default:'active'" json:"status"`
	CreatedByID    uint            `json:"createdById"` // Foreign key
	CreatedBy      *Distributor    `gorm:"foreignKey:CreatedByID" json:"createdBy,omitempty"`
	WorkspaceID    uint            `json:"workspaceId"`
	Workspace      *Workspace      `gorm:"foreignKey:WorkspaceID" json:"workspace"`
	PriceListItems []PriceListItem `gorm:"foreignKey:PriceListID" json:"priceListItems"`
}
