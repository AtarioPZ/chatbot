import React from 'react';
import './dndflow.css'
import chat from './chat.png';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>      
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        <img src={chat} alt="Chat Node" width="80" height="90" />
        
      </div>      
    </aside>
  );
};
