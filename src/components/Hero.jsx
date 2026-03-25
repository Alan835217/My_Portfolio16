import { motion } from 'framer-motion';
import { Link, ExternalLink, Mail } from 'lucide-react';

const Hero = ({ title, description, github, linkedin, email }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="hero" style={{ textAlign: 'center', alignItems: 'center' }}>
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h1 variants={item} style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '1rem', lineHeight: 1.1 }}>
          I'm <span className="glow-text">{title || 'Your Name'}</span>
        </motion.h1>
        <motion.p variants={item} style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          {description || 'Full Stack Developer & UI/UX Enthusiast'}
        </motion.p>
        <motion.div variants={item} style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <a href="#projects" className="btn-primary" style={{ fontSize: '1.1rem', padding: '15px 40px' }}>Explore My Work</a>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="glass" style={{ padding: '12px', borderRadius: '50%', color: 'var(--text-main)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <Link size={24} title="GitHub" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="glass" style={{ padding: '12px', borderRadius: '50%', color: 'var(--text-main)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                <ExternalLink size={24} title="LinkedIn" />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="glass" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '10px 20px', borderRadius: '30px', color: 'var(--text-main)', textDecoration: 'none', border: '1px solid var(--border-glass)', fontSize: '0.9rem' }}>
                <Mail size={18} /> {email}
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
