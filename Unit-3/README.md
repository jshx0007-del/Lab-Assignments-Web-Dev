| Method | URL | Description |
|--------|-----|-------------|
| POST   | /api/products | Create product |

![create product](screenshots\image-2.png)

| GET    | /api/products | List (filter, sort, paginate) |

![Get product](screenshots\image.png)

| GET    | /api/products/:id | Get one product (id = 1, 2, 3...) |

![Get product by id](screenshots\image-1.png)

| PUT    | /api/products/:id | Update product details |

![Update](screenshots\image-3.png)

| PATCH  | /api/products/:id/stock | Restock / sale, body `{"change": 10}` |

![Patch](screenshots\image-4.png)

| DELETE | /api/products/:id | Delete product |

![Delete](screenshots\image-5.png)

| GET    | /api/products/low-stock | Items where quantity <= reorderLevel |

![Get low stock item](screenshots\image-7.png)

| GET    | /api/products/summary | Category-wise aggregation |

![Get Summary](screenshots\image-6.png)