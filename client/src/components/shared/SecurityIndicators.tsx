import React from 'react';
import { motion } from 'framer-motion';

interface SecurityBadgeProps {
  type: 'ssl' | 'mfa' | 'encryption' | 'verified';
  className?: string;
}

export function SecurityBadge({ type, className }: SecurityBadgeProps) {
  const getBadgeConfig = () => {
    switch (type) {
      case 'ssl':
        return {
          icon: 'ri-shield-check-line',
          text: 'SSL Secured',
          color: 'text-green-400',
        };
      case 'mfa':
        return {
          icon: 'ri-fingerprint-line',
          text: '2FA Protected',
          color: 'text-blue-400',
        };
      case 'encryption':
        return {
          icon: 'ri-lock-line',
          text: '256-bit Encryption',
          color: 'text-purple-400',
        };
      case 'verified':
        return {
          icon: 'ri-verified-badge-line',
          text: 'Verified Platform',
          color: 'text-yellow-400',
        };
      default:
        return {
          icon: 'ri-shield-line',
          text: 'Secure',
          color: 'text-gray-400',
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center space-x-2 glass-card-subtle rounded-lg px-3 py-2 ${className}`}
    >
      <i className={`${config.icon} ${config.color} text-sm`}></i>
      <span className="text-white/80 text-xs font-medium">{config.text}</span>
    </motion.div>
  );
}

export function SecurityIndicators() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <SecurityBadge type="ssl" />
      <SecurityBadge type="mfa" />
      <SecurityBadge type="encryption" />
      <SecurityBadge type="verified" />
    </div>
  );
}

export function TrustIndicators() {
  const indicators = [
    { icon: 'ri-user-line', text: '10,000+ Users', color: 'text-blue-400' },
    { icon: 'ri-bitcoin-line', text: '₿500+ Transacted', color: 'text-yellow-400' },
    { icon: 'ri-star-line', text: '4.9/5 Rating', color: 'text-green-400' },
    { icon: 'ri-shield-check-line', text: 'Audited', color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {indicators.map((indicator, index) => (
        <motion.div
          key={indicator.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-2 glass-card-subtle rounded-lg px-3 py-2"
        >
          <i className={`${indicator.icon} ${indicator.color} text-sm`}></i>
          <span className="text-white/80 text-xs font-medium">{indicator.text}</span>
        </motion.div>
      ))}
    </div>
  );
}