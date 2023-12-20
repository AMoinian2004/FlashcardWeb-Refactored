import React, { useState } from 'react';
import './style.css';
import FlashcardContainer from './FlashcardContainer';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [connections, setConnections] = useState([]);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { frontText: '', backText: '', id: Date.now() }]);
  };

  const saveFlashcards = () => {
    localStorage.setItem('flashcardsData', JSON.stringify({ flashcards, connections }));
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

export default App;
