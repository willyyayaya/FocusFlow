import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

// 動態導入微前端組件
const Login = React.lazy(() => import('auth/Login'));
const Register = React.lazy(() => import('auth/Register'));
const TasksPage = React.lazy(() => import('tasks/TasksPage'));
const QuestsPage = React.lazy(() => import('quests/QuestsPage'));
const PointsStore = React.lazy(() => import('store/PointsStore'));
const PaymentResult = React.lazy(() => import('payment/PaymentResult'));

function App() {
  return (
    <Router>
      <div className="app">
        <ErrorBoundary>
          <Suspense fallback={<div className="loading">載入中...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/store" element={<PointsStore />} />
              <Route path="/quests" element={<QuestsPage />} />
              <Route path="/payment/success" element={<PaymentResult />} />
              <Route path="/payment/error" element={<PaymentResult />} />
              <Route path="/payment/cancel" element={<PaymentResult />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App; 