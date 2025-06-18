import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Info,
  Dice6,
  FolderOpen,
  Upload,
  Download,
  RefreshCw,
  Edit3,
  Zap,
  ChevronDown,
  ChevronUp,
  X,
  History
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

interface ImageGeneratorProps {}

const ImageGenerator: React.FC<ImageGeneratorProps> = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('Flux Ultra');
  const [showInfo, setShowInfo] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [useAsReference, setUseAsReference] = useState(false);
  const [negativPrompt, setNegativPrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [generationHistory, setGenerationHistory] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const models = [
    { name: 'Flux Ultra', icon: '⚡' },
    { name: 'DreamBooth', icon: '🎨' },
    { name: 'GAN+Stylizer', icon: '🎭' },
    { name: 'Kontext', icon: '✏️' },
    { name: 'Illusion Engine', icon: '🌀' },
    { name: 'Experimental', icon: '🧪' }
  ];

  const promptTemplates = [
    {
      category: 'Landscapes',
      prompts: [
        'A dreamlike mountain landscape with glowing crystals, Escher-style geometry, and soft cinematic lighting.',
        'Mystical forest with bioluminescent plants and floating islands in the sky.',
        'Desert oasis with crystal clear water reflecting aurora borealis.'
      ]
    },
    {
      category: 'Portraits',
      prompts: [
        'Portrait of a cyberpunk warrior with neon tattoos and holographic eyes.',
        'Renaissance-style portrait with modern twist and digital art elements.',
        'Ethereal being with flowing hair made of stardust and cosmic energy.'
      ]
    },
    {
      category: 'Abstract',
      prompts: [
        'Geometric patterns morphing into organic forms with vibrant color gradients.',
        'Liquid metal flowing through crystalline structures in zero gravity.',
        'Fractal dimensions colliding with photorealistic textures.'
      ]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !selectedModel) return;
    
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setGeneratedImage('/api/placeholder/512/512');
      setIsGenerating(false);
    }, 3000);
  };

  const getRandomPrompt = () => {
    const allPrompts = promptTemplates.flatMap(category => category.prompts);
    const randomPrompt = allPrompts[Math.floor(Math.random() * allPrompts.length)];
    setPrompt(randomPrompt);
  };

  const generateRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 1000000).toString());
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Top Bar / Header */}
      <motion.div 
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16"
      >
        <div className="flex items-center justify-between h-full px-6">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </motion.button>

          {/* Title */}
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Image Generator</h1>

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
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 z-50"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">How to Use</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Describe your image in detail using creative or technical language.</li>
                    <li>• Choose the generation model best suited for your need.</li>
                    <li>• Adjust settings for quality, style, and output size.</li>
                    <li>• Click "Generate" to produce your image.</li>
                    <li>• Preview, download, or remix the result.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto px-8 py-12"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Create Anything With AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Craft photorealistic, surreal, or styled visuals using advanced models.
          </motion.p>
        </div>

        {/* Prompt Input & Template Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Describe your image...
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A dreamlike mountain landscape with glowing crystals, Escher-style geometry, and soft cinematic lighting."
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <div className="flex gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={getRandomPrompt}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Dice6 size={16} />
              Random Prompt
            </motion.button>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTemplates(!showTemplates)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FolderOpen size={16} />
                Prompt Templates
              </motion.button>

              <AnimatePresence>
                {showTemplates && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 z-40"
                  >
                    {promptTemplates.map((category, idx) => (
                      <div key={idx} className="mb-4 last:mb-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{category.category}</h4>
                        <div className="space-y-2">
                          {category.prompts.map((template, templateIdx) => (
                            <button
                              key={templateIdx}
                              onClick={() => {
                                setPrompt(template);
                                setShowTemplates(false);
                              }}
                              className="block w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            >
                              {template}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Generator Model Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {models.map((model) => (
              <motion.button
                key={model.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedModel(model.name)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedModel === model.name
                    ? 'bg-black text-white'
                    : 'bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <span>{model.icon}</span>
                {model.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Image Controls Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output Dimensions</label>
            <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>512x512</option>
              <option>768x768</option>
              <option>1024x1024</option>
              <option>1024x768</option>
              <option>768x1024</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Style Strength</label>
            <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chaos/Creativity</label>
            <input type="range" min="0" max="100" defaultValue="30" className="w-full" />
          </div>
        </motion.div>

        {/* Upload & Remix Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          >
            {uploadedImage ? (
              <div className="flex items-center justify-center gap-4">
                <img src={uploadedImage} alt="Uploaded" className="w-20 h-20 object-cover rounded" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Image uploaded successfully</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage(null);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 dark:text-gray-400">Drag and drop an image or sketch here</p>
              </div>
            )}
          </div>
          
          {uploadedImage && (
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={useAsReference}
                  onChange={(e) => setUseAsReference(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">Use as reference image</span>
              </label>
            </div>
          )}
          
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="hidden"
          />
        </motion.div>

        {/* Advanced Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors mb-4"
          >
            {showAdvanced ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            Advanced Settings
          </button>
          
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Negative Prompt</label>
                  <textarea
                    value={negativPrompt}
                    onChange={(e) => setNegativPrompt(e.target.value)}
                    placeholder="What you don't want in the image..."
                    className="w-full h-20 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seed</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={seed}
                      onChange={(e) => setSeed(e.target.value)}
                      placeholder="Random seed"
                      className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button
                      onClick={generateRandomSeed}
                      className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Random
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CFG Scale</label>
                  <input type="range" min="1" max="20" defaultValue="7" className="w-full" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Steps</label>
                  <input type="range" min="10" max="100" defaultValue="50" className="w-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Generate Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={!prompt.trim() || !selectedModel || isGenerating}
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Zap size={20} />
                Generate Image
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Output Preview Section */}
        <AnimatePresence>
          {generatedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="inline-block border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="max-w-full h-auto rounded-lg mb-4"
                />
                
                <div className="flex justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download size={16} />
                    Download
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    <RefreshCw size={16} />
                    Remix
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Edit3 size={16} />
                    Edit Prompt
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

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
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Your generated images will appear here</p>
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
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                        {item.image && (
                          <img src={item.image} alt="Generated" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{item.prompt}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{item.timestamp}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGenerator;