import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TodoPage.scss';

const API_URL = 'http://localhost:8000/api/todos';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await axios.post(API_URL, { title, dueDate });
    setTodos([...todos, res.data]);
    setTitle('');
    setDueDate('');
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

  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  };

  const handleEditSave = async (todo) => {
    const updated = await axios.put(`${API_URL}/${todo._id}`, {
      ...todo,
      title: editingTitle,
    });
    setTodos(todos.map((t) => (t._id === todo._id ? updated.data : t)));
    setEditingId(null);
    setEditingTitle('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="todo-page">
      <h1>My Todo List</h1>

      {/* Add Section to add new todo*/}
      <form onSubmit={handleSubmit} className="add-section">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {/* Filter Section */}
      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty">No todos found.</p>
        ) : (
          filteredTodos.map((todo) => (
            <li key={todo._id} className={todo.completed ? 'completed' : ''}>
              {editingId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => handleEditSave(todo)}>✅</button>
                  <button onClick={handleEditCancel}>❌</button>
                </>
              ) : (
                <>
                  <div className="todo-content" onClick={() => handleToggle(todo)}>
                    <span>{todo.title}</span>
                    <small className="meta">
                      Created: {new Date(todo.createdAt).toLocaleDateString()}
                      {todo.dueDate && <> | Due: {new Date(todo.dueDate).toLocaleDateString()}</>}
                    </small>
                    <small className={`status ${todo.completed ? 'done' : 'pending'}`}>
                      {todo.completed ? 'Completed' : 'Active'}
                    </small>
                  </div>
                  <div className="actions">
                    <button onClick={() => handleEditClick(todo)}>✏️</button>
                    <button onClick={() => handleDelete(todo._id)}>❌</button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoPage;
