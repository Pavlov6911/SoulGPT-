import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, X, Star, Zap, Shield, Users, Brain, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free Tier',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with Soul',
      features: [
        { name: 'Basic AI conversations', included: true },
        { name: '10 messages per day', included: true },
        { name: 'Standard response time', included: true },
        { name: 'Basic prompt enhancer', included: true },
        { name: 'Light & dark themes', included: true },
        { name: 'Priority support', included: false },
        { name: 'Advanced AI models', included: false },
        { name: 'Unlimited messages', included: false },
        { name: 'Custom prompt templates', included: false },
        { name: 'API access', included: false }
      ],
      cta: 'Get Started',
      popular: false,
      disabled: false
    },
    {
      name: 'Soul Pro',
      price: '$19',
      period: 'per month',
      description: 'Unlock the full potential of AI with Soul',
      features: [
        { name: 'Advanced AI conversations', included: true },
        { name: 'Unlimited messages', included: true },
        { name: 'Lightning-fast responses', included: true },
        { name: 'Advanced prompt enhancer', included: true },
        { name: 'All themes & customization', included: true },
        { name: 'Priority support', included: true },
        { name: 'Latest AI models', included: true },
        { name: 'Custom prompt templates', included: true },
        { name: 'Conversation export', included: true },
        { name: 'API access', included: true }
      ],
      cta: 'Coming Soon',
      popular: true,
      disabled: true
    }
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Advanced AI Models',
      description: 'Access to the latest and most powerful AI models for superior conversations'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Speed',
      description: 'Get instant responses with our optimized infrastructure'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Enterprise Security',
      description: 'Your data is protected with enterprise-grade security measures'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Priority Support',
      description: '24/7 priority support from our dedicated team'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Custom Templates',
      description: 'Create and save custom prompt templates for your workflow'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'API Access',
      description: 'Integrate Soul into your applications with our powerful API'
    }
  ];

  const faqs = [
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial for Soul Pro?',
      answer: 'We offer a generous free tier that lets you experience Soul\'s capabilities. You can upgrade to Pro when you\'re ready for unlimited access.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and security measures to protect your data. Your conversations are private and secure.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your current billing period.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Simple, Transparent <span className="text-black">Pricing</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-black dark:text-white mb-12 max-w-3xl mx-auto"
          >
            Choose the plan that's right for you. Start free and upgrade when you're ready.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative bg-gray-50 dark:bg-white/5 rounded-2xl p-8 ${
                  plan.popular ? 'ring-2 ring-black' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-black/60 dark:text-white/80 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-black/70 dark:text-white/90">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-black flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-black/40 dark:text-white/40 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-black/40 dark:text-white/40'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: plan.disabled ? 1 : 1.02 }}
                  whileTap={{ scale: plan.disabled ? 1 : 0.98 }}
                  onClick={() => !plan.disabled && navigate('/onboarding')}
                  disabled={plan.disabled}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
            plan.popular
              ? 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed'
              : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed'
          }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Why Choose Soul Pro?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-white/5 p-6 rounded-xl shadow-sm"
              >
                <div className="text-black mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-black/70 dark:text-white/90">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-white/5 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-black/70 dark:text-white/90">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Get Started?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-black/70 dark:text-white/90 mb-8"
          >
            Join thousands of users who are already experiencing the future of AI.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/onboarding')}
            className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            Start Your Journey
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;