package error_messages

const (
	// common
	ErrInvalidID             = "invalid ID"
	ErrEncodeResponseFailed  = "failed to encode response"
	ErrParseID               = "failed to parse ID"
	ErrInvalidRequestPayload = "invalid request payload"
	ErrRequestFailed         = "request failed, try again later"
	ErrInvalidFilter         = "invalid filter"

	// priceList
	ErrPriceListExists   = "priceList already exists"
	ErrPriceListNotFound = "priceList not found"
	ErrCreatePriceList   = "error creating priceList"
	ErrDeletePriceList   = "error deleting priceList"
	ErrDeletePriceLists  = "error deleting priceLists"
	ErrUpdatePriceList   = "error updating priceList"
	ErrFindPriceList     = "error finding priceList"
	ErrFilterPriceList   = "error filtering priceList"

	// priceListItem
	ErrPriceListItemExists   = "priceListItem already exists"
	ErrPriceListItemNotFound = "priceListItem not found"
	ErrCreatePriceListItem   = "error creating priceListItem"
	ErrCreatePriceListItems  = "error creating priceListItems"
	ErrDeletePriceListItem   = "error deleting priceListItem"
	ErrUpdatePriceListItem   = "error updating priceListItem"
	ErrFindPriceListItem     = "error finding priceListItem"
	ErrFilterPriceListItem   = "error filtering priceListItem"

	// workspace
	ErrWorkspaceExists   = "workspace already exists"
	ErrWorkspaceNotFound = "workspace not found"
	ErrCreateWorkspace   = "error creating workspace"
	ErrUpdateWorkspace   = "error updating workspace"
	ErrFindWorkspace     = "error finding workspace"

	// distributor
	ErrDistributorExists   = "distributor already exists"
	ErrDistributorNotFound = "distributor not found"
	ErrCreateDistributor   = "error creating distributor"
	ErrUpdateDistributor   = "error updating distributor"
	ErrFindDistributor     = "error finding distributor"
)
