// DynamicShape.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DynamicShape = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const pointsRef = useRef([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Set up the canvas dimensions
    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Create points
      const numPoints = 10;
      pointsRef.current = [];
      
      for (let i = 0; i < numPoints; i++) {
        pointsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          originX: Math.random() * width,
          originY: Math.random() * height,
          velocityX: Math.random() * 2 - 1,
          velocityY: Math.random() * 2 - 1,
          size: Math.random() * 10 + 5,
          color: `hsl(${Math.random() * 180 + 180}, 80%, 60%)`,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };
    
    // Handle window resize
    const handleResize = () => {
      setupCanvas();
    };
    
    // Draw the blob
    const drawBlob = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update points
      pointsRef.current.forEach((point, index) => {
        // Move points
        point.x += point.velocityX;
        point.y += point.velocityY;
        
        // Apply gravitational pull back to origin
        const dx = point.originX - point.x;
        const dy = point.originY - point.y;
        point.velocityX += dx * 0.003;
        point.velocityY += dy * 0.003;
        
        // Apply friction
        point.velocityX *= 0.98;
        point.velocityY *= 0.98;
        
        // Bounce off edges with some margin
        const margin = 100;
        if (point.x < -margin || point.x > width + margin) {
          point.velocityX = -point.velocityX;
        }
        if (point.y < -margin || point.y > height + margin) {
          point.velocityY = -point.velocityY;
        }
      });
      
      // Draw primary blob
      drawSingleBlob(ctx, pointsRef.current, width, height, 0.7);
      
      // Request next frame
      requestRef.current = requestAnimationFrame(drawBlob);
    };
    
    setupCanvas();
    window.addEventListener('resize', handleResize);
    
    // Start the animation
    requestRef.current = requestAnimationFrame(drawBlob);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  
  // Draw a single blob
  const drawSingleBlob = (ctx, points, width, height, opacity) => {
      // Create gradient for background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(0, 112, 243, 0.05)');
      gradient.addColorStop(0.5, 'rgba(109, 40, 217, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 197, 142, 0.05)');
      
      // Draw background shape
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Create a smooth curve through the points
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 0; i < points.length; i++) {
        const currentPoint = points[i];
        const nextPoint = points[(i + 1) % points.length];
        
        // Calculate control points for smooth curve
        const cpX1 = currentPoint.x + (nextPoint.x - currentPoint.x) * 0.4;
        const cpY1 = currentPoint.y + (nextPoint.y - currentPoint.y) * 0.4;
        const cpX2 = nextPoint.x - (nextPoint.x - currentPoint.x) * 0.4;
        const cpY2 = nextPoint.y - (nextPoint.y - currentPoint.y) * 0.4;
        
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, nextPoint.x, nextPoint.y);
      }
      
      ctx.closePath();
      ctx.fill();
      
      // Draw points with glow
      points.forEach(point => {
        // Inner glow
        const gradientGlow = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.size * 2
        );
        gradientGlow.addColorStop(0, `rgba(255, 255, 255, ${point.opacity})`);
        gradientGlow.addColorStop(0.5, `rgba(255, 255, 255, ${point.opacity * 0.5})`);
        gradientGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradientGlow;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * 2, 0, Math.PI * 2);
        ctx.fill();
            });
    };
  
  return (
    <ShapeCanvas
      ref={canvasRef}
      as={motion.canvas}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};

const ShapeCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export default DynamicShape;