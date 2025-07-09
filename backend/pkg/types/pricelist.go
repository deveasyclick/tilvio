package types

type CreatPriceListItemRequest struct {
	Price     float32 `json:"price" validate:"required"`
	Dimension string  `json:"dimension" validate:"required"`
}

// Using camel case for json fields because the json field is case-insensitive. For example pricelistitems in the request body will match priceListItems in the struct.
type CreatePriceListRequest struct {
	Name           string                      `json:"name"  validate:"required,min=10"`
	PriceListItems []CreatPriceListItemRequest `json:"price_list_items" validate:"required,min=1,uniqueDimension,dive"`
}

type UpdatePriceListRequest struct {
	Name string `json:"name" validate:"required,min=10"`
}

type BulkDeletePriceListRequest struct {
	IDs []uint `json:"ids" validate:"required,min=1"`
}
