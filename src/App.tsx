import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import ChatInterface from './pages/ChatInterface';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import Onboarding from './pages/Onboarding';
import ImageGenerator from './pages/ImageGenerator';
import VideoGenerator from './pages/VideoGenerator';
import Login from './pages/Login';
import Register from './pages/Register';
import Personalize from './pages/Personalize';
import UpgradePlan from './pages/UpgradePlan';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/image-generator" element={<ImageGenerator />} />
              <Route path="/video-generator" element={<VideoGenerator />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/personalize" element={<Personalize />} />
            <Route path="/upgrade" element={<UpgradePlan />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;