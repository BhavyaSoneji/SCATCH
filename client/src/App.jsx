import React from "react";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router";
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
};

export default App;
