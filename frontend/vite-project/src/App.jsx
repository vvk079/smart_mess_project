import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
// Actually I didn't install framer-motion, I used custom CSS.
// So I don't need AnimatePresence unless I want page transitions. The user asked for "Smooth page transitions".
// Since I am using valid CSS Lightswind, page transitions are handled by the components mounting with animation classes.
// But to have exit animations I'd need something like framer-motion.
// However, the constraint was "NO Tailwind, NO external UI libs". It didn't strictly say no animation libs, but I should stick to my CSS implementation.
// The CSS method I used (lw-fade-in on mount) works for entry. Exit animations are harder without a library.
// I will stick to entry animations which fits "Fade-in / slide-up animations" requirement.

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import AdminDashboard from './pages/AdminDashboard';
import Payment from './pages/Payment';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/demo" element={<Dashboard />} />
      <Route path="/demo/menu" element={<Menu />} />
      <Route path="/demo/attendance" element={<Attendance />} />
      <Route path="/demo/profile" element={<Profile />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
