import React, { useCallback, useState } from 'react'
import { Handle, Position } from 'reactflow';
import chat from './chat.png';

export default function TextNode( { data }) {
  const [value, setValue] = useState(data.value);

  const onDragStart = (event) => {
    event.stopPropagation(); // Stop the drag event from bubbling up to the parent node
    event.preventDefault(); // Prevent the default behavior of dragging

    event.dataTransfer.setData('application/reactflow', 'textUpdater');
    event.dataTransfer.effectAllowed = 'move';
  };

  const onChange = useCallback((evt) => {
    event.stopPropagation(); // Stop the drag event from bubbling up to the parent node
      setValue(evt.target.value);
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
            <input id="text" name="text" onChange={onChange} className="nodrag" placeholder='message...' value={value} draggable={false} />
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
