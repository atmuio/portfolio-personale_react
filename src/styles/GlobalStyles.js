/* src/styles/GlobalStyles.js */
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :root {
    --primary: #0070f3;
    --secondary: #6d28d9;
    --dark: #111827;
    --light: #f9fafb;
    --gray: #6b7280;
    --light-gray: #e5e7eb;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: var(--dark);
    background-color: var(--light);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 3rem;
    letter-spacing: -1px;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  h2 {
    font-size: 2.5rem;
    letter-spacing: -0.5px;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  a {
    color: var(--primary);
    text-decoration: none;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    cursor: pointer;
  }
  
  section {
    padding: 5rem 0;
    
    @media (max-width: 768px) {
      padding: 3rem 0;
    }
  }
`;

export default GlobalStyles;