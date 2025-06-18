import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Upload, 
  FileText, 
  X, 
  Menu, 
  History, 
  Settings, 
  HelpCircle, 
  Sparkles,
  Copy,
  Edit,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Trash2,
  MessageSquare,
  Clock,
  Star,
  Download,
  Share2,
  Plus,
  Video,
  Image,
  Search,
  Play,
  Camera,
  Zap
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

const ChatInterface: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showHistoryPanel, setShowHistoryPanel] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Getting Started with Soul',
      lastMessage: 'How can I help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      messageCount: 5
    },
    {
      id: '2', 
      title: 'Project Planning Discussion',
      lastMessage: 'Let me break down the timeline for you...',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      messageCount: 12
    },
    {
      id: '3',
      title: 'Creative Writing Session',
      lastMessage: 'That\'s a fascinating character development!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      messageCount: 8
    }
  ]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && uploadedFiles.length === 0) return;

    // Hide welcome message on first user message
    if (showWelcomeMessage) {
      setShowWelcomeMessage(false);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setUploadedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about: "${inputMessage}". This is a thoughtful question that touches on several important aspects. Let me break this down for you:\n\n**Key Points:**\n- First consideration: The context you've provided\n- Second aspect: Practical implications\n- Third element: Future possibilities\n\nWould you like me to elaborate on any of these points or explore a different angle?`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatMessageContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const startNewChat = () => {
    setMessages([]);
    setShowHistoryPanel(false);
  };

  const loadChatFromHistory = (chatId: string) => {
    // In a real app, this would load the actual chat messages
    setMessages([]);
    setShowHistoryPanel(false);
  };

  const deleteChatFromHistory = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Top Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white dark:bg-black backdrop-blur-xl border-b border-black/10 dark:border-white/10 px-4 py-3"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5 text-black dark:text-white" />
              </motion.button>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate('/')}
              >
                <div className="w-8 h-8 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                  <div className="text-lg font-bold text-white dark:text-black">S</div>
                </div>
                <span className="text-xl font-bold text-black dark:text-white">Soul</span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHistoryPanel(!showHistoryPanel)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  showHistoryPanel 
                    ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white' 
                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="text-sm font-medium">History</span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilesModal(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">My Files</span>
              </motion.button>
            </nav>
          </div>

          {/* Right side - Theme toggle and Help */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHelpModal(true)}
              className="p-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-black/10 dark:border-white/10"
            >
              <nav className="flex flex-col gap-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowHistoryPanel(!showHistoryPanel);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                >
                  <History className="w-5 h-5" />
                  <span className="font-medium">Chat History</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowFilesModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">My Files</span>
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowHelpModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Help</span>
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* History Panel */}
      <AnimatePresence>
        {showHistoryPanel && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-black border-r border-black/10 dark:border-white/10 z-40 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-black dark:text-white">Chat History</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowHistoryPanel(false)}
                  className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black dark:text-white" />
                </motion.button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startNewChat}
                className="w-full flex items-center gap-3 p-3 mb-4 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">New Chat</span>
              </motion.button>

              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <motion.div
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    className="group relative p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => loadChatFromHistory(chat.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-black dark:text-white text-sm truncate mb-1">
                          {chat.title}
                        </h3>
                        <p className="text-xs text-black/60 dark:text-white/60 truncate mb-2">
                          {chat.lastMessage}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-black/40 dark:text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(chat.timestamp)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {chat.messageCount}
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChatFromHistory(chat.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded transition-all duration-200"
                      >
                        <Trash2 className="w-3 h-3 text-black dark:text-white" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className={`flex-1 overflow-y-auto bg-white dark:bg-black transition-all duration-300 ${
        showHistoryPanel ? 'ml-80' : ''
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Welcome Message */}
          <AnimatePresence>
            {showWelcomeMessage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center h-full min-h-[60vh]"
              >
                <div className="text-center">
                  <motion.h1 
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className="text-3xl md:text-4xl lg:text-5xl font-medium mb-8 tracking-normal text-black dark:text-white leading-tight font-sans"
                   >
                     What can I help with?
                   </motion.h1>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {messages.length > 0 && (
            /* Messages */
            <div className="space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-2xl relative group ${
                    message.sender === 'user' 
                      ? 'ml-auto' 
                      : 'mr-auto'
                  }`}>
                    {/* Clean Bubble Container */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className={`${
                        message.sender === 'user'
                          ? 'bg-black text-white rounded-3xl rounded-br-lg'
                          : 'bg-gray-100 dark:bg-white/10 text-black dark:text-white rounded-3xl rounded-bl-lg'
                      } px-6 py-4 shadow-sm transition-all duration-300 hover:shadow-md`}
                    >
                      {/* Message Content */}
                      <div className="prose prose-sm max-w-none">
                        <div 
                          className={`leading-relaxed ${
                            message.sender === 'user' ? 'text-white' : 'text-black dark:text-white'
                          }`}
                          dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                        />
                      </div>
                    </motion.div>

                    {/* Timestamp */}
                    <div className={`text-xs text-black/40 dark:text-white/40 mt-2 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex items-center gap-1 mt-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors group/btn"
                        title="Copy message"
                      >
                        <Copy className="w-3.5 h-3.5 text-black/60 dark:text-white/60 group-hover/btn:text-black dark:group-hover/btn:text-white" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors group/btn" 
                        title="Edit message"
                      >
                        <Edit className="w-3.5 h-3.5 text-black/60 dark:text-white/60 group-hover/btn:text-black dark:group-hover/btn:text-white" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors group/btn" 
                        title="Like message"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-black/60 dark:text-white/60 group-hover/btn:text-black dark:group-hover/btn:text-white" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors group/btn" 
                        title="Dislike message"
                      >
                        <ThumbsDown className="w-3.5 h-3.5 text-black/60 dark:text-white/60 group-hover/btn:text-black dark:group-hover/btn:text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-3xl w-full bg-white dark:bg-black rounded-2xl p-4 mr-12">
                    <div className="flex items-start gap-3">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center flex-shrink-0"
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-black dark:text-white mb-2">Soul</div>
                        <div className="flex items-center gap-1">
                          <div className="flex space-x-1">
                            <motion.div 
                              animate={{ y: [-2, 2, -2] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                              className="w-2 h-2 bg-black rounded-full"
                            ></motion.div>
                            <motion.div 
                              animate={{ y: [-2, 2, -2] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                              className="w-2 h-2 bg-black rounded-full"
                            ></motion.div>
                            <motion.div 
                              animate={{ y: [-2, 2, -2] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-black rounded-full"
                            ></motion.div>
                          </div>
                          <span className="text-sm text-black/60 dark:text-white/60 ml-2">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky bottom-0 bg-white dark:bg-black backdrop-blur-xl border-t border-black/10 dark:border-white/10 px-4 py-4"
      >
        <div className="max-w-4xl mx-auto">
          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap gap-2 mb-3"
            >
              {uploadedFiles.map((file) => (
                <motion.div 
                  key={file.id} 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-full px-3 py-1.5 text-sm"
                >
                  <FileText className="w-3 h-3 text-black dark:text-white" />
                  <span className="text-black dark:text-white truncate max-w-32">{file.name}</span>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => removeFile(file.id)}
                    className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Input Container - Gemini Style */}
          <div className="relative">
            {/* Enhanced Input Bar - Gemini Style */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl px-4 py-4 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[60px] focus-within:border-[#121212] focus-within:shadow-none"
              style={{
                outline: 'none'
              }}
            >
              {/* Left Side Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Upload Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Upload Files"
                >
                  <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>

                {/* Video Generator Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/video-generator')}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                  title="Video Generator"
                >
                  <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>

                {/* Image Generator Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/image-generator')}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                  title="Image Generator"
                >
                  <Image className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>

                {/* Deep Research Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                  title="Deep Research"
                >
                  <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Vertical Divider */}
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>

              {/* Text Input */}
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Soul"
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none resize-none py-1 max-h-32 min-h-[24px] text-base focus:outline-none focus:ring-0"
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '24px',
                  outline: 'none',
                  boxShadow: 'none'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />

              {/* Send Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() && uploadedFiles.length === 0}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  inputMessage.trim() || uploadedFiles.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg,.gif"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Input Helper Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-black/50 dark:text-white/50 mt-2 text-center"
          >
            Press Enter to send, Shift + Enter for new line
          </motion.div>
        </div>
      </motion.footer>

      {/* My Files Modal */}
      <AnimatePresence>
        {showFilesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFilesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-black rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black dark:text-white">My Files</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFilesModal(false)}
                  className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black dark:text-white" />
                </motion.button>
              </div>
              
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-black/20 dark:text-white/20 mx-auto mb-4" />
                <p className="text-black/60 dark:text-white/60">No files uploaded yet</p>
                <p className="text-sm text-black/40 dark:text-white/40 mt-1">Upload files during conversations to get started</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHelpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-black rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black dark:text-white">Help & Support</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowHelpModal(false)}
                  className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-black dark:text-white" />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-3">Getting Started</h3>
                  <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                    <li>• Type your message and press Enter to send</li>
                    <li>• Use Shift + Enter for new lines</li>
                    <li>• Upload files by clicking the upload button</li>
                    <li>• Access chat history from the History panel</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-3">Keyboard Shortcuts</h3>
                  <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                    <li>• <kbd className="px-2 py-1 bg-black/10 dark:bg-white/10 rounded text-xs">Enter</kbd> - Send message</li>
                    <li>• <kbd className="px-2 py-1 bg-black/10 dark:bg-white/10 rounded text-xs">Shift + Enter</kbd> - New line</li>
                    <li>• <kbd className="px-2 py-1 bg-black/10 dark:bg-white/10 rounded text-xs">Ctrl + /</kbd> - Toggle this help</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-3">Need More Help?</h3>
                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-lg text-sm text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Documentation
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-lg text-sm text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Support
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;