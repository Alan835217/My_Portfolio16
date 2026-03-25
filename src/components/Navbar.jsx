import React from 'react';
import { Menu, X, LogIn, Sun, Moon } from 'lucide-react';

const Navbar = ({ onAdminClick, theme, toggleTheme, settings }) => {
  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      zIndex: 1000,
      padding: '0.8rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="glow-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>PORTFOLIO</div>
      
      <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {settings?.show_about && <a href="#hero" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>About</a>}
        {settings?.show_skills && <a href="#skills" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Skills</a>}
        {settings?.show_projects && <a href="#projects" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Projects</a>}
        {settings?.show_education && <a href="#education" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Education</a>}
        
        <button onClick={toggleTheme} style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--text-main)', 
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center'
        }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button onClick={onAdminClick} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <LogIn size={16} /> Admin
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
