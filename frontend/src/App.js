import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import TasksPage from './TasksPage';
import PointsStore from './PointsStore';
import QuestsPage from './QuestsPage';
import PaymentResult from './PaymentResult';
import Home from './Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/store" element={<PointsStore />} />
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/payment/success" element={<PaymentResult />} />
        <Route path="/payment/error" element={<PaymentResult />} />
        <Route path="/payment/cancel" element={<PaymentResult />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
