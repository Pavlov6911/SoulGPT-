import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const footerLinks = {
    product: [
      { name: 'Features', path: '/#features' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Chat', path: '/chat' },
      { name: 'Settings', path: '/settings' }
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'GDPR', path: '/gdpr' }
    ]
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:hello@soul.ai', label: 'Email' }
  ];

  return (
    <footer className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto bg-transparent rounded-xl p-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer mb-4"
              onClick={() => navigate('/')}
            >
              <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">SOUL</h2>
            </motion.div>
            <p className="text-black dark:text-white mb-6 leading-relaxed">
              AI with Soul. Your intelligent companion for work, creativity, and clarity.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200 shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => navigate(link.path)}
                    className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => navigate(link.path)}
                    className="text-black hover:text-gray-600 transition-colors duration-200"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => navigate(link.path)}
                    className="text-black hover:text-gray-600 transition-colors duration-200"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black dark:text-white text-sm">
              © 2024 Soul AI. All rights reserved.
            </p>
            <p className="text-black dark:text-white text-sm mt-4 md:mt-0">
              Made with ❤️ for the future of AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;