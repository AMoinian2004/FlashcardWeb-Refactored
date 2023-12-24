import React, { useState, useEffect } from 'react';
import FlashcardWeb from './FlashcardWeb';
import './styles/configStyles.css';

function ConfigPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [configurations, setConfigurations] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        const username = localStorage.getItem('username'); // Retrieve username from local storage
        const response = await fetch(`/getFlashcards/${username}`);
        if (response.ok) {
          const data = await response.json();
          setConfigurations(data); // Assuming the data is an array of configurations
        } else {
          console.error('Failed to fetch configurations');
        }
      } catch (error) {
        console.error('Error fetching configurations:', error);
      }
    };
    fetchConfigurations();
  }, []);

  const handleSelectConfig = (config) => {
    setSelectedConfig(config);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  

  const handleGoToEditor = () => {
    setSelectedConfig(null); // Reset selectedConfig when creating a new one
    setShowEditor(true);
  };

  return (
    <div>
        <div className="header">
          <h1>Flashcard Web</h1>
        </div>
    <div className={showEditor ? "full-width-container" : "config-container"}>
      {!showEditor ? (
        <div>
          <h2 className="config-header">Configuration Page</h2>
          {configurations.length === 0 ? (
            <p>You have no saved configurations.</p>
          ) : (
            <ul className="config-list">
              {configurations.map((config, index) => (
                <li key={index}>
                  <button className="config-button-edit" onClick={() => handleSelectConfig(config)}>Edit {config.configName}</button>
                </li>
              ))}
            </ul>
          )}
          <button className="config-button-editor" onClick={handleGoToEditor}>Go to Flashcard Editor</button>
        </div>
      ) : (
        <FlashcardWeb config={selectedConfig} onCloseEditor={handleCloseEditor} />
      )}
    </div>
    </div>
  );
}

export default ConfigPage;
