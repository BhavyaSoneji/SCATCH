# Scatch Project Overview

## What This Project Is

Scatch is a MERN-style luxury bag e-commerce application.
It has two major parts:

- A React + Vite frontend for users and the owner/admin panel.
- An Express + MongoDB backend that handles authentication, products, cart state, profile updates, and image uploads.

The UI is centered around a luxury shopping experience. The app supports two roles:

- `user`: normal shopper who can browse products, add items to cart, edit profile, and update password.
- `owner`: admin/merchant who can create products, view all products, and manage the store.

## High-Level Architecture

### Frontend

- Built with React 19 and Vite.
- Uses React Router for page routing.
- Uses Axios for API calls.
- Uses React Context for global auth, cart, and product state.
- Uses `react-hot-toast` for notifications.
- Uses Google login through `@react-oauth/google`.

### Backend

- Built with Express.
- Connects to MongoDB through Mongoose.
- Uses JWT stored in an HTTP-only cookie for session auth.
- Uses bcrypt for password hashing.
- Uses multer memory storage for image uploads.
- Uses Google token verification for Google sign-in.

### Local Runtime

- Frontend runs on `http://localhost:5173`.
- Backend runs on `http://localhost:5000`.
- CORS is configured to allow the frontend origin with credentials.
- Backend serves static files from `server/public`.

## How Authentication Works

Authentication is cookie-based.

1. When a user logs in or signs up, the server creates a JWT using `generateToken`.
2. The token is stored in an HTTP-only cookie named `token`.
3. The frontend checks login status on startup by calling `GET /users/verify` with `withCredentials: true`.
4. The backend `auth` middleware reads and verifies the cookie.
5. The decoded token attaches `req.user`, `req.id`, and `req.userType` to the request.
6. The `authorize` middleware enforces role-based access for owner/user routes.

### Login Methods

- Email/password login for both users and owners.
- Google login for users.
- User signup creates a local user account with a hashed password.

## Data Models

### User Model

The user schema stores:

- `fullName`
- `email`
- `password`
- `contact`
- `address`
- `cart` as an array of `{ product, qty }`
- `googleId`
- `AuthProvider`
- `profilePic` as a Buffer

Important behavior:

- Cart items reference product ObjectIds.
- User profile pictures are stored as binary data in MongoDB.
- Google users may not have a password.

### Owner Model

The owner schema stores:

- `fullName`
- `email`
- `password`
- `products`
- `profilePic`
- `gstin`

Only one owner is meant to be created in development.

### Product Model

The product schema stores:

- `name`
- `price`
- `discountPrice`
- `bgColor`
- `panelColor`
- `textColor`
- `frontImage` as a Buffer
- `otherImages` as an array of Buffers

Images are saved in MongoDB, then sent back to the frontend as base64 data URLs.

## Backend Route Map

### App Entry

- `server/app.js` wires middleware, connects the database, mounts routers, and starts the server on port `5000`.

### Owners

- `GET /owners/login` logs an owner in.
- `POST /owners/create` creates the first owner only when `NODE_ENV=development`.

### Users

- `GET /users/` health-style message.
- `POST /users/register` creates a user account.
- `POST /users/login` logs in either a user or an owner.
- `POST /users/google-login` verifies a Google token and creates a user if needed.
- `GET /users/logout` clears the auth cookie.
- `GET /users/verify` returns the authenticated user and role.
- `GET /users/addtocart/:id` adds a product to the current user's cart.
- `GET /users/userwithcart` returns the authenticated user with populated cart data.
- `GET /users/deletefromcart/:id` removes a product from the cart.
- `POST /users/updateuser/:id` updates profile data and optionally a profile image.
- `POST /users/updatepassword/:id` updates the password.

### Products

- `GET /products/` health-style message.
- `POST /products/create` creates a product with multipart image upload.
- `GET /products/allproducts` returns all products.
- `GET /products/:id` is present but not fully implemented.
- `DELETE /products/delete/:id` deletes a product and removes it from all user carts.

## Request Flow By Feature

### Login / Session Boot

On frontend startup, `AuthContext` calls `GET /users/verify`.
If the cookie is valid, the app stores:

- `isLoggedIn = true`
- `user`
- `userType`

This allows guarded routes to decide whether to render or redirect.

### Role Guarding

`ProtectedRoute` checks:

- `loading`: show loading state while auth verification is in progress.
- `isLoggedIn`: redirect to `/` if not authenticated.
- `allowed`: redirect users away from routes they cannot access.

Role intent:

- `user` sees shop, cart, profile, and general browsing.
- `owner` sees admin pages and product management.

### Product Browsing

The frontend loads products from `GET /products/allproducts`.
That data is stored in the product context and used by:

- Dashboard
- Shop
- All Products in admin

The backend converts image Buffers into base64 strings before returning them to the client.

### Cart Flow

1. `addToCart` calls `GET /users/addtocart/:id`.
2. The backend either increments quantity or inserts a new cart entry.
3. `CartContext` refreshes the cart using `GET /users/userwithcart`.
4. The cart page filters/searches the returned cart items and calculates totals.
5. Product deletion on the backend also removes matching items from every user's cart.

### Profile Flow

The profile page:

- fetches the authenticated user through `GET /users/userwithcart`
- allows editing name, contact, address, and profile image
- uploads the avatar via `multipart/form-data`
- can update passwords

The backend keeps profile images as Buffers and returns them as displayable image data.

### Admin Product Creation Flow

`CreateProductForm` builds a `FormData` request with:

- one required front image
- zero or more additional images
- product metadata like name, price, discount, and colors

The backend uses multer memory storage, so files arrive in memory buffers and are persisted to MongoDB.

## Frontend Route Map

### Public / Entry

- `/` renders the login/sign-up page.

### Shared Authenticated Pages

- `/dashboard` renders the main landing/dashboard experience.
- `/shop` renders the searchable product catalog.
- `/product/:id` is currently a placeholder page.

### User-Only Pages

- `/cart` shows cart contents and totals.
- `/profile` shows account details and edit controls.

### Owner-Only Pages

- `/admin` renders the admin shell with sidebar navigation.
- `/admin/createproduct` creates a product.
- `/admin/allproducts` lists all products.
- `/admin/orders` is wired in the UI but currently points to a placeholder.
- `/admin/users` is wired in the UI but currently points to a placeholder.

### Fallback

- `*` renders the 404 error page.

## Frontend State Management

### AuthContext

Responsibility:

- verify auth on app load
- expose `isLoggedIn`, `user`, `userType`, and `loading`
- expose `loginSuccess` and `logoutSuccess`

### CartContext

Responsibility:

- load the current user's cart
- add/remove items from cart
- keep cart state in sync after mutations

### ProductContext

Responsibility:

- load all products for logged-in users
- keep the admin product list in sync after create/delete actions
- expose loading and error state for the admin product table

## UI Pages And Their Roles

- `Login.jsx`: login/sign-up toggle, Google sign-in, redirects based on role.
- `Dashboard.jsx`: marketing-style landing page with hero slider and featured products.
- `Shop.jsx`: searchable, filterable, sortable product listing.
- `Cart.jsx`: cart search, totals, and checkout summary.
- `Profile.jsx`: edit profile details and password.
- `AdminPanel.jsx`: admin shell with sidebar and outlet layout.
- `CreateProductForm.jsx`: product creation form with image previews.
- `AllProducts.jsx`: admin product table with search, sort, and delete.
- `Product.jsx`: currently a stub.
- `Error.jsx`: 404 page.

## Important Implementation Details

- Product and profile images are stored in MongoDB as Buffers, not as filesystem paths.
- The frontend expects image data in base64 URL form when rendering.
- Auth depends on cookies, so Axios requests must use `withCredentials: true`.
- The backend is permissive about some placeholder routes, but not all pages are fully implemented.
- The admin panel is largely presentational around the product management flow.

## Known Gaps And Incomplete Areas

These are useful for any AI agent working in this repo:

- `Product.jsx` is basically empty.
- `/admin/orders` and `/admin/users` are routed in the UI but point to placeholder content.
- The cart checkout button is only UI; no order/checkout API is wired yet.
- The product detail endpoint exists but does not currently return a complete response.
- Some route strings and component navigation targets are inconsistent in casing, so path matching should be checked carefully before changing navigation.

## Mental Model For An AI Agent

If you need to modify this project, think in this order:

1. Determine whether the change belongs to auth, products, cart, profile, or admin UI.
2. Check the backend route and controller first if the change affects data or persistence.
3. Check the matching React context next if the change affects shared frontend state.
4. Check the page component last if the change is mainly visual or interaction-driven.
5. Keep cookie auth, role checks, and multipart uploads in mind whenever data moves between client and server.

## Suggested Summary You Can Give To Another AI

Scatch is a role-based luxury bag e-commerce app built with React/Vite on the frontend and Express/MongoDB on the backend. Users authenticate with JWT cookies, browse products, manage carts, and edit profiles. Owners can create and delete products through an admin dashboard. Product and profile images are stored in MongoDB as Buffers and converted to base64 for rendering. The frontend relies on AuthContext, CartContext, and ProductContext to synchronize session, cart, and catalog state.