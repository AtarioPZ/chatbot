import React, { useState, useEffect, } from 'react';
import './dndflow.css';
import chat from './chat.png';
import backB from './back.png';

export default function Panel({ onNodeDrop, handleNodeDrop, handleValueChange }) {
  let [selectedNodeType, setSelectedNodeType] = useState(null);
  let [inputValue, setInputValue] = useState('');
  let [showSettingsPanel, setShowSettingsPanel] = useState(false);

  const handleNodeClick = (nodeType) => {
    setSelectedNodeType(nodeType);
    setShowSettingsPanel(true);
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSaveClick = () => {
    if (inputValue.trim() !== '') {
      handleNodeDrop(inputValue);
      setSelectedNodeType(null);
      setInputValue('');
      setShowSettingsPanel(false);
      handleValueChange(inputValue);
    }
  };

  const handleBack = () => {
    setSelectedNodeType(null);
    setShowSettingsPanel(false);
  };

  useEffect(() => {
    setSelectedNodeType(null);
    setInputValue('');
    setShowSettingsPanel(false);
  }, [onNodeDrop]);

  return (
    <aside>
      {showSettingsPanel ? (
        <div className="settings-panel">
          <button className="back-button" onClick={handleBack}>
            <img src={backB} alt="Back" width="8" height="9" />
          </button>
          <div className='settings-panel-input'>
            <input
              type="text"
              placeholder="Enter message..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSaveClick}>Save</button>
        </div>
        </div>        
      ) : (
        <div>
          <div
            className="dndnode input"
            onDragStart={(event) => onDragStart(event, 'input')}
            draggable={true}
            onClick={() => handleNodeClick('input')}
          >
            <div className="chat-node">
              <img src={chat} alt="Chat Node" width="80" height="90" />
              <span>Message</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
