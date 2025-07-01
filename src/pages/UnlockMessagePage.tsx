import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { PageContainer, NeonText } from '../styles/SharedStyles';

const heartNeonGlow = keyframes`
  0%, 100% {
    text-shadow:
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 30px #e60073,
      0 0 40px #e60073,
      0 0 60px #e60073;
    color: #fff;
  }
  50% {
    text-shadow:
      0 0 20px #fff,
      0 0 40px #e60073,
      0 0 60px #e60073,
      0 0 80px #e60073;
    color: #ff69b4;
  }
`;

const HeartButton = styled.button<{ holding: boolean; unlocked: boolean }>`
  font-size: 3rem;
  background: ${({ holding }) => (holding ? 'rgba(230, 0, 115, 0.3)' : 'rgba(255, 255, 255, 0.1)')};
  border: 2px solid #e60073;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  position: relative;
  overflow: visible;
`;

const GlowingHeart = styled.span`
  font-size: 3rem;
  display: inline-block;
  animation: ${heartNeonGlow} 1.6s infinite alternate;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MessageContainer = styled.div<{ animating: boolean }>`
  max-width: 32%;
  margin: 1.5rem auto 0 auto;
  border-radius: 20px;
  background: rgba(230, 0, 115, 0.13);
  padding: 2rem 2.5rem;
  max-height: 340px;
  overflow-y: ${({ animating }) => (animating ? 'hidden' : 'auto')};
  pointer-events: ${({ animating }) => (animating ? 'none' : 'auto')};
  scrollbar-width: ${({ animating }) => (animating ? 'none' : 'thin')};
  -ms-overflow-style: ${({ animating }) => (animating ? 'none' : 'auto')};
  &::-webkit-scrollbar {
    display: ${({ animating }) => (animating ? 'none' : 'block')};
  }
  box-shadow: 0 0 32px 8px #e60073aa;
  backdrop-filter: blur(2px);
`;

const AnimatedMessage = styled(NeonText)`
  font-size: 1.35rem;
  text-align: center;
  letter-spacing: 0.1em;
  word-spacing: 0.1em;
  line-height: 1.7;
  white-space: pre-line;
`;

const FULL_MESSAGE = `Hy My Jaan, I never thought I will find U. In very short time we came to a relationship and we did so many thing's also. u r not who I dream, u r more that that dream and it's colourful and  beautiful . May be I am not perfect but I promise I will change everything for U and I promise now and in future I am your and u r mine only.
I promise I never leave U, in any situation I am next to U, never leave ur Hand in any cost. I love U my jaan now, in future and in my next life also. U r my first and last girl who I choose, 
Thnx to Come in my life and choose me even in bad day's also and when I am so rude and toxic also. Sorry for that also.
I Love, I gave time, loyalty, I gave virginity, and everything's 4 U only.`;

const TYPING_SPEED = 28; // ms per character

const UnlockMessagePage: React.FC = () => {
  const [holding, setHolding] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unlocked) {
      setDisplayedText('');
      setAnimating(true);
      let i = 0;
      const reveal = () => {
        setDisplayedText(FULL_MESSAGE.slice(0, i));
        if (i < FULL_MESSAGE.length) {
          i++;
          setTimeout(reveal, TYPING_SPEED);
        } else {
          setAnimating(false);
        }
      };
      reveal();
    }
  }, [unlocked]);

  useEffect(() => {
    if (animating && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedText, animating]);

  const handleMouseDown = () => {
    setHolding(true);
    timerRef.current = setTimeout(() => {
      setUnlocked(true);
      setHolding(false);
    }, 3000);
  };

  const handleMouseUp = () => {
    setHolding(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <PageContainer>
      <NeonText style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        Click & Hold the Heart to Unlock the Message
      </NeonText>
      <HeartButton
        holding={holding}
        unlocked={unlocked}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        disabled={unlocked}
      >
        <GlowingHeart>💖</GlowingHeart>
      </HeartButton>
      {unlocked && (
        <MessageContainer ref={scrollRef} animating={animating}>
          <AnimatedMessage>{displayedText}</AnimatedMessage>
        </MessageContainer>
      )}
    </PageContainer>
  );
};

export default UnlockMessagePage; 