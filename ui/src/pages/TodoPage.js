import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TodoPage.scss';

const API_URL = 'http://localhost:8000/api/todos';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState(''); 

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await axios.post(API_URL, { title });
    setTodos([...todos, res.data]);
    setTitle('');
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  const handleToggle = async (todo) => {
    const updated = await axios.put(`${API_URL}/${todo._id}`, {
      ...todo,
      completed: !todo.completed,
    });
    setTodos(todos.map((t) => (t._id === todo._id ? updated.data : t)));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-page">
      <h1>My Todo List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p className="empty">No todos yet. Add something!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo._id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => handleToggle(todo)}>{todo.title}</span>
              <button onClick={() => handleDelete(todo._id)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoPage;
