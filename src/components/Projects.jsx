// import { motion } from 'framer-motion';

const Projects = ({ projects }) => {
  return (
    <section id="projects" style={{ textAlign: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glow-text"
      >
        Featured Projects
      </motion.h2>
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {projects?.map((project, index) => (
          <motion.div 
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 }
            }}
            whileHover={{ y: -15 }}
            className="glass" 
            style={{ padding: '2rem', textAlign: 'left' }}
          >
            <div style={{ height: '220px', background: 'linear-gradient(45deg, #121212, #222)', borderRadius: '15px', marginBottom: '2rem' }}></div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', minHeight: '60px' }}>{project.description}</p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {project.tech_stack?.split(',').map((tech, idx) => (
                <span key={idx} style={{ padding: '5px 12px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '25px', fontSize: '0.7rem', fontWeight: 600 }}>
                  {tech.trim()}
                </span>
              ))}
            </div>
            <button className="btn-primary" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'none' }}>Case Study</button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
