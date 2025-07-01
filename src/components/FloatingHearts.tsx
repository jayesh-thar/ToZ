import React, { useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const loveShapes = [
  '❤️', // classic heart
  '💖', // sparkling heart
  '💘', // heart with arrow
  '💝', // gift heart
  '💞', // revolving hearts
  '💓', // beating heart
  '💗', // growing heart
  '💕', // two hearts
  '💑', // couple with heart
  '🫂', // hugging
  '😘', // kiss
  '🥰', // smiling with hearts
  '😍', // heart eyes
  '💋', // kiss mark
  '🫶', // heart hands
  '🫀', // anatomical heart
  '👩‍❤️‍💋‍👨', // couple with heart
  '🌹', // rose
  '💐', // bouquet
  '💦', // water droplet
  '🍑', // peach
  '🍆', // eggplant
  '👅', // tongue
  '🥵', // hot face
  '👅', // tongue 
  '🫦', // mouth
  '🤤', // drooling face
  '🔥', // fire
  '🤍', // white heart
  '💦', // water droplet
  '🤭', // face with hand over mouth
  '🍑', // peach
  '🍆', // eggplant
];

const HeartsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
`;

const FloatingHearts: React.FC = () => {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      const shape = loveShapes[Math.floor(Math.random() * loveShapes.length + 1)]; 
      heart.innerHTML = shape;
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = '100vh';
      heart.style.fontSize = Math.random() * (30 - 15) + 15 + 'px';
      heart.style.pointerEvents = 'none';
      document.getElementById('global-hearts-container')?.appendChild(heart);

      gsap.to(heart, {
        y: -window.innerHeight * 1.5,
        x: 'random(-100, 100)',
        rotation: 'random(-90, 90)',
        duration: 'random(4, 8)',
        ease: 'none',
        onComplete: () => heart.remove()
      });
    };

    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  return <HeartsContainer id="global-hearts-container" />;
};

export default FloatingHearts;