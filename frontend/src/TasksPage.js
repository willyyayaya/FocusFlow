import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', description: '', id: null });
  const [error, setError] = useState('');
  const calendarRef = useRef();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('無法取得任務，請重新登入');
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  // FullCalendar 事件格式
  const events = tasks.map(task => ({
    id: String(task.id),
    title: task.title,
    start: task.date,
    description: task.description
  }));

  // 點擊日期新增任務
  const handleDateClick = (arg) => {
    setFormData({ title: '', date: arg.dateStr, description: '', id: null });
    setShowForm(true);
  };

  // 點擊事件編輯任務
  const handleEventClick = (arg) => {
    const task = tasks.find(t => String(t.id) === arg.event.id);
    if (task) {
      setFormData({ title: task.title, date: task.date, description: task.description || '', id: task.id });
      setShowForm(true);
    }
  };

  // 表單送出（新增或更新）
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/tasks/${formData.id}`, formData);
      } else {
        await api.post('/tasks', formData);
      }
      setShowForm(false);
      setFormData({ title: '', date: '', description: '', id: null });
      fetchTasks();
    } catch {
      setError('儲存失敗');
    }
  };

  // 刪除任務
  const handleDelete = async () => {
    if (!formData.id) return;
    try {
      await api.delete(`/tasks/${formData.id}`);
      setShowForm(false);
      setFormData({ title: '', date: '', description: '', id: null });
      fetchTasks();
    } catch {
      setError('刪除失敗');
    }
  };

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="tasks-page">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>任務月曆</h2>
        <button onClick={handleLogout}>登出</button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        locale="zh-tw"
      />
      {showForm && (
        <div className="task-form-modal" style={{background:'#fff',padding:20,border:'1px solid #ccc',marginTop:20}}>
          <h3>{formData.id ? '編輯任務' : '新增任務'}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="任務標題"
              value={formData.title}
              onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
              required
            />
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData(f => ({ ...f, date: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="描述（可選）"
              value={formData.description}
              onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
            />
            <button type="submit">{formData.id ? '更新' : '新增'}</button>
            {formData.id && <button type="button" onClick={handleDelete}>刪除</button>}
            <button type="button" onClick={() => setShowForm(false)}>取消</button>
          </form>
        </div>
      )}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

export default TasksPage; 