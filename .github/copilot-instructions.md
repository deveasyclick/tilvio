

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4
- **Authentication**: Clerk
- **Routing**: React Router
- **State Management**: React Context API
- **Backend**: Golang, Chi
- **Database**: Postgres, Gorm


## Schema
```go
	Workspace struct {
  gorm.Model
	Name             string
	Logo             string
	OrganizationName string
	OrganizationUrl  string
	Email            string
	Phone            string
	State            string
	City             string
	Address          string
	OnboardedAt      bool
	Customers        []Customer
	Distributors     []Distributor
}

type Distributor struct {
	gorm.Model
	FirstName string
	LastName  string
	Email     string
	Phone     string
	State     string
	City      string
	Address   string
	Role      string
	Workspace []Workspace
}

type Customer struct {
	gorm.Model
	FirstName   string
	LastName    string
	PhoneNumber string
	Email       string
	State       string
	City        string
	Country     string
	Address     string
	Workspace   []Workspace
	Orders      []Order
}

type Manufacturer struct {
	gorm.Model
	Name     string
	Location string
	Logo     string
	Url      string
}

type Order struct {
	gorm.Model
	DistributorID uint
	CreatedBy     Distributor
	CustomerID    uint
	RequestedFor  Customer
	Status        string
	TotalPrice    float64
	TotalWeight   float64
	TransportFare float64
	WorkspaceID   uint
	Workspace     Workspace
	OrderItems    []OrderItem
}

type OrderItem struct {
	gorm.Model
	OrderID       uint
	UnitPrice     float64
	TotalPrice    float64
	ProductID     uint
	Product       Product
	Quantity      int
	Weight        float64
	TotalWeight   float64
	DistributorID uint
	CreatedBy     Distributor
	WorkspaceID   uint
	Workspace     Workspace
}

type PriceList struct {
	gorm.Model
	Name           string
	Status         string
	DistributorID  uint
	CreatedBy      Distributor
	WorkspaceID    uint
	Workspace      Workspace
	PriceListItems []PriceListItem
}


type PriceListItem struct {
	gorm.Model
	Price       string
	Dimension   string
	PriceListID uint
	WorkspaceID uint
	Workspace   Workspace
}


type Product struct {
	gorm.Model
	ManufacturerID uint
	Manufacturer   Manufacturer
	Code           string
	Description    string
	Dimension      string
	Type           string
	ImageURL       string
	WeightInKg     int
	WorkspaceID    uint
	Workspace      Workspace
	DistributorID  uint // Foreign key
	CreatedBy      Distributor
}


# APIs
## Orders
POST /orders - create an order
    payload: {order_items: [order_item], pricelist_id?: string}
GET /orders - list orders and order items
GET /orders/{id} - get an order and order items
PUT /orders/{id} - update an order order items (draft)
DELETE /orders/{id} - delete an order and order items (draft)
POST /orders/{id}/share - share an order


## Products
POST /products - create an order
    payload: {code: string, description: string, dimension: string, weight: string (calculate based on dimension and manufacture_id), image_url: string, manufacturer_id: string}
POST /products/import - import products
    payload: {file: file.csv}
GET /products - list products
GET /products/{id} - get a product
PUT /products/{id} - delete a product
DELETE /products/{id} - delete a product


## Pricelists
POST /pricelists - create a pricelist
    payload: {name: string, pricelist: [price_list_items]}
POST /pricelists/import - import pricelists
    payload: {file: file.csv}
GET /pricelists - list pricelists
GET /pricelists/{id} - get a pricelists
PUT /pricelists/{id} - delete a pricelists
DELETE /pricelists/{id} - delete a pricelists


# Tradeoffs
- Postgres because we want users to see consistent price 
- Pricelists that is not attached to a manuafacturer so that we can have different pricelists for different customers. Different manufacturers also have different pricelists and letting the platform handles different pricelists for different customers might be inefficient


# How it works
This app is intented to be used by retailers and they can use the app to create orders for their customers. The app will allow them to create orders, share orders with customers, and calculate total price and transport fare for the order. The app will also allow them to manage their products and pricelists. The app will also allow customers to view orders shared with them and place orders.

## How to calculate order price and transport fare
order_total_amount = sum of all order_items total_price
order_total_weight = sum of all order_items total_weight

## Dynamic Pricing support
There will be a default pricelists for all the retailers but Retailers can also add different pricelists and apply this pricelists based on the customer. This is done by fetching this pricelists and apply them at the point of creating orders and order items.


```