// src/components/AnimatedBackground.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: -1;
  opacity: 0.4;
`;

const Particle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color || 'var(--primary)'};
  opacity: ${props => props.opacity || 0.3};
`;

const AnimatedBackground = () => {
  // Genera particelle casuali
  const particles = Array.from({ length: 15 }).map((_, index) => {
    const size = Math.random() * 100 + 30;
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100;
    const delay = Math.random() * 5;
    
    // Alterna tra colori primari e secondari
    const color = index % 2 === 0 
      ? 'linear-gradient(135deg, rgba(0, 112, 243, 0.4), rgba(0, 112, 243, 0.1))' 
      : 'linear-gradient(135deg, rgba(109, 40, 217, 0.4), rgba(109, 40, 217, 0.1))';
    
    // Diverse durate per far sembrare il movimento più naturale
    const duration = 20 + Math.random() * 10;
    
    return { size, xPos, yPos, color, delay, duration, id: index };
  });

  return (
    <BackgroundContainer>
      {particles.map(particle => (
        <Particle
          key={particle.id}
          color={particle.color}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.xPos}%`,
            top: `${particle.yPos}%`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: particle.duration,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1],
            repeat: Infinity,
            delay: particle.delay
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default AnimatedBackground;