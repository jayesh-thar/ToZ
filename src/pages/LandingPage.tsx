import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { PageContainer, NeonInput, ContentWrapper, textGlow } from '../styles/SharedStyles';

const fadeInDown = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const heartGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #ff69b4,
      0 0 30px #ff69b4;
    transform: scale(1);
    color: #ffc1d5;
  }
  50% {
    text-shadow: 
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 40px #e60073,
      0 0 60px #e60073,
      0 0 80px #e60073;
    transform: scale(1.15);
    color: #fff;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(-20px);
  animation: ${fadeInDown} 1s ease forwards;
`;

const WelcomeText = styled.h1`
  font-family: 'Great Vibes', cursive;
  font-size: 4rem;
  color: white;
  animation: ${textGlow} 2s ease-in-out infinite;
`;

const GlowingHeart = styled.span`
  font-size: 3.5rem; /* Slightly smaller to fit better */
  margin-left: 1.5rem;
  animation: ${heartGlow} 1.5s ease-in-out infinite;
`;

const LandingPage: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && name.trim()) {
      localStorage.setItem('loverName', name.trim());
      navigate('/love-question');
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <TitleContainer>
          <WelcomeText>Hi My Love</WelcomeText>
          <GlowingHeart>❤️</GlowingHeart>
        </TitleContainer>
        <NeonInput
          type="text"
          placeholder="Type Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleNameSubmit}
          data-aos="fade-up"
          autoFocus
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default LandingPage; 