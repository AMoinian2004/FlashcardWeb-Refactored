import React, { useState, useEffect } from 'react';
import FlashcardWeb from './FlashcardWeb'; // Adjust the path as needed

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

  const handleGoToEditor = () => {
    setSelectedConfig(null); // Reset selectedConfig when creating a new one
    setShowEditor(true);
  };

  return (
    <div>
      {!showEditor ? (
        <div>
          <h2>Configuration Page</h2>
          {configurations.length === 0 ? (
            <p>You have no saved configurations.</p>
          ) : (
            <ul>
              {configurations.map((config, index) => (
                <li key={index}>
                  <button onClick={() => handleSelectConfig(config)}>Edit Configuration {index + 1}</button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleGoToEditor}>Go to Flashcard Editor</button>
        </div>
      ) : (
        <FlashcardWeb config={selectedConfig} />
      )}
    </div>
  );
}

export default ConfigPage;
