# Inventory and Data Management System

## API Endpoints

### POST /api/products – Create product
![Create product](screenshots/image-2.png)

### GET /api/products – List (filter, sort, paginate)
![Get products](screenshots/image.png)

### GET /api/products/:id – Get one product
![Get product by id](screenshots/image-1.png)

### PUT /api/products/:id – Update product details
![Update](screenshots/image-3.png)

### PATCH /api/products/:id/stock – Restock / sale
Body: `{"change": 10}`

![Patch stock](screenshots/image-4.png)

### DELETE /api/products/:id – Delete product
![Delete](screenshots/image-5.png)

### GET /api/products/low-stock – Items where quantity <= reorderLevel
![Low stock](screenshots/image-7.png)

### GET /api/products/summary – Category-wise aggregation
![Summary](screenshots/image-6.png)