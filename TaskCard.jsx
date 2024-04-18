import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onDragStart, onSave, onDelete }) => {
  const [editedTaskName, setEditedTaskName] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [menu, setMenu] = useState(false);
  const [editText, setEditText] = useState(false);
  const [editTextVal, setEditTextVal] = useState('');

  const handleSaveClick = () => {
    document.getElementById(task.id).querySelector('h4').innerHTML = inputText.value;
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

  const handleKeyDown = (e) => {
    e.key === 'Enter' && handleUpdate();
  }

  const handleUpdate = () => {
    document.getElementById(task.id).querySelector('h4').innerHTML = editTextVal;
    setMenu(false);
  }

  return (
    <>
    <div className="task-card" draggable="true" id={task.id} onDragStart={(e) => onDragStart(e, task.id)}>
      <div>
        <h4 onDoubleClick={handleDoubleClick}>{task.name}</h4>
        <p>Status: {task.status}</p>
        <button onClick={() => (toggleDetails(), setMenu(true))}>Visa detaljer</button>
        <div style={{ display: showDetails ? 'block' : 'none' }}>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
                id='inputText'
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
    {menu &&
    <div id="modal">
      <h1 onClick={() => setMenu(false)}>X</h1>
      <h2>{task.name}</h2>
      <div>
        <button onClick={handleDeleteClick}>Ta bort</button>
        <button onClick={() => setEditText(true)}>Redigera</button>
      </div>
      {editText && <input type="text" value={editTextVal} onChange={e => setEditTextVal(e.target.value)} onKeyDown={e => handleKeyDown(e)} />}
      {editTextVal && <button onClick={handleUpdate}>Save</button>}
    </div>}
    </>
  );
};

export default TaskCard;




