import React, { useState, useEffect } from 'react';
import { Plus, Trash2, LogOut, Eye, EyeOff, Save, Sun, Moon, CheckCircle } from 'lucide-react';

const AdminDashboard = ({ onLogout, theme, toggleTheme }) => {
  console.log("--- ADMIN V4 (BATTLE-TESTED) LOADED ---");
  const [content, setContent] = useState(null);
  const [aboutForm, setAboutForm] = useState({ title: '', description: '', github: '', linkedin: '', email: '' });
  const [newSkill, setNewSkill] = useState({ name: '', category: '', icon: '🚀' });
  const [newProject, setNewProject] = useState({ title: '', description: '', tech_stack: '', link: '' });
  const [newEdu, setNewEdu] = useState({ degree: '', institution: '', year: '', description: '' });
  const [saveStatus, setSaveStatus] = useState('');

  const API_BASE = '/api';

  const fetchContent = async () => {
    try {
      const res = await fetch(`${API_BASE}/content?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data) {
        setContent(data);
        if (data.about) {
          setAboutForm({ 
            title: data.about.title || '', 
            description: data.about.description || '',
            github: data.about.github || '',
            linkedin: data.about.linkedin || '',
            email: data.about.email || ''
          });
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleToggle = async (key, currentVal) => {
    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: !currentVal })
      });
      fetchContent();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAbout = async () => {
    try {
      await fetch(`${API_BASE}/update-about`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutForm)
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
      fetchContent();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkill = async () => {
    await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSkill)
    });
    setNewSkill({ name: '', category: '', icon: '🚀' });
    fetchContent();
  };

  const handleAddProject = async () => {
    await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    });
    setNewProject({ title: '', description: '', tech_stack: '', link: '' });
    fetchContent();
  };

  const handleAddEdu = async () => {
    await fetch(`${API_BASE}/education`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEdu)
    });
    setNewEdu({ degree: '', institution: '', year: '', description: '' });
    fetchContent();
  };

  const deleteItem = async (type, id) => {
    await fetch(`${API_BASE}/${type}/${id}`, { method: 'DELETE' });
    fetchContent();
  };

  if (!content) return <div style={{ background: '#0a0a0a', color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Admin Control...</div>;

  return (
    <div style={{ padding: '2rem 5%', background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-main)', transition: 'background 0.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'sticky', top: 0, background: 'var(--bg-color)', zIndex: 100, padding: '1.5rem 0', borderBottom: '1px solid var(--border-glass)' }}>
        <h1 className="glow-text" style={{ margin: 0 }}>Portfolio OS / Admin</h1>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="glass" style={{ padding: '12px', color: 'var(--text-main)', border: '1px solid var(--border-glass)', cursor: 'pointer', borderRadius: '12px' }}>
            {theme === 'dark' ? <Sun size={22} color="#ffcc00" /> : <Moon size={22} color="#555" />}
          </button>
          <button onClick={onLogout} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '12px 24px' }}>
            <LogOut size={20} /> Exit Admin
          </button>
        </div>
      </div>

      {/* FIXED VISIBILITY CONTAINER */}
      <div className="glass" style={{ padding: '2rem', marginBottom: '3rem', background: 'rgba(0,0,0,0.5)', borderRadius: '20px', border: '2px solid #00ff88' }}>
        <h4 style={{ color: '#00ff88', marginBottom: '1.5rem', letterSpacing: '2px' }}>DASHBOARD CONTROLS / SECTION VISIBILITY</h4>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {content.settings && Object.entries(content.settings).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>{key.replace('show_', '').toUpperCase()}</span>
              <button 
                onClick={() => handleToggle(key, val)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: val ? '#00ff88' : '#ff4444', transition: 'transform 0.2s', display: 'flex', alignItems: 'center' }}
              >
                {val ? <Eye size={32} /> : <EyeOff size={32} />}
              </button>
            </div>
          ))}
          {(!content.settings || Object.keys(content.settings).length === 0) && (
            <div style={{ color: '#ffcc00' }}>⚠️ Settings loading...</div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
        <div className="glass" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>About Me</h3>
            {saveStatus === 'saved' && <span style={{ color: '#00ff88', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={16} /> Saved</span>}
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <input placeholder="Title / Role" className="glass" style={{ padding: '14px', color: 'inherit', width: '100%' }} value={aboutForm.title} onChange={e => setAboutForm({...aboutForm, title: e.target.value})} />
            <textarea placeholder="Bio / Description" className="glass" style={{ padding: '14px', color: 'inherit', width: '100%', minHeight: '120px' }} value={aboutForm.description} onChange={e => setAboutForm({...aboutForm, description: e.target.value})} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input placeholder="GitHub URL" className="glass" style={{ padding: '12px', color: 'inherit' }} value={aboutForm.github} onChange={e => setAboutForm({...aboutForm, github: e.target.value})} />
              <input placeholder="LinkedIn URL" className="glass" style={{ padding: '12px', color: 'inherit' }} value={aboutForm.linkedin} onChange={e => setAboutForm({...aboutForm, linkedin: e.target.value})} />
            </div>
            <input placeholder="Contact Email" className="glass" style={{ padding: '12px', color: 'inherit' }} value={aboutForm.email} onChange={e => setAboutForm({...aboutForm, email: e.target.value})} />
            <button onClick={updateAbout} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: 'fit-content', padding: '12px 28px' }}><Save size={20} /> Save Profile</button>
          </div>
        </div>

        <div className="glass" style={{ padding: '2.5rem' }}>
          <h3>Education</h3>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input placeholder="Degree" className="glass" style={{ flex: 1, padding: '12px', color: 'inherit' }} value={newEdu.degree} onChange={e => setNewEdu({...newEdu, degree: e.target.value})} />
              <input placeholder="Year" className="glass" style={{ width: '120px', padding: '12px', color: 'inherit' }} value={newEdu.year} onChange={e => setNewEdu({...newEdu, year: e.target.value})} />
            </div>
            <input placeholder="Institution" className="glass" style={{ padding: '12px', color: 'inherit' }} value={newEdu.institution} onChange={e => setNewEdu({...newEdu, institution: e.target.value})} />
            <button onClick={handleAddEdu} className="btn-primary" style={{ width: '100%' }}>Add Education</button>
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {content.education?.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{edu.institution}</div>
                </div>
                <button onClick={() => deleteItem('education', edu.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={20} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="glass" style={{ padding: '2.5rem' }}>
          <h3>Skills</h3>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input placeholder="Skill Name" className="glass" style={{ flex: 1, padding: '12px', color: 'inherit' }} value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} />
              <input placeholder="🚀" className="glass" style={{ width: '60px', padding: '12px', color: 'inherit' }} value={newSkill.icon} onChange={e => setNewSkill({...newSkill, icon: e.target.value})} />
            </div>
            <input placeholder="Category (e.g. Frontend)" className="glass" style={{ padding: '12px', color: 'inherit' }} value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})} />
            <button onClick={handleAddSkill} className="btn-primary" style={{ width: '100%' }}>Add Skill</button>
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {content.skills?.map(skill => (
              <div key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{skill.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{skill.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{skill.category}</div>
                  </div>
                </div>
                <button onClick={() => deleteItem('skills', skill.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={20} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="glass" style={{ padding: '2.5rem', gridColumn: '1 / -1' }}>
          <h3>Projects</h3>
          <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.2rem' }}>
            <input placeholder="Project Title" className="glass" style={{ padding: '12px', color: 'inherit' }} value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
            <input placeholder="Tech Stack (comma separated)" className="glass" style={{ padding: '12px', color: 'inherit' }} value={newProject.tech_stack} onChange={e => setNewProject({...newProject, tech_stack: e.target.value})} />
            <input placeholder="Link" className="glass" style={{ padding: '12px', color: 'inherit' }} value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} />
            <textarea placeholder="Description" className="glass" style={{ padding: '12px', color: 'inherit', gridColumn: '1 / -1', minHeight: '80px' }} value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
            <button onClick={handleAddProject} className="btn-primary" style={{ gridColumn: '1 / -1', padding: '14px' }}>Add Project</button>
          </div>
          <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {content.projects?.map(project => (
              <div key={project.id} style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '15px', border: '1px solid var(--border-glass)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0 }}>{project.title}</h4>
                  <button onClick={() => deleteItem('projects', project.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={20} /></button>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{project.description}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 600 }}>{project.tech_stack}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
