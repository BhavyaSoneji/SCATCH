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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      >
        <Route
          path="createproduct"
          element={
            <ProtectedRoute>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="allproducts"
          element={
            <ProtectedRoute>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="users"
          element={
            <ProtectedRoute>
              <CreateProductForm />
            </ProtectedRoute>
          }
        ></Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
