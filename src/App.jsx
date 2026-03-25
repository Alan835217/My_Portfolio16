import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import './styles/index.css';

const API_BASE = 'http://127.0.0.1:5000/api';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE}/content?t=${Date.now()}`, { cache: 'no-store' });
      const data = await response.json();
      if (data && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Fetch settings failed:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAdmin(true);
    fetchSettings();
  }, []);

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="App">
      <Home 
        onAdminClick={() => setShowLogin(true)} 
        theme={theme} 
        toggleTheme={toggleTheme}
        settings={settings}
      />
      {showLogin && (
        <AdminLogin 
          onLoginSuccess={handleLoginSuccess} 
          onCancel={() => setShowLogin(false)} 
        />
      )}
    </div>
  );
}

export default App;
