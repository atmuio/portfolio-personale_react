// Skills.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaPalette, FaMobileAlt } from 'react-icons/fa';
import Layout from '../components/Layout';
import SkillBar from '../components/SkillBar';
import SkillCard from '../components/SkillCard';
import RadarChart from '../components/RadarChart';
import AnimatedBackground from '../components/AnimatedBackground';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Tutte', icon: <FaCode /> },
    { id: 'frontend', name: 'Frontend', icon: <FaLaptopCode /> },
    { id: 'design', name: 'Design', icon: <FaPalette /> },
    { id: 'mobile', name: 'Mobile', icon: <FaMobileAlt /> },
  ];
  
  const skills = [
    { id: 1, name: 'React', level: 90, category: 'frontend' },
    { id: 2, name: 'JavaScript', level: 85, category: 'frontend' },
    { id: 3, name: 'CSS/SASS', level: 80, category: 'frontend' },
    { id: 4, name: 'UI/UX Design', level: 75, category: 'design' },
    { id: 5, name: 'Responsive Design', level: 85, category: 'design' },
    { id: 6, name: 'React Native', level: 70, category: 'mobile' },
    { id: 7, name: 'Node.js', level: 65, category: 'frontend' },
    { id: 8, name: 'GraphQL', level: 60, category: 'frontend' },
  ];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);
  
  const radarData = {
    labels: ['React', 'JavaScript', 'CSS', 'UI/UX', 'Mobile', 'Backend'],
    datasets: [
      {
        data: [90, 85, 80, 75, 70, 65],
        backgroundColor: 'rgba(0, 112, 243, 0.2)',
        borderColor: 'var(--primary)',
        pointBackgroundColor: 'var(--primary)',
      }
    ]
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout>
      <SkillsSection>
        <AnimatedBackground />
        
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Le Mie Competenze</SectionTitle>
          <SectionSubtitle>
            Tecnologie e strumenti con cui mi piace lavorare
          </SectionSubtitle>
        </SectionHeader>

        <CategoryFilter>
          {categories.map(category => (
            <CategoryButton
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="icon">{category.icon}</span>
              <span className="text">{category.name}</span>
            </CategoryButton>
          ))}
        </CategoryFilter>

        <SkillsGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredSkills.map(skill => (
            <motion.div key={skill.id} variants={itemVariants}>
              <SkillBar 
                name={skill.name} 
                level={skill.level} 
                category={skill.category} 
              />
            </motion.div>
          ))}
        </SkillsGrid>

        <SectionDivider />

        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionTitle>Aree di Competenza</SectionTitle>
          <SectionSubtitle>
            Visualizzazione delle mie principali aree di expertise
          </SectionSubtitle>
        </SectionHeader>

        <ChartsContainer>
          <ChartWrapper>
            <RadarChart data={radarData} />
          </ChartWrapper>
          
          <SkillCardsContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <SkillCard 
                title="Frontend Development" 
                icon={<FaLaptopCode />}
                description="Sviluppo di interfacce moderne e responsive con React, JavaScript e CSS"
                skills={["React", "Redux", "JavaScript", "CSS/SASS"]}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <SkillCard 
                title="UI/UX Design" 
                icon={<FaPalette />}
                description="Creazione di esperienze utente intuitive e design accattivanti"
                skills={["Figma", "Adobe XD", "Responsive Design", "Prototyping"]}
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <SkillCard 
                title="Mobile Development" 
                icon={<FaMobileAlt />}
                description="Sviluppo di applicazioni mobile cross-platform con React Native"
                skills={["React Native", "Expo", "Mobile UI", "App Publishing"]}
              />
            </motion.div>
          </SkillCardsContainer>
        </ChartsContainer>
      </SkillsSection>
    </Layout>
  );
};

// Stili
const SkillsSection = styled.section`
  position: relative;
  padding: 5rem 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SectionHeader = styled(motion.div)`
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  z-index: 1;
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  color: var(--gray);
  font-size: 1.2rem;
  max-width: 700px;
  margin: 1rem auto 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? 'linear-gradient(90deg, var(--primary), var(--secondary))' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--dark)'};
  border-radius: 30px;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  .icon {
    font-size: 1.2rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionDivider = styled.div`
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--light-gray), transparent);
  margin: 5rem 0;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ChartWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkillCardsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export default Skills;