import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
