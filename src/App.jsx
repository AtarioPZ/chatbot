import React, { useState,  useRef, useCallback, useEffect } from 'react';
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
    data: { value: '' } },
  {
    id: '2', 
    type: 'textUpdater',
    position: { x: 30, y: 90 },
    data: { value: '' } },    
];

const myedge = [
  {
    id: 'edge-1', source: '2', target: '1'
  },
];

const nodeTypes = { textUpdater: TextNode };

let id = 3;
const getId = () => `${id++}`;

const App = () => {  
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState(mynodes);
  const [edges, setEdges] = useState(myedge);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = (params) => {
    const newEdge = {
      id: getId(),
      source: params.source,
      target: params.target,
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }

  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeDataValue, setNodeDataValue] = useState('');

  const handleValueChange = useCallback((value) => {
    setNodeDataValue(value);
  }, []);

  const handleNodeClick = (nodeId) => {
    const nodeToUpdate = nodes.find((node) => node.id == nodeId);
    if (nodeToUpdate){
      setSelectedNode(nodeToUpdate);
      setNodeDataValue(nodeToUpdate.data.value);
    }
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: 'textUpdater',
        position,
        data: { value: nodeDataValue },
      };
      console.log('Dropped Node ID:', newNode.id);  
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodeDataValue]
  );

  const handleNodeDrop = useCallback(
    (value) => {
      console.log('Value received:', value);
      if (selectedNode) {
        const updatedNode = {
          ...selectedNode,
          value: { value },
        };
        const updatedNodes = nodes.map((node) =>
          node.id === selectedNode.id ? updatedNode : node
        );
        setNodes(updatedNodes);
        setNodeDataValue(value);
      }
    },
    [selectedNode, nodes, setNodeDataValue]
  );

  useEffect(() => {
    if (selectedNode) {
      setNodeDataValue(selectedNode.data.value);
    }
  }, [selectedNode]);
  
  return(
    <div>      
      <div className='savebar'>        
        <button className='button-20'> SAVE </button>
      </div>     
      <div className='dndflow'>
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>              
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              defaultEdgeOptions={edgeOptions}
              onConnect={onConnect}     
              nodeTypes={nodeTypes}                        
              style={rfStyle}  
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >  
              <Controls />
            </ReactFlow>
          </div>
          <Panel
            handleNodeDrop ={handleNodeDrop}          
            onClick={handleNodeClick}
            selectedNodeId={selectedNode}
            nodeDataValue={nodeDataValue}
            setNodeDataValue={setNodeDataValue}
            handleValueChange={handleValueChange}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;