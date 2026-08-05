# Scatch

Scatch is a luxury bag e-commerce application built with a MERN-style stack.
It contains a React + Vite frontend and an Express + MongoDB backend with role-based authentication, product management, cart handling, profile management, Google sign-in, and image uploads.

## Project Summary

Scatch is designed around two user roles:

- User: can browse products, add items to cart, manage profile details, and change password.
- Owner: can access the admin panel, create products, view all products, and delete products.

The backend uses JWT cookies for session auth. Product and profile images are stored in MongoDB as binary Buffers and are sent to the frontend as base64 image URLs.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- React Context
- Tailwind CSS 4
- react-hot-toast
- Google OAuth client

### Backend

- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- multer
- cookie-parser
- cors
- google-auth-library

## Main Features

### User Features

- Login and sign up with email and password
- Google login
- Browse featured products on the dashboard
- Search and filter products in the shop
- View cart contents and totals
- Add and remove products from cart
- Edit profile information
- Upload or replace profile picture
- Change password

### Owner Features

- Owner login
- Access protected admin routes
- Create new products with images and color metadata
- View all products in a table
- Delete products
- Automatically remove deleted products from all user carts

## Repository Structure

```text
Scatch/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   ├── public/
│   │   └── UPLOADS/
│   └── package.json
├── server/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── package.json
└── README.md
```

## How The App Works

### Authentication

The app uses cookie-based JWT authentication.

1. The frontend calls the backend login or signup endpoints.
2. The backend creates a JWT with the user id, email, and role.
3. The token is stored in an HTTP-only cookie named `token`.
4. On app startup, the frontend calls `GET /users/verify` to restore the session.
5. Protected routes use the verified role to allow or deny access.

### Role Protection

- `ProtectedRoute` blocks unauthenticated users.
- It also checks the current `userType`.
- Users are redirected based on role when they try to access the wrong area.

### Product Images

- Product creation uses multipart form uploads.
- The backend stores uploaded images in MongoDB memory buffers.
- Product responses convert image buffers into base64 image URLs before rendering.
- Profile images are handled the same way.

### Cart Flow

1. A user adds a product to cart.
2. The backend checks whether the product already exists in the cart.
3. If it exists, quantity increases.
4. If not, a new cart item is added.
5. Cart data is fetched again and shown in the UI.

### Admin Product Flow

1. The owner fills the create-product form.
2. Front image and extra images are selected locally.
3. Form data is sent to the server.
4. The server stores the new product in MongoDB.
5. The frontend adds the created product to its cached product list.

## Frontend Pages

### `/`

Login and sign-up page with tabs for switching between forms.

### `/dashboard`

Landing page with a hero slider, featured products, and promotional sections.

### `/shop`

Product catalog with search, price filtering, category filtering, and sort options.

### `/cart`

Cart page that shows selected products, quantities, subtotal, discounts, and final payable amount.

### `/profile`

Account management page for editing profile data, profile picture, and password.

### `/admin`

Owner-only admin shell with sidebar navigation.

### `/admin/createproduct`

Owner-only product creation form.

### `/admin/allproducts`

Owner-only product table with search, sorting, and delete actions.

### `/product/:id`

Product detail page placeholder.

### `*`

404 page for invalid routes.

## Backend API Overview

### Auth and User Routes

- `POST /users/register` - create a user account
- `POST /users/login` - login as user or owner
- `POST /users/google-login` - login with Google token
- `GET /users/logout` - clear auth cookie
- `GET /users/verify` - return the current authenticated user
- `GET /users/addtocart/:id` - add a product to cart
- `GET /users/userwithcart` - fetch user data with populated cart
- `GET /users/deletefromcart/:id` - remove product from cart
- `POST /users/updateuser/:id` - update profile data and avatar
- `POST /users/updatepassword/:id` - update password

### Product Routes

- `POST /products/create` - create product with images
- `GET /products/allproducts` - fetch all products
- `GET /products/:id` - placeholder single product route
- `DELETE /products/delete/:id` - delete product and remove from all carts

### Owner Routes

- `POST /owners/create` - create first owner in development
- `GET /owners/login` - owner login

## Database Models

### User

Stores:

- full name
- email
- hashed password
- contact number
- address
- cart array
- Google ID
- auth provider
- profile picture buffer

### Owner

Stores:

- full name
- email
- hashed password
- products reference field
- profile picture
- GSTIN

### Product

Stores:

- name
- price
- discount price
- background color
- panel color
- text color
- front image buffer
- additional image buffers

## Context and State Management

### AuthContext

- Verifies the current session on app load.
- Exposes `isLoggedIn`, `user`, `userType`, `loading`, `loginSuccess`, and `logoutSuccess`.

### CartContext

- Loads the current user's cart.
- Adds and removes cart items.
- Refreshes cart state after mutations.

### ProductContext

- Loads all products for the current session.
- Shares product data with admin views.
- Tracks loading and error state.

## Important Implementation Notes

- The frontend must send requests with `withCredentials: true` because auth depends on cookies.
- Product and profile images are not stored as filesystem paths; they are stored in MongoDB as Buffers.
- The frontend converts returned image data into viewable image URLs.
- The admin product creation form uses multipart form data.
- Product deletion also updates all user carts to remove deleted items.

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB running locally or a reachable MongoDB URL

### Environment Variables

Create a `.env` file in the `server/` folder with at least:

```env
JWT_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
NODE_ENV=development
```

The database connection is read from `server/config/development.json`, which currently points to:

```json
{
	"MONGODB_URL": "mongodb://localhost:27017"
}
```

### Install Dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

### Run The App

Start the backend:

```bash
cd server
node app.js
```

Or use nodemon if you want live reload.

Start the frontend:

```bash
cd client
npm run dev
```

Then open the frontend URL shown by Vite, usually:

```text
http://localhost:5173
```

## Default Development Flow

1. Start MongoDB.
2. Start the Express backend on port `5000`.
3. Start the React frontend on port `5173`.
4. Create the first owner if needed using the development owner route.
5. Log in as user or owner.
6. Browse products, manage cart, or use the admin panel.

## Known Gaps

- `Product.jsx` is only a stub right now.
- `admin/orders` and `admin/users` are routed in the UI but still point to placeholder content.
- Checkout flow is not implemented yet.
- The single-product backend route exists but does not yet return a complete API response.

## Notes For Future Development

- Keep auth cookie handling consistent across all Axios requests.
- Keep uploaded image handling aligned between frontend form data and backend multer config.
- Use role checks on any new sensitive route.
- If you add checkout/orders later, it should likely connect to the existing cart structure instead of replacing it.

## Quick Project Summary

Scatch is a luxury e-commerce app where authenticated users browse products and manage carts, while owners manage products through a protected admin dashboard. The project uses JWT cookies, MongoDB-backed image storage, and React context to keep auth, cart, and product state synchronized.
