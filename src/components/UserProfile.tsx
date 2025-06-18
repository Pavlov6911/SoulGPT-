import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Crown, 
  Palette, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  FileText,
  Shield,
  Download,
  Keyboard
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showHelpSubmenu, setShowHelpSubmenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowHelpSubmenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const menuItems = [
    {
      icon: Crown,
      label: 'Upgrade plan',
      action: () => navigate('/pricing'),
      className: 'text-amber-600 dark:text-amber-400'
    },
    {
      icon: Palette,
      label: 'Personalize',
      action: () => navigate('/personalize')
    },
    {
      icon: Settings,
      label: 'Settings',
      action: () => navigate('/settings')
    },
    {
      icon: HelpCircle,
      label: 'Help',
      hasSubmenu: true
    }
  ];

  const helpSubmenuItems = [
    { icon: HelpCircle, label: 'Help Center', action: () => window.open('/help', '_blank') },
    { icon: FileText, label: 'Release Notes', action: () => window.open('/releases', '_blank') },
    { icon: Shield, label: 'Terms & Policies', action: () => window.open('/terms', '_blank') },
    { icon: Download, label: 'Download Apps', action: () => window.open('/download', '_blank') },
    { icon: Keyboard, label: 'Keyboard Shortcuts', action: () => window.open('/shortcuts', '_blank') }
  ];

  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
      >
        <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
          {user?.profileImage ? (
            <img 
              src={user.profileImage} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white dark:text-black text-sm font-medium">
              {user?.username ? getInitials(user.username) : 'U'}
            </span>
          )}
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-white/10 overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="p-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white dark:text-black text-sm font-medium">
                      {user?.username ? getInitials(user.username) : 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black dark:text-white truncate">
                    {user?.username || 'User'}
                  </p>
                  <p className="text-xs text-black/60 dark:text-white/60 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-black/10 dark:bg-white/10 text-black/70 dark:text-white/70 capitalize">
                    {user?.plan || 'free'} plan
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <div key={item.label} className="relative">
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-150 ${item.className || 'text-black dark:text-white'}`}
                    onClick={() => {
                      if (item.hasSubmenu) {
                        setShowHelpSubmenu(!showHelpSubmenu);
                      } else {
                        item.action?.();
                        setIsOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.hasSubmenu && (
                      <motion.div
                        animate={{ rotate: showHelpSubmenu ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={16} className="text-black/50 dark:text-white/50" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Help Submenu */}
                  <AnimatePresence>
                    {item.hasSubmenu && showHelpSubmenu && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10"
                      >
                        {helpSubmenuItems.map((subItem, subIndex) => (
                          <motion.button
                            key={subItem.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                            whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                            className="w-full flex items-center space-x-3 px-8 py-2.5 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-150 text-black/80 dark:text-white/80"
                            onClick={() => {
                              subItem.action();
                              setIsOpen(false);
                              setShowHelpSubmenu(false);
                            }}
                          >
                            <subItem.icon size={16} />
                            <span className="text-sm">{subItem.label}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Logout */}
              <div className="border-t border-black/10 dark:border-white/10 mt-2 pt-2">
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 text-red-600 dark:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Log out</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;