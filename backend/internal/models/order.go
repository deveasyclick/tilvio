package models

type Order struct {
	BaseModel
	DistributorID uint        `json:"distributorId"` // Foreign key
	CreatedBy     Distributor `gorm:"foreignKey:DistributorID" json:"createdBy"`
	CustomerID    uint        `json:"customerId"` // Foreign key
	RequestedFor  Customer    `gorm:"foreignKey:CustomerID" json:"requestedFor"`
	Status        string      `gorm:"not null;type:varchar(20)" json:"status"`
	TotalPrice    float64     `gorm:"not null" json:"totalPrice"`
	TotalWeight   float64     `gorm:"not null" json:"totalWeight"`
	TransportFare float64     `gorm:"not null" json:"transportFare"`
	WorkspaceID   uint        `json:"workspaceId"`
	Workspace     Workspace   `gorm:"foreignKey:WorkspaceID" json:"workspace"`
	OrderItems    []OrderItem `gorm:"foreignKey:OrderID" json:"orderItems"`
}
