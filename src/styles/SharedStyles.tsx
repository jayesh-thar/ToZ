import styled, { keyframes } from 'styled-components';

export const textGlow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #fff,
                 0 0 20px #fff,
                 0 0 30px #e60073,
                 0 0 40px #e60073;
  }
  50% {
    text-shadow: 0 0 20px #fff,
                 0 0 35px #e60073,
                 0 0 50px #e60073,
                 0 0 70px #e60073;
  }
`;

export const boxGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
                0 0 20px rgba(230, 0, 115, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                0 0 40px rgba(230, 0, 115, 0.4),
                0 0 60px rgba(230, 0, 115, 0.3);
  }
`;

export const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: #000;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
              0 0 20px rgba(255, 255, 255, 0.2),
              0 0 30px rgba(230, 0, 115, 0.2);
  animation: ${boxGlow} 2s ease-in-out infinite;
`;

export const NeonText = styled.h1`
  font-family: 'Great Vibes', cursive;
  color: white;
  text-shadow: 0 0 10px #fff,
               0 0 20px #fff,
               0 0 30px #e60073,
               0 0 40px #e60073,
               0 0 50px #e60073,
               0 0 60px #e60073,
               0 0 70px #e60073;
`;

export const NeonButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px #fff,
               0 0 20px #e60073;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
              0 0 20px rgba(230, 0, 115, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
    border-color: #e60073;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4),
                0 0 30px rgba(230, 0, 115, 0.3);
  }
`;

export const NeonInput = styled.input`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  outline: none;
  text-align: center;
  width: 300px;
  max-width: 90%;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3),
              0 0 20px rgba(255, 255, 255, 0.2),
              0 0 30px rgba(230, 0, 115, 0.2);
  animation: ${boxGlow} 2s ease-in-out infinite;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
    border-color: #e60073;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4),
                0 0 30px rgba(230, 0, 115, 0.3),
                0 0 45px rgba(230, 0, 115, 0.2);
    animation: none;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const NeonParagraph = styled.p`
  color: white;
  text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 15px #e60073,
               0 0 20px #e60073;
  font-size: 1.2rem;
  text-align: center;
`; 