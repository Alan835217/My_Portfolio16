import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ onLoginSuccess, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { username, password });
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.8)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(10px)'
    }}>
      <div className="glass" style={{ padding: '3rem', width: '400px', textAlign: 'center' }}>
        <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Admin Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input 
            type="text" 
            placeholder="Username" 
            className="glass"
            style={{ padding: '12px', border: '1px solid var(--border-glass)', color: 'white' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="glass"
            style={{ padding: '12px', border: '1px solid var(--border-glass)', color: 'white' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}
          <button type="submit" className="btn-primary">Login</button>
          <button type="button" onClick={onCancel} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
