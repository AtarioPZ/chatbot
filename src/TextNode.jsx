import React, { useCallback } from 'react'
import { Handle, Position } from 'reactflow';

export default function TextNode() {
  const onChange = useCallback((evt) => {
        console.log(evt.target.value);
      }, []);
    
      return (
        <div className="text-updater-node">
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
