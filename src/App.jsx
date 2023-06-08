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
  backgroundColor: '#989898',
};

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'red',
  },
};

const mynodes = [
  {
    id: '1', 
    type: 'textUpdater',
    position: { x: 250, y: 10 },
    data: { value: 123 } },
  {
    id: '2', 
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

  /* SAVE
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
  */

  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  

  return(
    <div>      
      <div className='savebar'>        
        <button className='button-20'> SAVE </button>
      </div>     
      <div className='dndflow'>
        <ReactFlowProvider>
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
              onDragOver={onDragOver}      
            >          
              <Controls />
            </ReactFlow>
          </div>
          <Panel />
        </ReactFlowProvider>
      </div>
    </div>
  );
}