import React from "react";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router";
import AdminPanel from "./pages/AdminPanel";
import CreateProductForm from "./pages/CreateProductForm";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AllProducts from "./pages/AllProducts";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowed={["owner", "user"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shop"
        element={
          <ProtectedRoute allowed={["owner", "user"]}>
            <Shop />
          </ProtectedRoute>
        }
      />
      <Route path="/product/:id" element={<Product></Product>} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowed={["user"]}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowed={["user"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      {/* Admin Raoutes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowed={["owner"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      >
        {/* Admin/Create Product Route */}
        <Route
          path="createproduct"
          element={
            <ProtectedRoute allowed={["owner"]}>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
        {/* Admin/Dashboard Route */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowed={["owner"]}>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
        {/* Admin/all products Route */}
        <Route
          path="allproducts"
          element={
            <ProtectedRoute allowed={["owner"]}>
              <AllProducts />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="orders"
          element={
            <ProtectedRoute allowed={["owner"]}>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="users"
          element={
            <ProtectedRoute allowed={["owner"]}>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
      </Route>
      <Route path="*" element={<Error />} allowed={["owner", "user"]} />
    </Routes>
  );
};

export default App;
