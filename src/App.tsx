import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import ChatInterface from './pages/ChatInterface';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import Onboarding from './pages/Onboarding';
import ImageGenerator from './pages/ImageGenerator';
import VideoGenerator from './pages/VideoGenerator';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/image-generator" element={<ImageGenerator />} />
            <Route path="/video-generator" element={<VideoGenerator />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;