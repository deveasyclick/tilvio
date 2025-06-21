Tiller

An app for creating order and calculating total price and transport fare for products (Tiles)

# Requirements

    Functional                                |           Non Functional

1. Authentication                             | Consistent price
2. List, create, delete, share orders         | Low latency
3. Calculate total price and transport fare   | Support creating orders for
                                              both retailers and customers
4. List, create, delete, import products      | Attach price to an order
5. List, create, delete, import pricelists    | Calculate transport fare based on order
                                              (retailer)
6. Cart                                       | Pricing should be dynamic

# Tools

Authentication: Clerk
Database: Postgres
Blob storage: S3
Language: Golang
Caching: Redis

# Models

Manufactures{                                                   Product {
 id: string                                                         id: string
 name: [Goodwill, Golden crown, Royal castle, Vironyl]              manufacturer_id: string
 location: string                                                   code: string
 createdAt: string                                                  description: string
 updatedAt: string                                                  dimension: [25by40, etc]
 logo_url: string                                                   image_url: string
                                                                    weight: string
}                                                                 }
index: name                                                       index: code

Price_lists {                                          price_list_items{
    id: string                                           id: string
    name: string                                         price:string
    status: active | inactive                            dimension: string
    createdAt: string                                    price_list_id: string
    updatedAt: string                                   }
}
index: status

order {                                         order_items {
    id: string                                     order_id: string
    retailer: string                               unit_price: string
    status: draft | shared | ordered               total_price: number (calculated)
    total_amount: number                           createdAt: string
    total_weight: number                           product_id: string
    transportFare: number                          quantity: number
    createdAt: string                              total_weight: number (calculated)
    updatedAt: string                              weight: string
}                                                 }

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

Next steps

- Metrics
- Recommended orders

# How orders will work

Option 1:

- Distributor receives tiles code and quantity from the customer
- Distributor creates an order with the tiles code and quantity
- Distributor applies discount to the total price
- Distributor shares receipt with the customer

Option 2:

- Distributor select a pricelist and discount, create a link and share with the customer (Optionally the link get expired after a certain time)
- The customer selects the tiles code and quantity and the total price is calculated
- The customer click on create order and the order is created
- The distributor is notified of the order
- The generated link will be used to track the order by the customer

Decision: Give both options to distributor
