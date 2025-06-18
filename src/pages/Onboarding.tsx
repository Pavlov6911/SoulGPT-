import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Brain, Sparkles, MessageCircle, Check } from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    tone: 'neutral',
    creativity: 'balanced',
    useCase: 'general'
  });

  const steps = [
    {
      title: 'Welcome to Soul',
      subtitle: 'Your AI companion for work, creativity, and clarity',
      content: (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-32 h-32 mx-auto bg-black rounded-full flex items-center justify-center"
          >
            <Brain className="w-16 h-16 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-black dark:text-white"
            >
              Soul is designed to understand you and provide intelligent, contextual responses that feel natural and helpful.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mt-8"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-semibold">Natural Conversations</h3>
                <p className="text-sm text-black dark:text-white text-center">
                  Chat naturally with AI that understands context
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-semibold">Creative Assistance</h3>
                <p className="text-sm text-gray-600 dark:text-white text-center">
                  Get help with creative projects and brainstorming
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-semibold">Intelligent Insights</h3>
                <p className="text-sm text-gray-600 dark:text-white text-center">
                  Gain clarity and new perspectives on complex topics
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      title: 'Customize Your Experience',
      subtitle: 'Tell us how you prefer to interact with AI',
      content: (
        <div className="space-y-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Preferred Tone</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'neutral', label: 'Neutral', desc: 'Balanced and professional' },
                  { value: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
                  { value: 'formal', label: 'Formal', desc: 'Professional and structured' },
                  { value: 'casual', label: 'Casual', desc: 'Relaxed and conversational' }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPreferences({ ...preferences, tone: option.value })}
                    className={`p-4 rounded-lg border-2 transition-colors duration-200 text-left ${
                      preferences.tone === option.value
                        ? 'border-black bg-black/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-black/50'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-black dark:text-white">{option.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Creativity Level</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: 'conservative', label: 'Conservative', desc: 'Stick to facts and proven approaches' },
                  { value: 'balanced', label: 'Balanced', desc: 'Mix of creativity and reliability' },
                  { value: 'creative', label: 'Creative', desc: 'Explore new ideas and possibilities' }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPreferences({ ...preferences, creativity: option.value })}
                    className={`p-4 rounded-lg border-2 transition-colors duration-200 text-left ${
                      preferences.creativity === option.value
                        ? 'border-black bg-black/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-black/50'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600 dark:text-white">{option.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Primary Use Case</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'work', label: 'Work & Productivity', desc: 'Business tasks, analysis, and planning' },
                  { value: 'creative', label: 'Creative Projects', desc: 'Writing, brainstorming, and ideation' },
                  { value: 'learning', label: 'Learning & Research', desc: 'Education, explanations, and exploration' },
                  { value: 'general', label: 'General Assistance', desc: 'Everyday questions and conversations' }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPreferences({ ...preferences, useCase: option.value })}
                    className={`p-4 rounded-lg border-2 transition-colors duration-200 text-left ${
                      preferences.useCase === option.value
                        ? 'border-black bg-black/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-black/50'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600 dark:text-white">{option.desc}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'You\'re All Set!',
      subtitle: 'Welcome to the future of AI conversation',
      content: (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-32 h-32 mx-auto bg-black rounded-full flex items-center justify-center"
          >
            <Check className="w-16 h-16 text-white" />
          </motion.div>
          
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-black dark:text-white"
            >
              Your preferences have been saved. Soul is now personalized to your style and needs.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 max-w-md mx-auto"
            >
              <h3 className="font-semibold mb-4">Your Settings</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-white">Tone:</span>
                  <span className="capitalize">{preferences.tone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-white">Creativity:</span>
                  <span className="capitalize">{preferences.creativity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-white">Use Case:</span>
                  <span className="capitalize">{preferences.useCase.replace('-', ' ')}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm text-black dark:text-white"
            >
              You can always change these settings later in your preferences.
            </motion.p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save preferences and navigate to chat
      localStorage.setItem('soul-preferences', JSON.stringify(preferences));
      navigate('/chat');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-white">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={() => navigate('/chat')}
              className="text-sm text-black dark:text-white hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Skip
            </button>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              className="bg-black h-2 rounded-full"
            />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {steps[currentStep].title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-white mb-12">
              {steps[currentStep].subtitle}
            </p>
            
            <div className="text-left">
              {steps[currentStep].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 dark:text-white hover:text-black dark:hover:text-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            {currentStep === steps.length - 1 ? 'Enter Soul' : 'Continue'}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;