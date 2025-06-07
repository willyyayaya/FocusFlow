const { Task } = require('../models');

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
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.date = date ?? task.date;
    task.completed = completed ?? task.completed;
    await task.save();
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