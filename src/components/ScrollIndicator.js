// src/components/ScrollIndicator.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;

const ScrollText = styled(motion.p)`
  font-size: 0.9rem;
  color: var(--gray);
  margin-bottom: 1rem;
  font-weight: 500;
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid var(--primary);
  border-radius: 15px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--primary);
    border-radius: 50%;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
  }
`;

const ScrollIndicator = ({ text = "Scorri per altre sezioni", to = null }) => {
  return (
    <ScrollContainer>
      <ScrollText
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {text}
      </ScrollText>
      
      <ScrollIcon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <motion.div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--primary)',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          animate={{
            y: [10, 30, 10],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </ScrollIcon>
    </ScrollContainer>
  );
};

export default ScrollIndicator;