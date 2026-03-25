import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';

const Home = ({ onAdminClick, theme, toggleTheme }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/content?t=${Date.now()}`);
        setContent(res.data);
      } catch (err) {
        console.error('Error fetching content', err);
      }
    };
    fetchContent();
  }, []);

  if (!content) return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)', color: 'var(--text-main)' }}>Loading Portfolio...</div>;

  // Use settings from content if available, fallback to showing all
  const displaySettings = content.settings || { show_about: true, show_skills: true, show_projects: true, show_education: true };

  return (
    <>
      <Navbar onAdminClick={onAdminClick} theme={theme} toggleTheme={toggleTheme} settings={displaySettings} />
      {displaySettings.show_about && (
        <Hero 
          title={content.about?.title} 
          description={content.about?.description} 
          github={content.about?.github}
          linkedin={content.about?.linkedin}
          email={content.about?.email}
        />
      )}
      {displaySettings.show_skills && <Skills skills={content.skills} />}
      {displaySettings.show_projects && <Projects projects={content.projects} />}
      {displaySettings.show_education && <Education education={content.education} />}
      
      <footer style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-color)' }}>
        <p>&copy; 2026 Portfolio. Built with React & Node.</p>
      </footer>
    </>
  );
};

export default Home;
