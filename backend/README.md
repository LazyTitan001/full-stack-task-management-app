# Full-Stack Task Management App - Backend

## Project Description
This is the backend for a full-stack task management application. It provides RESTful API endpoints for user authentication, menu management, and order processing. The backend is built with Node.js, Express, and MongoDB.

## Features
- User registration and login
- Admin login
- CRUD operations for menu items (admin only)
- Order creation and management
- JWT-based authentication and authorization

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository
   ```sh
   git clone https://github.com/your-repo/full-stack-task-management-app.git
   ```
2. Navigate to the backend directory
   ```sh
   cd full-stack-task-management-app/backend
   ```
3. Install dependencies
   ```sh
   npm install
   ```
4. Create a `.env` file in the backend directory and add the following environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_JWT_SECRET=your_admin_jwt_secret
   ADMIN_USERNAME=admin
   ADMIN_INITIAL_PASSWORD=adminpassword
   ```

### Running the Server
```sh
npm start
```
The server will start on `http://localhost:3000`.

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
    "username": "testuser",
    "password": "password123",
    "role": "customer"
}
```

#### User Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "username": "testuser",
    "password": "password123"
}
```

#### Admin Login
```http
POST http://localhost:3000/api/admin/login
Content-Type: application/json

{
    "username": "admin",
    "password": "adminpassword"
}
```

### Menu Endpoints

#### Get All Menu Items
```http
GET http://localhost:3000/api/menu
```

#### Create Menu Item (Admin)
```http
POST http://localhost:3000/api/admin/menu
Authorization: Bearer <admin_token>
Content-Type: application/json

{
    "name": "Burger",
    "description": "Classic beef burger",
    "price": 9.99,
    "category": "Main Course",
    "availability": true
}
```

#### Update Menu Item (Admin)
```http
PUT http://localhost:3000/api/admin/menu/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
    "name": "Deluxe Burger",
    "price": 11.99,
    "availability": true
}
```

#### Delete Menu Item (Admin)
```http
DELETE http://localhost:3000/api/admin/menu/:id
Authorization: Bearer <admin_token>
```

### Order Endpoints

#### Create Order
```http
POST http://localhost:3000/api/orders
Authorization: Bearer <user_token>
Content-Type: application/json

{
    "items": [
        {
            "menuItem": "menu_item_id",
            "quantity": 2
        }
    ]
}
```

#### Get User Orders
```http
GET http://localhost:3000/api/orders/user
Authorization: Bearer <user_token>
```

#### Get All Orders (Admin)
```http
GET http://localhost:3000/api/admin/orders
Authorization: Bearer <admin_token>
```

#### Update Order Status (Admin)
```http
PUT http://localhost:3000/api/admin/orders/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
    "status": "preparing"
}
```

### Response Examples

#### Successful Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Response
```json
{
    "message": "Invalid credentials"
}
```

### Notes
- Replace `:id` with actual MongoDB ObjectId
- Replace `<user_token>` and `<admin_token>` with actual JWT tokens
- Order status options: "pending", "preparing", "ready", "delivered"

