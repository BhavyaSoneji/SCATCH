import React from "react";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router";
import AdminPanel from "./pages/AdminPanel";
import CreateProductForm from "./pages/CreateProductForm";
import ShowAllProducts from "./pages/ShowAllProducts";
import Demo from "./pages/Demo";
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} >
          <Route path='createproduct' element={<CreateProductForm />}></Route>
          <Route path='showallproucts' element={<ShowAllProducts />}></Route>
          <Route path='demo' element={<Demo />}></Route>
        </Route>
      </Routes>
  );
};

export default App;
