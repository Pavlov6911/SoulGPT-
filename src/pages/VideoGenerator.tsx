import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Info,
  Upload,
  Download,
  Edit3,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  X,
  Settings,
  Volume2,
  Copy,
  RotateCcw,
  History,
  Play,
  Camera,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

interface VideoGeneratorProps {}

const VideoGenerator: React.FC<VideoGeneratorProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'imageEdit'>('text');
  const [showInfo, setShowInfo] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [textPrompt, setTextPrompt] = useState('');
  const [editPrompt, setEditPrompt] = useState('');
  const [videoDuration, setVideoDuration] = useState(7);
  const [videoStyle, setVideoStyle] = useState('cinematic');
  const [resolution, setResolution] = useState('HD');
  const [autoSubtitles, setAutoSubtitles] = useState(false);
  const [aiPresenter, setAiPresenter] = useState(false);
  const [smartMusic, setSmartMusic] = useState(false);
  const [abComparison, setAbComparison] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [generatedVideos, setGeneratedVideos] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const generationHistory: any[] = [];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      const newVideo = {
        id: Date.now(),
        thumbnail: '/api/placeholder/300/200',
        title: activeTab === 'text' ? 'Text Generated Video' : 'Image Generated Video',
        duration: videoDuration,
        style: videoStyle
      };
      setGeneratedVideos(prev => [newVideo, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900" />
        {/* Animated Grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-black/5 dark:bg-white/5 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/chat')}
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white">AI Video Generator</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Transform your ideas into stunning motion visuals in seconds.
            </p>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* History Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <History size={20} />
          </motion.button>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Info Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              <Info size={20} />
            </motion.button>

            {/* Info Dropdown */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Use Text, Images, or both to generate powerful AI videos. Edit scenes, adjust visuals, or remix your content with just a few clicks.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* Generation Tabs */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'text', label: 'Text to Video', icon: Edit3 },
              { id: 'image', label: 'Image to Video', icon: Camera },
              { id: 'imageEdit', label: 'Image + Edit to Video', icon: Zap }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-black dark:text-white border-b-2 border-black dark:border-white bg-gray-50 dark:bg-gray-700'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Describe your scene
                    </label>
                    <textarea
                      value={textPrompt}
                      onChange={(e) => setTextPrompt(e.target.value)}
                      placeholder="A majestic eagle soaring through mountain peaks at sunset..."
                      className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Video Style
                      </label>
                      <select
                        value={videoStyle}
                        onChange={(e) => setVideoStyle(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                      >
                        <option value="cinematic">Cinematic</option>
                        <option value="3d">3D Animation</option>
                        <option value="cartoon">Cartoon</option>
                        <option value="realistic">Realistic</option>
                        <option value="artistic">Artistic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Duration: {videoDuration}s
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="10"
                        value={videoDuration}
                        onChange={(e) => setVideoDuration(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerate}
                    disabled={isGenerating || !textPrompt.trim()}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full"
                        />
                        Generating Video...
                      </>
                    ) : (
                      <>                        Generate Video
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {activeTab === 'image' && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Image
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-black dark:hover:border-white transition-colors"
                    >
                      <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-600 dark:text-gray-400">
                        {uploadedImage ? uploadedImage.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </motion.div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Animation Type
                      </label>
                      <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent">
                        <option value="pan">Camera Pan</option>
                        <option value="zoom">Zoom In/Out</option>
                        <option value="motion">Object Motion</option>
                        <option value="parallax">Parallax Effect</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Music Theme
                      </label>
                      <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent">
                        <option value="epic">Epic</option>
                        <option value="calm">Calm</option>
                        <option value="upbeat">Upbeat</option>
                        <option value="dramatic">Dramatic</option>
                        <option value="none">No Music</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerate}
                    disabled={isGenerating || !uploadedImage}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full"
                        />
                        Creating Animation...
                      </>
                    ) : (
                      <>
                        <Camera size={20} />
                        Create Animation
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}

              {activeTab === 'imageEdit' && (
                <motion.div
                  key="imageEdit"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Base Image
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-black dark:hover:border-white transition-colors"
                    >
                      <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {uploadedImage ? uploadedImage.name : 'Upload image to edit'}
                      </p>
                    </motion.div>
                  </div>

                  {/* Edit Prompt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Edit Instructions
                    </label>
                    <textarea
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="Add flying birds, change sky to sunset, make water ripple..."
                      className="w-full h-24 p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Tools */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Video Tools
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: 'Trim', icon: RotateCcw },
                        { label: 'Blend', icon: Copy },
                        { label: 'Extend', icon: Zap },
                        { label: 'Sound', icon: Volume2 }
                      ].map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <motion.button
                            key={tool.label}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:border-black dark:hover:border-white transition-colors"
                          >
                            <Icon size={16} />
                            <span className="text-sm">{tool.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Add to Video
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGenerate}
                      disabled={isGenerating || !uploadedImage || !editPrompt.trim()}
                      className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full"
                          />
                          Rendering...
                        </>
                      ) : (
                        'Render Full Video'
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Advanced Options */}
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <motion.button
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Advanced Options</span>
            </div>
            {showAdvanced ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </motion.button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Resolution
                      </label>
                      <select
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                      >
                        <option value="HD">HD (1280x720)</option>
                        <option value="FHD">Full HD (1920x1080)</option>
                        <option value="4K">4K (3840x2160)</option>
                        <option value="Vertical">Vertical (1080x1920)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Style Preset
                      </label>
                      <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent">
                        <option value="dark-cinematic">Dark Cinematic</option>
                        <option value="minimal-white">Minimal White</option>
                        <option value="branded">Branded Template</option>
                        <option value="vibrant">Vibrant Colors</option>
                      </select>
                    </div>
                  </div>

                  {/* Feature Toggles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Auto Subtitles', state: autoSubtitles, setter: setAutoSubtitles },
                      { label: 'AI Presenter', state: aiPresenter, setter: setAiPresenter },
                      { label: 'Smart Music Sync', state: smartMusic, setter: setSmartMusic },
                      { label: 'A/B Comparison', state: abComparison, setter: setAbComparison }
                    ].map((toggle) => (
                      <motion.label
                        key={toggle.label}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer hover:border-black dark:hover:border-white transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {toggle.label}
                        </span>
                        <motion.div
                          className={`w-12 h-6 rounded-full p-1 transition-colors ${
                            toggle.state ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          onClick={() => toggle.setter(!toggle.state)}
                        >
                          <motion.div
                            className={`w-4 h-4 rounded-full transition-colors ${
                              toggle.state ? 'bg-white dark:bg-black' : 'bg-white dark:bg-gray-400'
                            }`}
                            animate={{ x: toggle.state ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </motion.div>
                      </motion.label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Generated Videos Output */}
        {generatedVideos.length > 0 && (
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Generated Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedVideos.map((video) => (
                <motion.div
                  key={video.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
                >
                  <div className="relative aspect-video bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <Play size={48} className="text-gray-400" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}s
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">{video.title}</h4>
                    <div className="flex gap-2">
                      {[
                        { label: 'Download', icon: Download, color: 'bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white' },
                        { label: 'Edit', icon: Edit3, color: 'bg-black dark:bg-white text-white dark:text-black' },
                        { label: 'Remix', icon: RefreshCw, color: 'bg-gray-500 dark:bg-gray-400 text-white dark:text-black' }
                      ].map((action) => {
                        const Icon = action.icon;
                        return (
                          <motion.button
                            key={action.label}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${action.color} hover:opacity-80`}
                          >
                            <Icon size={12} />
                            {action.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* History Panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Generation History</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowHistory(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              {generationHistory.length === 0 ? (
                <div className="text-center py-12">
                  <History size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No generations yet</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Your generated videos will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generationHistory.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                        {item.video ? (
                          <video src={item.video} className="w-full h-full object-cover" />
                        ) : (
                          <Play size={24} className="text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.prompt}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-400 dark:text-gray-500">{item.timestamp}</p>
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{item.duration}s</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoGenerator;