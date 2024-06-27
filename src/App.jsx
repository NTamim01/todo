import './App.css';

import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isEditing, setIsEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title.');
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTitle('');
    setDescription('');
    setPriority('Medium');
  };

  const handleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditTitle(tasks[index].title);
    setEditDescription(tasks[index].description);
    setEditPriority(tasks[index].priority);
  };

  const handleSave = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          title: editTitle,
          description: editDescription,
          priority: editPriority,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsEditing(null);
    setEditTitle('');
    setEditDescription('');
    setEditPriority('Medium');
  };

  return (
    <div className={`container ${tasks.length > 0 ? 'has-tasks' : ''}`}>
      <div className="input-container">
        <h1 className="title">Task Manager</h1>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Enter task title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input fixed-textarea"
            placeholder="Enter task description"
          ></textarea>
          <div className="priority">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button type="submit" className="add-task-button">
            Add Task
          </button>
        </form>
      </div>
      {tasks.length > 0 && (
        <div className="task-list-container">
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                {isEditing === index ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="input"
                      placeholder="Enter task title"
                      required
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="input fixed-textarea"
                      placeholder="Enter task description"
                    ></textarea>
                    <div className="priority">
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="input"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div className="task-actions">
                      <button
                        onClick={() => handleSave(index)}
                        className="save-button"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(null)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.description}</p>
                    <p className={`task-priority ${task.priority}`}>
                      Priority: {task.priority}
                    </p>
                    <div className="task-actions">
                      <button
                        onClick={() => handleComplete(index)}
                        className="complete-button"
                      >
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button
                        onClick={() => handleEdit(index)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
