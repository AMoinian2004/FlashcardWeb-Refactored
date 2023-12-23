import React, { useState } from 'react';
import FlashcardWeb from './FlashcardWeb'; // Adjust the path as needed

function ConfigPage() {
  const [showEditor, setShowEditor] = useState(false);

  const handleGoToEditor = () => {
    setShowEditor(true);
  };

  return (
    <div>
      {!showEditor ? (
        <div>
          <h2>Configuration Page</h2>
          {/* Configuration options here */}
          <button onClick={handleGoToEditor}>Go to Flashcard Editor</button>
        </div>
      ) : (
        <FlashcardWeb />
      )}
    </div>
  );
}

export default ConfigPage;
