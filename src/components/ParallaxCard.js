// src/components/ParallaxCard.js
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CardContainer = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12);
  }
`;

const CardContent = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 12px;
  overflow: hidden;
`;

const ParallaxCard = ({ children, sensitivity = 20 }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth springs for motion values
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  
  // Transform x and y values to rotation values
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [sensitivity, -sensitivity]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-sensitivity, sensitivity]);
  
  // Card hover scale
  const scale = useSpring(1, springConfig);
  
  // Handle mouse movement on card
  const handleMouseMove = (event) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate normalized mouse position (between -0.5 and 0.5)
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };
  
  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.03);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
  };
  
  return (
    <CardContainer
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        scale
      }}
    >
      <CardContent
        style={{
          rotateX,
          rotateY,
          z: 100
        }}
      >
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default ParallaxCard;