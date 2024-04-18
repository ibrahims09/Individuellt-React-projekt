import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';

const TaskBoard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [column, setColumn] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, targetStatus) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'lightgray'; 
  };

  const handleDragLeave = (e) => {
    e.target.style.backgroundColor = ''; 
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const draggedTaskId = e.dataTransfer.getData('taskId');

    const updatedTasks = tasks.map(task => {
      if (task.id === parseInt(draggedTaskId)) {
        return { ...task, status: targetStatus };
      }
      return task;
    });

    setTasks(updatedTasks);
    e.target.style.backgroundColor = ''; 
  };

  const addTask = (taskName) => {
    const newTask = { id: tasks.length + 1, name: taskName, status: 'Att göra' };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };
   

  const TaskColumns = () => {
    return (
      <div className="task-board">
        <div className="column"
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, 'Att göra')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'Att göra')}
        >
          <h3>Att göra</h3>
          {tasks.filter(task => task.status === 'Att göra').map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={handleDragStart}
              onDelete={deleteTask} 
            />
          ))}
        </div>
        <div className="column"
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, 'Pågående')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'Pågående')}
        >
          <h3>Pågående</h3>
          {tasks.filter(task => task.status === 'Pågående').map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={handleDragStart}
              onDelete={deleteTask} 
            />
          ))}
        </div>
        <div className="column"
          onDragOver={handleDragOver}
          onDragEnter={(e) => handleDragEnter(e, 'Klart')}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'Klart')}
        >
          <h3>Klart</h3>
          {tasks.filter(task => task.status === 'Klart').map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={handleDragStart}
              onDelete={deleteTask} 
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div>
        <header>
          <h1>The Board App</h1>
      
        </header>
        <TaskForm onAddTask={addTask} />
        <Routes>
          <Route path='/attGora' element={<TaskColumns />} />
          <Route path='/pogoende' element={<TaskColumns />} />
          <Route path='/klart' element={<TaskColumns />} />
          <Route path='/' element={<TaskColumns />} />
        </Routes>
      </div>
    </Router>
  );
};

export default TaskBoard;






