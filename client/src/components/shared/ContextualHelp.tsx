import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HelpTooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function HelpTooltip({ content, children, side = 'top' }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          className="glass-card border-0 text-white max-w-xs"
        >
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Array<{
    target: string;
    title: string;
    content: string;
    position: 'top' | 'right' | 'bottom' | 'left';
  }>;
}

export function OnboardingTour({ isOpen, onClose, steps }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen || !steps[currentStep]) return null;

  const step = steps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-card p-6 max-w-md w-full mx-4"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <p className="text-white/80 mb-6">{step.content}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-blue-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="glass-button-outline px-4 py-2 text-sm"
                >
                  Previous
                </button>
              )}
              <button
                onClick={nextStep}
                className="glass-button-primary px-4 py-2 text-sm"
              >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function QuickTips() {
  const [isVisible, setIsVisible] = useState(true);

  const tips = [
    "💡 Use Ctrl+K to quickly search for loans",
    "🔒 Enable 2FA for enhanced security",
    "📊 Check your portfolio regularly for updates",
    "⚡ Connect your wallet for faster transactions",
  ];

  const [currentTip, setCurrentTip] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tips.length]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 glass-card p-4 max-w-sm z-40"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium text-white">Quick Tip</h4>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white transition-colors"
        >
          <i className="ri-close-line text-sm"></i>
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.p
          key={currentTip}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-white/80 text-sm"
        >
          {tips[currentTip]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}