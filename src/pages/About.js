// src/pages/About.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const SectionHeader = styled(motion.div)`
  margin-bottom: 4rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  display: inline-block;
  font-size: 2.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 4px;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, var(--primary), var(--secondary));
    border-radius: 2px;
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProfileImage = styled(motion.div)`
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid var(--primary);
    border-radius: 8px;
    top: 20px;
    left: 20px;
    z-index: 0;
  }
`;

const AboutContent = styled(motion.div)`
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: var(--dark);
  }
  
  p {
    margin-bottom: 1.5rem;
    color: var(--gray);
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    font-size: 2.5rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  
  p {
    margin-bottom: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--gray);
  }
`;

const About = () => {
  return (
    <AboutSection>
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>Chi Sono</SectionTitle>
      </SectionHeader>
      
      <AboutGrid>
        <ProfileImage
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src="https://via.placeholder.com/600x700" 
            alt="Profile" 
          />
        </ProfileImage>
        
        <AboutContent
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3>Sviluppatore Web appassionato con un occhio al design</h3>
          <p>
            Benvenuto nel mio portfolio! Sono uno sviluppatore web con una passione
            per la creazione di applicazioni web eleganti e funzionali.
            La mia esperienza va dalla progettazione dell'interfaccia utente
            all'implementazione delle funzionalità di backend.
          </p>
          <p>
            Il mio approccio combina creatività, attenzione ai dettagli e una
            forte etica del lavoro. Amo risolvere problemi complessi e creare
            esperienze utente intuitive e piacevoli.
          </p>
          
          <StatsGrid>
            <StatItem
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4>3+</h4>
              <p>Anni di esperienza</p>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4>20+</h4>
              <p>Progetti completati</p>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4>10+</h4>
              <p>Clienti soddisfatti</p>
            </StatItem>
          </StatsGrid>
        </AboutContent>
      </AboutGrid>
    </AboutSection>
  );
};

export default About;