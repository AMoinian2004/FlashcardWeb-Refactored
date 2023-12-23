import React, { useState, useEffect, useRef } from 'react';
import Flashcard from './Flashcard';

function FlashcardContainer({ flashcards, updateFlashcards, connections, setConnections }) {
    const [draggingCard, setDraggingCard] = useState(null);
    const [startConnectionCard, setStartConnectionCard] = useState(null);
    const svgRef = useRef(null);

    const onDrag = (e, id, ref) => {
        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        setDraggingCard({ id, ref, offsetX, offsetY });
    };

    const onDoubleClick = (id) => {
        if (!startConnectionCard) {
            setStartConnectionCard(id);
        } else {
            drawConnection(startConnectionCard, id);
            setStartConnectionCard(null);
        }
    };

    const onDelete = (id) => {
        const newFlashcards = flashcards.filter(card => card.id !== id);
        updateFlashcards(newFlashcards);
        setConnections(connections.filter(conn => conn.startId !== id && conn.endId !== id));
    };

    const drawConnection = (startId, endId) => {
        const startCard = document.querySelector(`.flashcard[data-id='${startId}']`);
        const endCard = document.querySelector(`.flashcard[data-id='${endId}']`);

        const x1 = startCard.offsetLeft + startCard.offsetWidth / 2;
        const y1 = startCard.offsetTop + startCard.offsetHeight / 2;
        const x2 = endCard.offsetLeft + endCard.offsetWidth / 2;
        const y2 = endCard.offsetTop + endCard.offsetHeight / 2;

        setConnections([...connections, { startId, endId, x1, y1, x2, y2 }]);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!draggingCard) return;

            const cardRect = draggingCard.ref.current.getBoundingClientRect();
            const containerRect = svgRef.current.parentNode.getBoundingClientRect();

            let newX = e.clientX - draggingCard.offsetX;
            let newY = e.clientY - draggingCard.offsetY;

            newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - cardRect.width));
            newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - cardRect.height));

            draggingCard.ref.current.style.left = `${newX - containerRect.left}px`;
            draggingCard.ref.current.style.top = `${newY - containerRect.top}px`;

            const updatedFlashcards = flashcards.map(fc => {
                if (fc.id === draggingCard.id) {
                    return { ...fc, x: newX - containerRect.left, y: newY - containerRect.top };
                }
                return fc;
            });

            updateFlashcards(updatedFlashcards);

            setConnections(connections.map(conn => {
                if (conn.startId === draggingCard.id || conn.endId === draggingCard.id) {
                    const startCard = document.querySelector(`.flashcard[data-id='${conn.startId}']`);
                    const endCard = document.querySelector(`.flashcard[data-id='${conn.endId}']`);
                    return {
                        ...conn,
                        x1: startCard.offsetLeft + startCard.offsetWidth / 2,
                        y1: startCard.offsetTop + startCard.offsetHeight / 2,
                        x2: endCard.offsetLeft + endCard.offsetWidth / 2,
                        y2: endCard.offsetTop + endCard.offsetHeight / 2,
                    };
                }
                return conn;
            }));
        };

        const handleMouseUp = () => {
            setDraggingCard(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingCard, connections, flashcards, updateFlashcards]);

    return (
        <div id="flashcardContainer">
            <svg ref={svgRef} id="connections">
                {connections.map((conn, index) => (
                    <line
                        key={index}
                        x1={conn.x1}
                        y1={conn.y1}
                        x2={conn.x2}
                        y2={conn.y2}
                        stroke="black"
                    />
                ))}
            </svg>
            {flashcards.map(flashcard => (
                <Flashcard
                    key={flashcard.id}
                    dataId={flashcard.id}
                    frontText={flashcard.frontText}
                    backText={flashcard.backText}
                    onDrag={onDrag}
                    onDelete={onDelete}
                    onDoubleClick={onDoubleClick}
                    x={flashcard.x}
                    y={flashcard.y}
                />
            ))}
        </div>
    );
}

export default FlashcardContainer;
