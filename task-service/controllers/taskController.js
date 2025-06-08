const { Task } = require('../models');
const axios = require('axios');

exports.getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await Task.findAll({ where: { userId } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Fetch tasks failed', error: err.message });
  }
};

exports.createTask = async (req, res) => {
  const userId = req.user.id;
  const { title, description, date } = req.body;
  try {
    const task = await Task.create({ title, description, date, userId });
    
    // 觸發每日任務進度更新 - 創建任務
    try {
      await axios.post(`http://localhost:5001/api/quests/progress`, {
        questType: 'create_task',
        increment: 1
      }, {
        headers: { 'Authorization': req.headers.authorization }
      });
    } catch (questError) {
      console.error('Failed to update quest progress:', questError.message);
    }
    
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Create task failed', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, description, date, completed } = req.body;
  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // 檢查任務是否從未完成變為完成
    const wasNotCompleted = !task.completed;
    const isNowCompleted = completed === true;
    
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.date = date ?? task.date;
    task.completed = completed ?? task.completed;
    await task.save();
    
    // 如果任務剛被完成，自動加點並更新每日任務進度
    if (wasNotCompleted && isNowCompleted) {
      try {
        await axios.post(`http://localhost:5001/api/auth/users/${userId}/points/add`, {
          points: 10 // 完成任務獲得 10 點
        });
        console.log(`User ${userId} completed task and earned 10 points`);
        
        // 觸發每日任務進度更新 - 完成任務
        await axios.post(`http://localhost:5001/api/quests/progress`, {
          questType: 'complete_task',
          increment: 1
        }, {
          headers: { 'Authorization': req.headers.authorization }
        });
        
        // 檢查成就進度 - 任務完成數
        await axios.post(`http://localhost:5001/api/achievements/check`, {
          achievementType: 'task_master',
          currentValue: await Task.count({ where: { userId, completed: true } })
        }, {
          headers: { 'Authorization': req.headers.authorization }
        });
        
      } catch (pointsError) {
        console.error('Failed to add points or update progress:', pointsError.message);
        // 不影響任務更新，只記錄錯誤
      }
    }
    
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Update task failed', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete task failed', error: err.message });
  }
}; 