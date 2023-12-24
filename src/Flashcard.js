import React, { useState, useRef } from 'react';

function Flashcard({ dataId, frontText, backText, onDrag, onDelete, onDoubleClick, x, y, updateText }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flashcardRef = useRef(null);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const startDrag = (e) => {
    onDrag(e, dataId, flashcardRef);
  };

  return (
    <div 
      ref={flashcardRef} 
      className="flashcard" 
      onMouseDown={startDrag} 
      onDoubleClick={() => onDoubleClick(dataId)} 
      data-id={dataId} 
      style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}
    >
      <div className="flashcard-content" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div className="flashcard-front">
          <textarea
            value={frontText}
            onChange={(e) => updateText(dataId, 'front', e.target.value)}
          ></textarea>
        </div>
        <div className="flashcard-back">
          <textarea
            value={backText}
            onChange={(e) => updateText(dataId, 'back', e.target.value)}
          ></textarea>
        </div>
      </div>
      <button className="flip-button" onClick={flipCard}>Flip</button>
      <button className="delete-button" onClick={() => onDelete(dataId)}>Delete</button>
    </div>
  );
}

export default Flashcard;
