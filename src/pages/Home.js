// src/pages/Home.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding-top: 2rem;
  padding-bottom: 5rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const Greeting = styled(motion.span)`
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--primary);
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -1.5px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const SubTitle = styled(motion.p)`
  font-size: 1.5rem;
  color: var(--gray);
  margin-bottom: 2.5rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 112, 243, 0.5);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--dark);
  border-radius: 4px;
  font-weight: 600;
  border: 2px solid var(--light-gray);
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const BlurCircle = styled.div`
  position: absolute;
  width: ${props => props.size || '400px'};
  height: ${props => props.size || '400px'};
  border-radius: 50%;
  background: ${props => props.color || 'rgba(0, 112, 243, 0.15)'};
  filter: blur(80px);
  z-index: -1;
  top: ${props => props.top || '-100px'};
  left: ${props => props.left || '-100px'};
  right: ${props => props.right || 'auto'};
  opacity: 0.7;
`;

const Home = () => {
  return (
    <>
      <BlurCircle 
        top="10%" 
        right="10%" 
        color="rgba(109, 40, 217, 0.2)" 
        size="300px" 
      />
      <BlurCircle 
        bottom="10%" 
        left="10%" 
        color="rgba(0, 112, 243, 0.15)" 
        size="450px" 
      />
      
      <HeroSection>
        <HeroContent>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ciao, mi chiamo
          </Greeting>
          
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nome Cognome
          </Title>
          
          <SubTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Sviluppatore web appassionato di creare esperienze digitali
            belle e funzionali
          </SubTitle>
          
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PrimaryButton to="/projects">Vedi Progetti</PrimaryButton>
            <SecondaryButton to="/contact">Contattami</SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>
    </>
  );
};

export default Home;