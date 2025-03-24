// src/pages/Projects.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import ParallaxCard from '../components/ParallaxCard';
import ScrollIndicator from '../components/ScrollIndicator';

const ProjectsSection = styled.section`
  padding-top: 5rem;
  padding-bottom: 5rem;
  position: relative;
  overflow: hidden;
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

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(90deg, var(--primary), var(--secondary))' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--gray)'};
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: ${props => props.active ? '0 10px 15px -3px rgba(0, 112, 243, 0.2)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    .project-image img {
      transform: scale(1.05);
    }
    
    .overlay {
      opacity: 0.9;
    }
    
    .project-content {
      transform: translateY(0);
    }
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0.5;
  transition: opacity 0.3s ease;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  position: relative;
  background: white;
  transition: transform 0.3s ease;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: var(--gray);
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const ProjectTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ProjectTag = styled.span`
  font-size: 0.75rem;
  padding: 0.3rem 0.7rem;
  background: ${props => props.color || 'rgba(0, 112, 243, 0.1)'};
  color: ${props => props.textColor || 'var(--primary)'};
  border-radius: 30px;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
`;

const ProjectLink = styled.a`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    transform: translateX(3px);
  }
`;

// Animazioni
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

// Dati di esempio per i progetti
const projectsData = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "Dashboard interattiva per la gestione di un e-commerce con analisi delle vendite e monitoraggio degli ordini.",
    image: "https://via.placeholder.com/600x400",
    category: "web",
    tags: [
      { name: "React", color: "rgba(97, 218, 251, 0.2)", textColor: "#0d8bbd" },
      { name: "Node.js", color: "rgba(104, 159, 56, 0.2)", textColor: "#3c873a" },
      { name: "MongoDB", color: "rgba(76, 175, 80, 0.2)", textColor: "#4DB33D" }
    ],
    liveLink: "#",
    codeLink: "#"
  },
  {
    id: 2,
    title: "App Meteo",
    description: "Applicazione per visualizzare le previsioni meteo in tempo reale con dati da API OpenWeatherMap.",
    image: "https://via.placeholder.com/600x400",
    category: "mobile",
    tags: [
      { name: "React Native", color: "rgba(97, 218, 251, 0.2)", textColor: "#0d8bbd" },
      { name: "Redux", color: "rgba(118, 74, 188, 0.2)", textColor: "#764abc" }
    ],
    liveLink: "#",
    codeLink: "#"
  },
  {
    id: 3,
    title: "Portfolio Creativo",
    description: "Portfolio per un fotografo con galleria di immagini e sistema di filtro per categoria.",
    image: "https://via.placeholder.com/600x400",
    category: "design",
    tags: [
      { name: "HTML5", color: "rgba(228, 77, 38, 0.2)", textColor: "#E44D26" },
      { name: "CSS3", color: "rgba(33, 150, 243, 0.2)", textColor: "#264de4" },
      { name: "JavaScript", color: "rgba(247, 223, 30, 0.2)", textColor: "#f0db4f" }
    ],
    liveLink: "#",
    codeLink: "#"
  },
  {
    id: 4,
    title: "Social Network",
    description: "Piattaforma di social network con funzionalità di condivisione contenuti e messaggistica in tempo reale.",
    image: "https://via.placeholder.com/600x400",
    category: "web",
    tags: [
      { name: "React", color: "rgba(97, 218, 251, 0.2)", textColor: "#0d8bbd" },
      { name: "Firebase", color: "rgba(255, 160, 0, 0.2)", textColor: "#F57C00" },
      { name: "GraphQL", color: "rgba(225, 0, 152, 0.2)", textColor: "#e10098" }
    ],
    liveLink: "#",
    codeLink: "#"
  },
  {
    id: 5,
    title: "App di Fitness",
    description: "Applicazione per il tracciamento dell'attività fisica con programmi di allenamento personalizzati.",
    image: "https://via.placeholder.com/600x400",
    category: "mobile",
    tags: [
      { name: "Flutter", color: "rgba(66, 165, 245, 0.2)", textColor: "#027DFD" },
      { name: "Firebase", color: "rgba(255, 160, 0, 0.2)", textColor: "#F57C00" }
    ],
    liveLink: "#",
    codeLink: "#"
  },
  {
    id: 6,
    title: "UI Kit",
    description: "Libreria di componenti UI riutilizzabili per lo sviluppo di applicazioni web moderne.",
    image: "https://via.placeholder.com/600x400",
    category: "design",
    tags: [
      { name: "React", color: "rgba(97, 218, 251, 0.2)", textColor: "#0d8bbd" },
      { name: "Styled Components", color: "rgba(219, 112, 147, 0.2)", textColor: "#DB7093" }
    ],
    liveLink: "#",
    codeLink: "#"
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  
  const handleFilterChange = (newFilter) => {
    setIsFiltering(true);
    setTimeout(() => {
      setFilter(newFilter);
      setIsFiltering(false);
    }, 300);
  };
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  return (
    <ProjectsSection>
      <AnimatedBackground />
      <SectionHeader
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionTitle>I Miei Progetti</SectionTitle>
      </SectionHeader>
      
      <FilterContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => handleFilterChange('all')}
        >
          Tutti
        </FilterButton>
        <FilterButton 
          active={filter === 'web'} 
          onClick={() => handleFilterChange('web')}
        >
          Web App
        </FilterButton>
        <FilterButton 
          active={filter === 'mobile'} 
          onClick={() => handleFilterChange('mobile')}
        >
          Mobile App
        </FilterButton>
        <FilterButton 
          active={filter === 'design'} 
          onClick={() => handleFilterChange('design')}
        >
          Design
        </FilterButton>
      </FilterContainer>
      
      <ProjectsGrid
        variants={containerVariants}
        initial="hidden"
        animate={isFiltering ? "hidden" : "visible"}
        key={filter} // Rianimazione quando cambia il filtro
      >
        {filteredProjects.map(project => (
          <motion.div
            key={project.id}
            variants={itemVariants}
          >
            <ParallaxCard sensitivity={10}>
              <ProjectCard>
                <ProjectImageContainer className="project-image">
                  <img src={project.image} alt={project.title} />
                  <ProjectOverlay className="overlay" />
                </ProjectImageContainer>
                
                <ProjectContent className="project-content">
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <ProjectTags>
                    {project.tags.map((tag, index) => (
                      <ProjectTag 
                        key={index}
                        color={tag.color}
                        textColor={tag.textColor}
                      >
                        {tag.name}
                      </ProjectTag>
                    ))}
                  </ProjectTags>
                  
                  <ProjectLinks>
                    <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      Demo live
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ProjectLink>
                    
                    <ProjectLink href={project.codeLink} target="_blank" rel="noopener noreferrer">
                      Codice
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 3L4 7L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 3L20 7L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 21L14 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            </ParallaxCard>
          </motion.div>
        ))}
      </ProjectsGrid>
      
      <ScrollIndicator text="Scorri per vedere i contatti" />
    </ProjectsSection>
  );
};

export default Projects;