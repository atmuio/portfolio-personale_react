// Contact.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaCheckCircle
} from 'react-icons/fa';
import Layout from '../components/Layout';
import FloatingParticles from '../components/FloatingParticles';
import DynamicShape from '../components/DynamicShape';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [currentParticle, setCurrentParticle] = useState(null);
  const formRef = useRef(null);
  const controls = useAnimation();
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      controls.start("success");
      setSubmitted(true);
      
      // Reset form after some time
      setTimeout(() => {
        setSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        controls.start("visible");
      }, 5000);
    }, 1000);
  };
  
  const handleFocus = (fieldName) => {
    setCurrentParticle(fieldName);
  };
  
  const handleBlur = () => {
    setCurrentParticle(null);
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    success: {
      scale: 0.8,
      opacity: 0,
      y: -50,
      transition: { duration: 0.5 }
    }
  };
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  };
  
  const contactInfoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5, 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const socialVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };
  
  const socialItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200
      }
    },
    hover: { 
      y: -5, 
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  // Start the animations when component mounts
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <Layout>
      <ContactSection>
        <DynamicShape />
        
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Contattami</SectionTitle>
          <SectionSubtitle>
            Hai un progetto in mente? Mettiamoci in contatto!
          </SectionSubtitle>
        </SectionHeader>
        
        <ContactContainer>
          <ContactInfoContainer
            variants={contactInfoVariants}
            initial="hidden"
            animate="visible"
          >
            <ContactInfo>
              <ContactInfoHeader>Informazioni di Contatto</ContactInfoHeader>
              <ContactInfoText>
                Sono disponibile per progetti freelance, collaborazioni o opportunità lavorative.
                Non esitare a contattarmi!
              </ContactInfoText>
              
              <ContactDetailsList>
                <ContactDetail variants={contactItemVariants}>
                  <ContactDetailIcon>
                    <FaEnvelope />
                  </ContactDetailIcon>
                  <div>
                    <ContactDetailLabel>Email</ContactDetailLabel>
                    <ContactDetailValue>esempio@tuodominio.com</ContactDetailValue>
                  </div>
                </ContactDetail>
                
                <ContactDetail variants={contactItemVariants}>
                  <ContactDetailIcon>
                    <FaPhoneAlt />
                  </ContactDetailIcon>
                  <div>
                    <ContactDetailLabel>Telefono</ContactDetailLabel>
                    <ContactDetailValue>+39 123 456 7890</ContactDetailValue>
                  </div>
                </ContactDetail>
                
                <ContactDetail variants={contactItemVariants}>
                  <ContactDetailIcon>
                    <FaMapMarkerAlt />
                  </ContactDetailIcon>
                  <div>
                    <ContactDetailLabel>Località</ContactDetailLabel>
                    <ContactDetailValue>Milano, Italia</ContactDetailValue>
                  </div>
                </ContactDetail>
              </ContactDetailsList>
              
              <SocialLinksContainer
                variants={socialVariants}
                initial="hidden"
                animate="visible"
              >
                <SocialLink 
                  href="https://github.com/" 
                  target="_blank"
                  variants={socialItemVariants}
                  whileHover="hover"
                >
                  <FaGithub />
                </SocialLink>
                <SocialLink 
                  href="https://linkedin.com/" 
                  target="_blank"
                  variants={socialItemVariants}
                  whileHover="hover"
                >
                  <FaLinkedin />
                </SocialLink>
                <SocialLink 
                  href="https://twitter.com/" 
                  target="_blank"
                  variants={socialItemVariants}
                  whileHover="hover"
                >
                  <FaTwitter />
                </SocialLink>
              </SocialLinksContainer>
            </ContactInfo>
          </ContactInfoContainer>
          
          <ContactFormContainer>
            <AnimatePresence>
              {!submitted ? (
                <ContactFormWrapper
                  ref={formRef}
                  variants={formVariants}
                  initial="hidden"
                  animate={controls}
                  exit="success"
                  key="form"
                >
                  <FloatingParticles 
                    parentRef={formRef} 
                    activeField={currentParticle}
                  />
                  
                  <ContactForm onSubmit={handleSubmit}>
                    <FormRow>
                      <FormGroup>
                        <FormLabel>Nome</FormLabel>
                        <FormInput
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          required
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          required
                        />
                      </FormGroup>
                    </FormRow>
                    
                    <FormGroup>
                      <FormLabel>Oggetto</FormLabel>
                      <FormInput
                        type="text"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={handleBlur}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel>Messaggio</FormLabel>
                      <FormTextarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        rows="5"
                        required
                      />
                    </FormGroup>
                    
                    <SubmitButton
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Invia Messaggio
                    </SubmitButton>
                  </ContactForm>
                </ContactFormWrapper>
              ) : (
                <SuccessMessage
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  key="success"
                >
                  <SuccessIcon>
                    <FaCheckCircle />
                  </SuccessIcon>
                  <SuccessTitle>Messaggio Inviato!</SuccessTitle>
                  <SuccessText>
                    Grazie per avermi contattato! Ti risponderò il prima possibile.
                  </SuccessText>
                </SuccessMessage>
              )}
            </AnimatePresence>
          </ContactFormContainer>
        </ContactContainer>
      </ContactSection>
    </Layout>
  );
};

// Stili
const ContactSection = styled.section`
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfoContainer = styled(motion.div)`
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 968px) {
    margin-bottom: 2rem;
  }
`;

const ContactInfo = styled.div`
  padding: 3rem;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContactInfoHeader = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const ContactInfoText = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  opacity: 0.9;
`;

const ContactDetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ContactDetail = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const ContactDetailIcon = styled.div`
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContactDetailLabel = styled.h4`
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 0.3rem;
  opacity: 0.8;
`;

const ContactDetailValue = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const SocialLinksContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const SocialLink = styled(motion.a)`
  width: 3rem;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ContactFormContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactFormWrapper = styled(motion.div)`
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  position: relative;
  overflow: hidden;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  z-index: 2;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--dark);
`;

const formFieldStyles = `
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid var(--light-gray);
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: white;
  
  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.2);
    outline: none;
  }
`;

const FormInput = styled.input`
  ${formFieldStyles}
`;

const FormTextarea = styled.textarea`
  ${formFieldStyles}
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }
`;

const SuccessMessage = styled(motion.div)`
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 5rem;
  color: #4BB543;
  margin-bottom: 1.5rem;
`;

const SuccessTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--dark);
`;

const SuccessText = styled.p`
  font-size: 1.2rem;
  color: var(--gray);
  max-width: 400px;
`;

export default Contact;