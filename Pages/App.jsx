

import React from 'react';
import TaskBoard from './TaskBoard';
import { TaskProvider } from './TaskContext';


function App() {
  return (
    <TaskProvider>
      <div className="App">
        <TaskBoard />
      </div>
    </TaskProvider>
  );
}

export default App;



