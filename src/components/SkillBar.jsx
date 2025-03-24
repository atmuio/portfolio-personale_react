// SkillBar.jsx
import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const SkillBar = ({ name, level, category }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'frontend':
        return 'var(--primary)';
      case 'design':
        return 'var(--secondary)';
      case 'mobile':
        return '#00c58e';
      default:
        return 'var(--gray)';
    }
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${level}%`,
      transition: { 
        duration: 1, 
        ease: "easeInOut" 
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.7 }
    }
  };

  return (
    <SkillBarContainer ref={ref}>
      <SkillInfo>
        <SkillName>{name}</SkillName>
        <SkillLevel
          variants={numberVariants}
          initial="hidden"
          animate={controls}
        >
          {level}%
        </SkillLevel>
      </SkillInfo>
      <BarContainer>
        <Bar
          variants={barVariants}
          initial="hidden"
          animate={controls}
          style={{ 
            background: `linear-gradient(90deg, ${getCategoryColor(category)}, ${getCategoryColor(category)}dd)`
          }}
        />
      </BarContainer>
    </SkillBarContainer>
  );
};

const SkillBarContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.h4`
  font-size: 1.1rem;
  margin: 0;
  font-weight: 600;
`;

const SkillLevel = styled(motion.span)`
  font-weight: 700;
  color: var(--primary);
`;

const BarContainer = styled.div`
  height: 10px;
  background-color: var(--light-gray);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Bar = styled(motion.div)`
  height: 100%;
  border-radius: 5px;
`;

export default SkillBar;