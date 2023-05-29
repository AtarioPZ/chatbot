import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback,  useState } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import './App.css'
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Text Message 1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Text Message 2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{width: '100%', height: '100vh'}}>
      <h1>Chatbot Flow Builder</h1>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >        
      </ReactFlow>
      <h1>END</h1>
    </div>
  );
}
