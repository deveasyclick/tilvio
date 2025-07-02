package error_messages

const (
	ErrInvalidID            = "invalid ID"
	ErrEncodeResponseFailed = "failed to encode response"
	// priceList
	ErrPriceListExists   = "priceList already exists"
	ErrPriceListNotFound = "priceList not found"
	ErrCreatePriceList   = "error creating priceList"
	ErrDeletePriceList   = "error deleting priceList"
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
