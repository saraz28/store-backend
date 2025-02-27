# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

- `GET /users` - Get a list of all users.
- `GET /users/{id}` - Get details of a specific user.
- `POST /users` - Create a new user.
- `GET /users/{id}` - Add a new order for a spaceific user.
- `POST /users/{id}` - to autenticate.
- `DELETE /users/{id}` - Delete a user.

#### Products

- `GET /products` - Get a list of all products.
- `GET /products/{id}` - Get details of a specific products.
- `POST /products` - Create a new products.
- `DELETE /products/{id}` - Delete a products.

#### Orders

- `GET /orders` - Get a list of all orders.
- `GET /orders/{id}` - Get details of a specific orders.
- `POST /orders` - Create a new orders.
- `POST /orders` - Create an each order for products.
- `DELETE /orders/{id}` - Delete a orders.

#### Products

- Index
- Show (args: product id)
- Create (args: Product)[token required]

#### Users

- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders

- Current Order by user (args: user id)[token required]

## Data Shapes

![ER Diagram](assets/ER.png)

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
