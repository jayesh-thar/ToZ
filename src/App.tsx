import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';
import LandingPage from './pages/LandingPage';
import LoveQuestionPage from './pages/LoveQuestionPage';
import HeartGamePage from './pages/HeartGamePage';
import UnlockMessagePage from './pages/UnlockMessagePage';
import FloatingHearts from './components/FloatingHearts';

const AppContainer = styled.div`
  min-height: 100vh;
`;

function AppRoutes() {
  return (
    <AppContainer>
      <FloatingHearts />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/love-question" element={<LoveQuestionPage />} />
        <Route path="/heart-game" element={<HeartGamePage />} />
        <Route path="/unlock-message" element={<UnlockMessagePage />} />
      </Routes>
    </AppContainer>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App; 