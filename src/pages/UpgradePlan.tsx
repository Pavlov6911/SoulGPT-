import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Check, Zap, Star, Sparkles } from 'lucide-react';

import Header from '../components/Header';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  icon: React.ReactNode;
  buttonText: string;
}

const UpgradePlan: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      icon: <Star size={24} />,
      buttonText: 'Current Plan',
      features: [
        { text: '10 AI conversations per day', included: true },
        { text: '5 image generations per day', included: true },
        { text: 'Basic video generation', included: true },
        { text: 'Standard support', included: true },
        { text: 'Advanced AI models', included: false },
        { text: 'Priority processing', included: false },
        { text: 'Custom templates', included: false },
        { text: 'API access', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For power users and professionals',
      icon: <Zap size={24} />,
      buttonText: 'Upgrade to Pro',
      popular: true,
      features: [
        { text: 'Unlimited AI conversations', included: true },
        { text: 'Unlimited image generations', included: true },
        { text: 'Advanced video generation', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced AI models', included: true },
        { text: 'Priority processing', included: true },
        { text: 'Custom templates', included: true },
        { text: 'API access', included: false }
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'For teams and organizations',
      icon: <Crown size={24} />,
      buttonText: 'Contact Sales',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Team collaboration', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Priority processing', included: true },
        { text: 'Custom templates', included: true },
        { text: 'Full API access', included: true }
      ]
    }
  ];

  const handleUpgrade = async (planId: string) => {
    if (planId === 'free') return;
    
    setIsLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your payment processor
      console.log(`Upgrading to ${planId} plan`);
      
      // Redirect to success page or show success message
      alert('Upgrade successful! Welcome to your new plan.');
    } catch (error) {
      alert('Upgrade failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <Header />
      
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors mb-8 mx-auto"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="text-black dark:text-white" size={32} />
            <h1 className="text-4xl font-bold text-black dark:text-white">Upgrade Your Plan</h1>
          </div>
          <p className="text-xl text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Unlock the full potential of AI with our premium features
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-[#0a0a0a] border-2 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? 'border-black dark:border-white scale-105'
                  : 'border-black/20 dark:border-white/20 hover:border-black/40 dark:hover:border-white/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{plan.name}</h3>
                <p className="text-black/70 dark:text-white/70 mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-black dark:text-white">{plan.price}</span>
                  <span className="text-black/70 dark:text-white/70 ml-2">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      feature.included
                        ? 'bg-green-500'
                        : 'bg-black/10 dark:bg-white/10'
                    }`}>
                      {feature.included && <Check size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm ${
                      feature.included
                        ? 'text-black dark:text-white'
                        : 'text-black/40 dark:text-white/40'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUpgrade(plan.id)}
                disabled={isLoading || plan.id === 'free'}
                className={`w-full py-3 px-6 rounded-2xl font-medium transition-all duration-200 ${
                  plan.popular
                    ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90'
                    : plan.id === 'free'
                    ? 'bg-black/10 dark:bg-white/10 text-black/50 dark:text-white/50 cursor-not-allowed'
                    : 'border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Processing...' : plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Questions?</h2>
          <p className="text-black/70 dark:text-white/70 mb-8">
            Contact our support team for help choosing the right plan for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white rounded-2xl font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default UpgradePlan;