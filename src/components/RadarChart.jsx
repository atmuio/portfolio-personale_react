// RadarChart.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const RadarChart = ({ data }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Define chart center and radius
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    const { labels, datasets } = data;
    const numPoints = labels.length;
    const angleStep = (Math.PI * 2) / numPoints;
    
    // Draw background grid
    drawGrid(ctx, centerX, centerY, radius, numPoints, angleStep);
    
    // Animate the chart
    let progress = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      // Redraw grid each frame
      drawGrid(ctx, centerX, centerY, radius, numPoints, angleStep);
      
      // Draw the dataset
      const currentProgress = Math.min(1, progress);
      drawDataset(ctx, centerX, centerY, radius, numPoints, angleStep, datasets[0], currentProgress);
      
      progress += 0.02;
      
      if (progress <= 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
    
  }, [data]);
  
  const drawGrid = (ctx, centerX, centerY, radius, numPoints, angleStep) => {
    // Draw circles
    const numCircles = 5;
    for (let i = 1; i <= numCircles; i++) {
      const currentRadius = (radius / numCircles) * i;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.stroke();
    }
    
    // Draw axis lines
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.stroke();
      
      // Draw labels
      const labelX = centerX + (radius + 20) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);
      
      ctx.fillStyle = 'var(--dark)';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(data.labels[i], labelX, labelY);
    }
  };
  
  const drawDataset = (ctx, centerX, centerY, radius, numPoints, angleStep, dataset, progress) => {
    const { data, backgroundColor, borderColor } = dataset;
    
    ctx.beginPath();
    
    for (let i = 0; i < numPoints; i++) {
      const value = data[i] / 100; // Normalize to 0-1
      const scaledRadius = radius * value * progress;
      const angle = i * angleStep - Math.PI / 2; // Start from top
      
      const x = centerX + scaledRadius * Math.cos(angle);
      const y = centerY + scaledRadius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    // Close the path
    ctx.closePath();
    
    // Fill the area
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    
    // Stroke the outline
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw data points
    for (let i = 0; i < numPoints; i++) {
      const value = data[i] / 100; // Normalize to 0-1
      const scaledRadius = radius * value * progress;
      const angle = i * angleStep - Math.PI / 2; // Start from top
      
      const x = centerX + scaledRadius * Math.cos(angle);
      const y = centerY + scaledRadius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = dataset.pointBackgroundColor;
      ctx.fill();
    }
  };
  
  return (
    <ChartContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </ChartContainer>
  );
};

const ChartContainer = styled(motion.div)`
  width: 100%;
  height: 400px;
  position: relative;
`;

export default RadarChart;