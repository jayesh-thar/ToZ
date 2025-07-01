import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
    background: linear-gradient(120deg, #ff69b4 0%, #ffb6c1 100%);
    background-size: 200% 200%;
    animation: gradientMove 8s ease-in-out infinite;
    position: relative;
  }

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .glass-bg {
    background: rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  button {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input {
    font-family: 'Poppins', sans-serif;
  }
`;

export default GlobalStyles; 