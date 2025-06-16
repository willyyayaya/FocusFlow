import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="App-header">
      <h1>FocusFlow</h1>
      <p>專注、規劃、成就目標的最佳工具</p>
      <div style={{ margin: '24px 0' }}>
        <Link className="App-link" to="/login" style={{ margin: '0 12px' }}>登入</Link>
        <Link className="App-link" to="/register" style={{ margin: '0 12px' }}>註冊</Link>
        <Link className="App-link" to="/tasks" style={{ margin: '0 12px' }}>任務月曆</Link>
        <Link className="App-link" to="/store" style={{ margin: '0 12px' }}>點數商店</Link>
        <Link className="App-link" to="/quests" style={{ margin: '0 12px' }}>任務挑戰</Link>
      </div>
      <p style={{ fontSize: '16px', color: '#bbb', maxWidth: 400 }}>
        FocusFlow 結合任務管理、點數經濟與金流兌換，幫助你高效規劃、持續專注，並用成就兌換實質回饋！
      </p>
    </div>
  );
}

export default Home; 