import { motion } from 'framer-motion';

const Education = ({ education }) => {
  return (
    <section id="education" style={{ textAlign: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glow-text"
      >
        Academic Journey
      </motion.h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {education?.map((edu, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="glass" 
            style={{
              padding: '3rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ 
              position: 'absolute', 
              top: '0', 
              left: '0', 
              width: '4px', 
              height: '100%', 
              background: 'linear-gradient(to bottom, var(--primary-glow), var(--secondary-glow))' 
            }}></div>
            <div style={{ fontSize: '1rem', color: 'var(--primary-glow)', fontWeight: 800, letterSpacing: '2px' }}>{edu.year}</div>
            <h3 style={{ fontSize: '2.2rem', lineHeight: 1.2 }}>{edu.degree}</h3>
            <div style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{edu.institution}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{edu.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
