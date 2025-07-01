import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PageContainer, NeonText, NeonButton } from '../styles/SharedStyles';

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const heartCelebrate = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  30% {
    transform: scale(1.25) rotate(-8deg);
    opacity: 0.85;
  }
  60% {
    transform: scale(1.15) rotate(8deg);
    opacity: 1;
  }
`;

const DraggableHeart = styled.div<{ isDragging: boolean; isDraggingTouch: boolean }>`
  font-size: 4rem;
  cursor: grab;
  user-select: none;
  touch-action: none;
  opacity: ${({ isDragging, isDraggingTouch }) => (isDragging || isDraggingTouch ? 0.5 : 1)};
  transition: opacity 0.2s;
  text-shadow: 0 0 10px #fff,
               0 0 20px #e60073,
               0 0 30px #e60073;
  will-change: transform, opacity;
  position: ${({ isDraggingTouch }) => (isDraggingTouch ? 'fixed' : 'static')};
  z-index: ${({ isDraggingTouch }) => (isDraggingTouch ? 1000 : 'auto')};
  transform: ${({ isDraggingTouch }) => (isDraggingTouch ? 'translate(-50%, -50%)' : 'none')};
`;

const DropZone = styled.div<{ isOver: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ isOver }) => (isOver ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)')};
  border: 3px dashed #e60073;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  box-shadow: 0 0 20px 5px rgba(230, 0, 115, 0.3);
  transition: all 0.2s;
  text-shadow: 0 0 10px #fff,
               0 0 20px #e60073;
  position: relative;
`;

const CelebratingHeart = styled.span`
  font-size: 4rem;
  display: inline-block;
  animation: ${heartCelebrate} 1.5s ease-in-out infinite;
  will-change: transform, opacity;
  /* Use a static neon glow for performance */
  text-shadow: 0 0 10px #fff,
               0 0 20px #fff,
               0 0 30px #e60073,
               0 0 40px #e60073,
               0 0 60px #e60073;
`;

const Sparkle = styled.span`
  position: absolute;
  pointer-events: none;
  font-size: 1.5rem;
  opacity: 0.8;
  will-change: transform, opacity;
  animation: sparkle 1.2s linear infinite;

  @keyframes sparkle {
    0% { opacity: 0; transform: scale(0.5) translateY(0); }
    30% { opacity: 1; transform: scale(1.2) translateY(-10px); }
    100% { opacity: 0; transform: scale(0.7) translateY(-30px); }
  }
`;

const SuccessMessage = styled(NeonText)`
  margin-top: 2rem;
  font-size: 2rem;
  background: rgba(230, 0, 115, 0.1);
  padding: 1rem 2rem;
  border-radius: 20px;
  letter-spacing: 0.1em;
`;

const HeartGamePage: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingTouch, setIsDraggingTouch] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const heartRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mouse drag events
  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', 'heart');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    setSuccess(true);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setTouchPosition({ x: touch.clientX, y: touch.clientY });
    setIsDraggingTouch(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (isDraggingTouch) {
      const touch = e.touches[0];
      setTouchPosition({ x: touch.clientX, y: touch.clientY });
      
      // Check if touch is over drop zone
      if (dropZoneRef.current) {
        const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
        const isOverDropZone = 
          touch.clientX >= dropZoneRect.left &&
          touch.clientX <= dropZoneRect.right &&
          touch.clientY >= dropZoneRect.top &&
          touch.clientY <= dropZoneRect.bottom;
        
        setIsOver(isOverDropZone);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (isDraggingTouch && isOver) {
      setSuccess(true);
    }
    setIsDraggingTouch(false);
    setIsOver(false);
  };

  const handleNext = () => {
    navigate('/unlock-message');
  };

  return (
    <PageContainer>
      <NeonText style={{ fontSize: '3rem', marginBottom: '2rem' }}>
        Drag and Drop the Heart to Me 💖
      </NeonText>
      <GameArea>
        {!success && (
          <DraggableHeart
            ref={heartRef}
            draggable
            isDragging={isDragging}
            isDraggingTouch={isDraggingTouch}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              pointerEvents: success ? 'none' : 'auto',
              left: isDraggingTouch ? `${touchPosition.x}px` : 'auto',
              top: isDraggingTouch ? `${touchPosition.y}px` : 'auto'
            }}
          >
            💝
          </DraggableHeart>
        )}
        <DropZone
          ref={dropZoneRef}
          isOver={isOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {success ? (
            <>
              <CelebratingHeart>💝</CelebratingHeart>
              {/* Sparkles */}
              <Sparkle style={{ left: '30%', top: '20%' }}>✨</Sparkle>
              <Sparkle style={{ left: '60%', top: '40%' }}>✨</Sparkle>
              <Sparkle style={{ left: '50%', top: '60%' }}>💫</Sparkle>
            </>
          ) : (
            isOver ? 'Drop here!' : '💗'
          )}
        </DropZone>
        {success && (
          <>
            <SuccessMessage>
              You just gave me your heart 💝
            </SuccessMessage>
            <NeonButton onClick={handleNext} style={{ marginTop: '2rem' }}>
              Next
            </NeonButton>
          </>
        )}
      </GameArea>
    </PageContainer>
  );
};

export default HeartGamePage; 