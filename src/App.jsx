import ReactFlow, { 
  ReactFlowProvider,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import React, { useState, useCallback } from 'react';

import TextNode from './TextNode';
import Panel from './Panel';

import 'reactflow/dist/style.css';
import './App.css'
import './dndflow.css'


const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'red',
  },
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

  const Saving = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(mynodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(myedge);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
    const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);
  }

  return(
    <div>      
      <div className='savebar'>
        <button> SAVE </button>
      </div>     
      <div className='dndflow'>
        <div className="myBox">              
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            defaultEdgeOptions={edgeOptions}
            onConnect={onConnect}     
            nodeTypes={nodeTypes}          
            fitView
            style={rfStyle}        
          >          
            <Controls />
          </ReactFlow>
        </div>
      <Panel />
      </div>
    </div>
  );
}