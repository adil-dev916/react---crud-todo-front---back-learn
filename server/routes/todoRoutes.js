const express = require('express');
const { getTodo, addTodo, todoDelete, todoUpdate, todoComplete } = require('../controllers/todoController.js');

const router = express.Router();

router.get('/', getTodo)
router.post('/', addTodo)
router.delete('/:id', todoDelete)
router.put('/:id', todoUpdate)
router.patch('/:id', todoComplete)

module.exports = router;