const Todo = require('../models/Todo');

// @desc Get all todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort('-createdAt');
  res.json(todos);
};

// @desc Create new todo
exports.createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });
  const newTodo = await Todo.create({ title });
  res.status(201).json(newTodo);
};

// @desc Update a todo
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @desc Delete a todo
exports.deleteTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);
  
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
  
    await Todo.findByIdAndDelete(req.params.id);
  
    res.json({ message: 'Todo deleted' });
  };
  
