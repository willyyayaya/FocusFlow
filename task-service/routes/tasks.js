const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// 取得所有任務
router.get('/', auth, taskController.getTasks);

// 新增任務
router.post('/', auth, taskController.createTask);

// 更新任務
router.put('/:id', auth, taskController.updateTask);

// 刪除任務
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router; 