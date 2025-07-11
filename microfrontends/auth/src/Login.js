import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/tasks'); // 登入成功後導向任務頁
    } catch (err) {
      setError(err.response?.data?.message || '登入失敗');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>登入</h2>
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
          <button type="submit">登入</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="auth-link">還沒有帳號？<Link to="/register">註冊</Link></p>
      </div>
    </div>
  );
}

export default Login; 