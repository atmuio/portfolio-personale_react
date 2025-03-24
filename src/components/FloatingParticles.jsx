// FloatingParticles.jsx
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const FloatingParticles = ({ parentRef, activeField }) => {
  const [particles, setParticles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleTimersRef = useRef([]);
  const requestRef = useRef(null);
  
  useEffect(() => {
    if (parentRef.current) {
      const { width, height } = parentRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
    
    const handleResize = () => {
      if (parentRef.current) {
        const { width, height } = parentRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      particleTimersRef.current.forEach(timer => clearTimeout(timer));
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [parentRef]);
  
  // Create new particles when activeField changes
  useEffect(() => {
    if (!activeField) return;
    
    // Create new particles
    const createParticle = () => {
      if (!dimensions.width || !dimensions.height) return;
      
      const getFieldPosition = () => {
        const formElements = parentRef.current.querySelectorAll('input, textarea');
        let activeElement = null;
        
        formElements.forEach(el => {
          if (el.name === activeField) {
            activeElement = el;
          }
        });
        
        if (!activeElement) return { x: dimensions.width / 2, y: dimensions.height / 2 };
        
        const rect = activeElement.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();
        
        return {
          x: rect.left - parentRect.left + Math.random() * rect.width,
          y: rect.top - parentRect.top + Math.random() * rect.height / 2 + rect.height / 2
        };
      };
      
      const { x, y } = getFieldPosition();
      
      const fieldColors = {
        name: '#0070f3',
        email: '#6d28d9',
        subject: '#00c58e',
        message: '#ff4081'
      };
      
      const newParticle = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: Math.random() * 6 + 4,
        color: fieldColors[activeField] || '#0070f3',
        velocity: {
          x: (Math.random() - 0.5) * 1.5,
          y: (Math.random() - 0.5) * 1.5
        },
        opacity: Math.random() * 0.6 + 0.2,
        lifetime: Math.random() * 3000 + 2000
      };
      
      setParticles(prevParticles => [...prevParticles, newParticle]);
      
      // Remove particle after its lifetime
      const timerId = setTimeout(() => {
        setParticles(prevParticles => 
          prevParticles.filter(p => p.id !== newParticle.id)
        );
      }, newParticle.lifetime);
      
      particleTimersRef.current.push(timerId);
    };
    
    // Create a particle every 200ms
    const interval = setInterval(createParticle, 200);
    
    // Start with a few particles
    for (let i = 0; i < 5; i++) {
      createParticle();
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [activeField, dimensions, parentRef]);
  
  // Animate particles
  useEffect(() => {
    if (!particles.length) return;
    
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update position
          let newX = particle.x + particle.velocity.x;
          let newY = particle.y + particle.velocity.y;
          
          // Bounce off walls
          let newVelocityX = particle.velocity.x;
          let newVelocityY = particle.velocity.y;
          
          if (newX <= 0 || newX >= dimensions.width) {
            newVelocityX = -newVelocityX;
          }
          
          if (newY <= 0 || newY >= dimensions.height) {
            newVelocityY = -newVelocityY;
          }
          
          // Apply small random movement
          newVelocityX += (Math.random() - 0.5) * 0.1;
          newVelocityY += (Math.random() - 0.5) * 0.1;
          
          // Constrain velocity
          const maxVelocity = 2;
          newVelocityX = Math.max(Math.min(newVelocityX, maxVelocity), -maxVelocity);
          newVelocityY = Math.max(Math.min(newVelocityY, maxVelocity), -maxVelocity);
          
          return {
            ...particle,
            x: newX,
            y: newY,
            velocity: {
              x: newVelocityX,
              y: newVelocityY
            }
          };
        })
      );
      
      requestRef.current = requestAnimationFrame(animateParticles);
    };
    
    requestRef.current = requestAnimationFrame(animateParticles);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [particles, dimensions]);
  
  return (
    <ParticlesContainer>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </ParticlesContainer>
  );
};

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const Particle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default FloatingParticles;