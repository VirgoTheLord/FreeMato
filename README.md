# FreeMato

FreeMato is a full-stack food ordering web application. It allows users to browse a range of food items (salads, rolls, desserts, sandwiches, cakes, pasta, noodles, and more), add them to a cart, and place orders. The project features both a customer-facing frontend and an admin panel for order management.

## 🚀 Live Demo

**Try it here:** [https://freemato.vercel.app/](https://freemato.vercel.app/)

## Features

- **User Features:**
  - Browse a menu of food items by category
  - Search and filter food items
  - Add/remove items to/from cart
  - User authentication and token-based session management
  - Place and track orders
  - View order history

- **Admin Features:**
  - View and manage all orders
  - Update order statuses (e.g., pending, completed)
  - Manage food inventory (extend as needed)

## Tech Stack

- **Frontend:** React, Vite, Context API, Axios
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Token-based (JWT)
- **Styling:** CSS Modules / Custom CSS
- **Other:** CORS, ESLint, RESTful API

## Project Structure

```
FreeMato/
├── admin/         # Admin panel (React + Vite)
├── backend/       # Express server, API routes, controllers, models
├── frontend/      # Main customer-facing app (React + Vite)
└── uploads/       # Uploaded images for food items
```

- `backend/` handles API endpoints for food, users, cart, and orders.
- `frontend/` and `admin/` are separate React apps for users and admins.

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- MongoDB database

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/VirgoTheLord/FreeMato.git
   cd FreeMato
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Install admin panel dependencies:**

   ```bash
   cd ../admin
   npm install
   ```

5. **Set up environment variables:**

   - Create a `.env` file in `backend/` and add your MongoDB URI and any other secrets.

6. **Run the backend server:**

   ```bash
   cd backend
   npm run server
   # Server runs on http://localhost:4000
   ```

7. **Run the frontend and admin apps (in separate terminals):**

   ```bash
   cd frontend
   npm run dev
   # App runs on http://localhost:5173 (default)
   ```

   ```bash
   cd admin
   npm run dev
   # Admin panel on another port (default: 5174)
   ```

## API Endpoints (Backend)

- `GET /api/food/list` - List all food items
- `POST /api/user/login` - User login
- `POST /api/user/register` - User registration
- `POST /api/cart/get` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/order/place` - Place an order
- `POST /api/order/verify` - Verify order/payment
- `POST /api/order/user-orders` - Get orders for a user
- `GET /api/order/list` - List all orders (admin)

## Customization

- To add or modify food items, update the assets and data files in `frontend/src/assets/frontend_assets/`.
- Modify backend routes and controllers for custom business logic.

## Contributing

Contributions and suggestions are welcome! Please open an issue or pull request.

## License

[MIT](LICENSE)

---

**Created by [VirgoTheLord](https://github.com/VirgoTheLord)**
