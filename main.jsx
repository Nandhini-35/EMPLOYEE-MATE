import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import ChecklistPage from "./pages/ChecklistPage";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<App />} />
      <Route path="/checklist" element={<ChecklistPage />} />
    </Routes>
  </BrowserRouter>
);
