import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { PageContainer, NeonText, NeonButton } from '../styles/SharedStyles';

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  align-items: center;
`;

const NoButton = styled(NeonButton)`
  background: rgba(230, 0, 115, 0.2);
  position: absolute;
  transition: top 0.4s ease-out, left 0.4s ease-out;

  &:hover {
    background: rgba(230, 0, 115, 0.4);
    transform: scale(1.1);
  }
`;

const LoveQuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0, opacity: 0 });
  const [isChased, setIsChased] = useState(false);
  const name = localStorage.getItem('loverName') || 'My Love';

  const moveNoButton = () => {
    if (!isChased) setIsChased(true);
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoButtonPosition({ ...noButtonPosition, x, y });
  };

  const handleYesClick = () => {
    navigate('/heart-game');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (yesButtonRef.current) {
        const rect = yesButtonRef.current.getBoundingClientRect();
        setNoButtonPosition({
          x: rect.right + 16, // 16px for 1rem gap
          y: rect.top,
          opacity: 1
        });
      }
    }, 1000); // Wait for the AOS animation to finish (duration is 1000ms)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = '100vh';
      heart.style.fontSize = Math.random() * (30 - 15) + 15 + 'px';
      const container = document.querySelector('#hearts-container');
      if (container) {
        container.appendChild(heart);
      }

      gsap.to(heart, {
        y: -window.innerHeight * 1.5,
        x: 'random(-100, 100)',
        rotation: 'random(-90, 90)',
        duration: 'random(4, 8)',
        ease: 'none',
        onComplete: () => heart.remove()
      });
    };

    const interval = setInterval(createHeart, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer>
      <div id="hearts-container" />
      <NeonText data-aos="fade-down" style={{ fontSize: '3.5rem', marginBottom: '3rem' }}>
        {name}, Do You Love Me? 💕
      </NeonText>
      <ButtonContainer>
        <NeonButton ref={yesButtonRef} onClick={handleYesClick} data-aos="fade-right">
          Yes 💝
        </NeonButton>
      </ButtonContainer>
      <NoButton
        onMouseEnter={moveNoButton}
        onClick={moveNoButton}
        style={{
          left: `${noButtonPosition.x}px`,
          top: `${noButtonPosition.y}px`,
          opacity: noButtonPosition.opacity
        }}
        data-aos={isChased ? '' : 'fade-left'}
      >
        No 💔
      </NoButton>
    </PageContainer>
  );
};

export default LoveQuestionPage; 