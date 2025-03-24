// SkillCard.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SkillCard = ({ title, icon, description, skills }) => {
  const tagVariants = {
    initial: { scale: 0 },
    animate: (i) => ({
      scale: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4,
        type: "spring",
        stiffness: 200
      }
    })
  };

  return (
    <Card 
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.12)'
      }}
      transition={{ duration: 0.3 }}
    >
      <IconContainer>
        {icon}
      </IconContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <TagsContainer>
        {skills.map((skill, index) => (
          <Tag 
            key={index}
            custom={index}
            variants={tagVariants}
            initial="initial"
            animate="animate"
          >
            {skill}
          </Tag>
        ))}
      </TagsContainer>
    </Card>
  );
};

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: var(--gray);
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled(motion.span)`
  background: var(--light-gray);
  color: var(--dark);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
`;

export default SkillCard;