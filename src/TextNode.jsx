import React, { useCallback } from 'react'
import { Handle, Position } from 'reactflow';
import chat from './chat.png';

export default function TextNode() {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', 'textUpdater');
    event.dataTransfer.effectAllowed = 'move';
  };

  const onChange = useCallback((evt) => {
        console.log(evt.target.value);
      }, []);
    
      return (
        <div className="text-updater-node" draggable onDragStart={onDragStart}>
          <Handle
          type="target"
          position={Position.Left}
          id="left"
          isConnectable={true}
          />
          <div>
            <label htmlFor="text">Send Message</label>
            <input id="text" name="text" onChange={onChange} className="nodrag" placeholder='message...' value={""}/>
          </div>
          <Handle 
          type="source" 
          position={Position.Right}
          id="right"
          isConnectable={true}      
          />
        </div>
      );
}
