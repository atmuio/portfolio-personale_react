// src/components/Layout.js
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Main = styled.main`
  padding-top: 80px; // To account for fixed navbar
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>
        <Container>{children}</Container>
      </Main>
    </>
  );
};

export default Layout;