import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function RippleButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    // Call original onClick
    if (onClick) {
      onClick(event);
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return 'glass-button-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'glass-button-outline';
      case 'glass':
        return 'glass-button';
      default:
        return 'glass-button-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        getVariantClass(),
        getSizeClass(),
        'relative overflow-hidden',
        loading && 'opacity-70 cursor-not-allowed',
        className
      )}
      onClick={createRipple}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="loading-spinner w-5 h-5 mr-2" />
          Loading...
        </div>
      ) : (
        children
      )}

      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
          }}
        />
      ))}
    </button>
  );
}