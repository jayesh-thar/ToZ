import React, { useRef, useState } from 'react';
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

const DraggableHeart = styled.div<{ isDragging: boolean }>`
  font-size: 4rem;
  cursor: grab;
  user-select: none;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  transition: opacity 0.2s;
  text-shadow: 0 0 10px #fff,
               0 0 20px #e60073,
               0 0 30px #e60073;
  will-change: transform, opacity;
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
  const [isOver, setIsOver] = useState(false);
  const [success, setSuccess] = useState(false);
  const heartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ pointerEvents: success ? 'none' : 'auto' }}
          >
            💝
          </DraggableHeart>
        )}
        <DropZone
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