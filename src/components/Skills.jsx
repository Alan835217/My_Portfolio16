// import { motion } from 'framer-motion';

const Skills = ({ skills }) => {
  return (
    <section id="skills" style={{ textAlign: 'center' }}>
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glow-text"
      >
        Skills & Technologies
      </motion.h2>
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {skills?.map((skill, index) => (
          <motion.div 
            key={index} 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="glass" 
            style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{skill.icon || '🚀'}</div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{skill.name}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
