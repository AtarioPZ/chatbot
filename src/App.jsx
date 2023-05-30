import ReactFlow, { Controls, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import 'reactflow/dist/style.css';
import React, { useState, useCallback } from 'react'
import './App.css'

const mynodes = [
  {
    id: '1',
    data: { label: 'Test' },
    position: { x: 50, y: 50 },    
  },
  {
    id: '2',
    data: { label: 'Message' },
    position: { x: 150, y: 175},
  },
];

const myedge = [
  {
    id: '1-2', source: '1', target: '2', label: 'incoming',
  }
];

export default function App(){
  const [nodes, setNodes] = useState(mynodes);
  const [edges, setEdges] = useState(myedge);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return(
    <div>
      <div className="myBox">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
        >          
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}