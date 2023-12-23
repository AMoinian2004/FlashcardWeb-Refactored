import React, { useState } from 'react';
import './style.css';
import FlashcardContainer from './FlashcardContainer';

function FlashcardWeb({ config }) {
  const [flashcards, setFlashcards] = useState(config ? config.flashcards : []);
  const [connections, setConnections] = useState(config ? config.connections : []);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { frontText: '', backText: '', id: Date.now(), x: 0, y: 0 }]);
  };

  const saveFlashcards = async () => {
    const configName = prompt("Enter a name for this flashcard configuration:");
    if (!configName) {
      alert("Saving cancelled. Please provide a name.");
      return;
    }

    try {
      const username = localStorage.getItem('username');
      const response = await fetch('/saveFlashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, configName, flashcards, connections }),
      });

      if (response.ok) {
        alert(`Flashcards saved as "${configName}"!`);
      } else {
        alert('Failed to save flashcards.');
      }
    } catch (error) {
      console.error('Error saving flashcards:', error);
      alert('An error occurred while saving flashcards.');
    }
  };

  const clearCanvas = () => {
    setFlashcards([]);
    setConnections([]);
  };

  const updateFlashcards = (newFlashcards) => {
    setFlashcards(newFlashcards);
  };

  return (
    <div>
      <div className="header">
        <h1>Flashcard Web</h1>
      </div>

      <div className="instructions">
        <p>Welcome to the Flashcard Web!</p>
        <ul>
          <li>Click the "Add Flashcard" button to create a flashcard.</li>
          <li>Drag the cards around.</li>
          <li>Double click two cards to connect them.</li>
          <li>Each card is double-sided. Click the "Flip" button to see the other side.</li>
          <li>Scroll up/down and left/right to see overflow.</li>
          <li>Click "Save" to save your work locally to the browser. <strong>There is no autosave.</strong></li>
          <li>Click "Clear Canvas" to delete all the flashcards. <strong>This is permanent.</strong></li>
        </ul>
      </div>

      <div className="button-container">
        <button onClick={addFlashcard} className="addFlashcardButton">Add Flashcard</button>
        <button onClick={saveFlashcards} className="addFlashcardButton">Save</button>
        <button onClick={clearCanvas} className="addFlashcardButton">Clear Canvas</button>
      </div>

      <FlashcardContainer flashcards={flashcards} updateFlashcards={updateFlashcards} connections={connections} setConnections={setConnections} />
    </div>
  );
}

export default FlashcardWeb;
