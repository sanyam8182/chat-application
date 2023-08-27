import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; // Import from 'react-router' package
import { Routes } from "react-router-dom";
import Register from "./components/auth/Register.js";
import Login from "./components/auth/Login.js";
import { Dashboard } from "./components/dashboard/Dashboard.js";
import ChatRoom from "./components/ChatRoom.js";

const App = () => {
  return (
    <div className=" h-screen ">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat/:roomId" element={<ChatRoom />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
