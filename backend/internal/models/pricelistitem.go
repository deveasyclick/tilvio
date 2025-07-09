package models

type PriceListItem struct {
	BaseModel
	Price       float32    `gorm:"not null;type:float" json:"price"`
	Dimension   string     `gorm:"not null;type:varchar(10)" json:"dimension"`
	PriceListID uint       `json:"priceListId"`
	WorkspaceID uint       `json:"workspaceId"`
	Workspace   *Workspace `gorm:"foreignKey:WorkspaceID" json:"workspace"`
}
