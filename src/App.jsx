import ReactFlow, { 
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import React, { useState, useCallback } from 'react';
import './App.css'
import TextNode from './TextNode.jsx';
import './text-updater-node.css';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const mynodes = [
  {
    id: 'node-1', 
    type: 'textUpdater',
    position: { x: 250, y: 10 },
    data: { value: 123 } },
  {
    id: 'node-2', 
    type: 'textUpdater',
    position: { x: 30, y: 90 },
    data: { value: 123 } },    
];

const myedge = [
  {
     
  },
];

const nodeTypes = { textUpdater: TextNode };

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

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return(
    <div>
      <h1>Chatbot Flow Builder</h1>
      <div className="myBox">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}     
          nodeTypes={nodeTypes}          
          fitView
          style={rfStyle}        
        >          
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}