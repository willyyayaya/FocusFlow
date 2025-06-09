import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5001/api/auth/register', { username, password });
      setSuccess('註冊成功，請登入');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || '註冊失敗');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>註冊</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="帳號"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">註冊</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <p className="auth-link">已經有帳號？<Link to="/login">登入</Link></p>
      </div>
    </div>
  );
}

export default Register; 