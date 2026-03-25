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
        const res = await axios.get(`/api/content?t=${Date.now()}`);
        setContent(res.data);
      } catch (err) {
        console.error('Error fetching content', err);
      }
    };
    fetchContent();
  }, []);

  if (!content) return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-color)', color: 'var(--text-main)', flexDirection: 'column' }}>
    <p>Loading Portfolio...</p>
    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>Make sure backend is running on port 5000</p>
  </div>;

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
      

    </>
  );
};

export default Home;
