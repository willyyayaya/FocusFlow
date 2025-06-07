import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="register-container">
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
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
      <p>已經有帳號？<Link to="/login">登入</Link></p>
    </div>
  );
}

export default Register; 