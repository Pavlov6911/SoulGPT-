import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Star, ArrowRight, Zap, Shield, Users, MessageSquare } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);


  const videoRef = useRef<HTMLVideoElement>(null);

  // Video filter based on theme
  const getVideoFilter = () => {
    return theme === 'light' 
      ? 'invert(1) brightness(1.2) contrast(1.2)'
      : 'brightness(1.0) contrast(1.0)';
  };



  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };



  const handleStartChatting = () => {
    navigate('/chat');
  };

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Intelligent Conversations",
      description: "Experience natural, context-aware conversations powered by advanced AI technology."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get instant responses with our optimized AI engine designed for speed and accuracy."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your conversations are secure and private. We prioritize your data protection."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-User Support",
      description: "Collaborate with team members and share insights seamlessly across your organization."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "SoulGPT has revolutionized how our team approaches problem-solving. The AI insights are incredibly valuable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Developer",
      company: "StartupXYZ",
      content: "The most intuitive AI assistant I've ever used. It understands context better than any other tool.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GrowthCo",
      content: "Our productivity has increased by 40% since implementing SoulGPT into our workflow.",
      rating: 5
    }
  ];

  const howItWorksSteps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your account in seconds and get instant access to SoulGPT."
    },
    {
      step: "2",
      title: "Start Chatting",
      description: "Begin your conversation with our AI assistant using natural language."
    },
    {
      step: "3",
      title: "Get Results",
      description: "Receive intelligent, contextual responses that help you achieve your goals."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden">


      {/* Video Controls */}
      <div className="fixed bottom-6 right-6 z-30 flex gap-2">
        <motion.button
          onClick={handleVideoToggle}
          className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isVideoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Subtle floating elements - only in hero section */}
      <div className="absolute inset-0 z-5 pointer-events-none" style={{ height: '100vh' }}>
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-black/30 dark:bg-white/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-black/40 dark:bg-white/40 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-black/35 dark:bg-white/35 rounded-full"
          animate={{
            y: [0, -25, 0],
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-20">
        <Header />
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Video Background - Only in Hero Section */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              style={{
                filter: getVideoFilter(),
                mixBlendMode: 'normal'
              }}
            >
              <source src="/videoforbg.webm" type="video/webm" />
              <source src="/videoforbg.mp4" type="video/mp4" />
            </video>
            {/* Video overlay - optimized for bright mode */}
            <div className="absolute inset-0 bg-white/85 dark:bg-black/80 backdrop-blur-[2px]" />
          </div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-black dark:text-white leading-tight drop-shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Meet Your AI
                <br />
                <motion.span 
                  className="text-black dark:text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Soul Companion
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-black/80 dark:text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Experience the future of AI conversation with SoulGPT. Intelligent, intuitive, and designed to understand you like never before.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  onClick={handleStartChatting}
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-lg font-semibold hover:bg-black/80 dark:hover:bg-white/80 transition-all duration-300 flex items-center gap-2 group shadow-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Chatting Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-black dark:border-white rounded-full text-lg font-semibold text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/95 dark:bg-black/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                Why Choose SoulGPT?
              </h2>
              <p className="text-xl text-black/80 dark:text-white/80 max-w-3xl mx-auto">
                Discover the features that make SoulGPT the most advanced AI companion for your daily tasks.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-xl p-6 hover:bg-white/90 dark:hover:bg-black/90 transition-all duration-300 border border-black/10 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-black dark:text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black dark:text-white">{feature.title}</h3>
                  <p className="text-black/70 dark:text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/95 dark:bg-white/95 text-white dark:text-black backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-black">
                How It Works
              </h2>
              <p className="text-xl text-white/80 dark:text-black/80 max-w-3xl mx-auto">
                Get started with SoulGPT in three simple steps and unlock the power of AI conversation.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-white dark:bg-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-black dark:text-white shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4 text-white dark:text-black">{step.title}</h3>
                  <p className="text-white/70 dark:text-black/70">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/95 dark:bg-black/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
                What Our Users Say
              </h2>
              <p className="text-xl text-black/80 dark:text-white/80 max-w-3xl mx-auto">
                Join thousands of satisfied users who have transformed their workflow with SoulGPT.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-xl p-6 hover:bg-white/90 dark:hover:bg-black/90 transition-all duration-300 border border-black/10 dark:border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-black dark:text-white fill-current" />
                    ))}
                  </div>
                  <p className="text-black/70 dark:text-white/70 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-black dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-black/60 dark:text-white/60">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/95 dark:bg-white/95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-black">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-white/80 dark:text-black/80 mb-8 max-w-2xl mx-auto">
                Join the AI revolution today and discover what makes SoulGPT the most intelligent companion for your digital life.
              </p>
              <motion.button
                onClick={handleStartChatting}
                className="px-10 py-4 bg-white dark:bg-black text-black dark:text-white rounded-full text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 flex items-center gap-2 mx-auto group shadow-2xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;