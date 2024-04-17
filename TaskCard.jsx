import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onDragStart, onSave, onDelete }) => {
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSaveClick = () => {
    onSave(task.id, editedTaskName);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTaskName(task.name);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="task-card" draggable="true" onDragStart={(e) => onDragStart(e, task.id)}>
      <div>
        <h4 onDoubleClick={handleDoubleClick}>{task.name}</h4>
        <p>Status: {task.status}</p>
        <button onClick={toggleDetails}>Visa detaljer</button>
        <div style={{ display: showDetails ? 'block' : 'none' }}>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
              />
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>Mer detaljer..</p>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDeleteClick}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;




