import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FloatingLabelProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showPasswordToggle?: boolean;
  showStrengthIndicator?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export function FloatingLabel({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className,
  showPasswordToggle = false,
  showStrengthIndicator = false,
  required = false,
  disabled = false,
}: FloatingLabelProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = isFocused || value.length > 0;
  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
  };

  const passwordStrength = type === 'password' ? getPasswordStrength(value) : null;

  return (
    <div className="floating-label-container">
      <div className="relative">
        <input
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isFocused ? placeholder : ''}
          className={cn(
            'glass-input-floating w-full',
            className
          )}
          required={required}
          disabled={disabled}
        />
        
        <label
          className={cn(
            'floating-label',
            isActive && 'active',
            value && 'filled'
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            <i className={`ri-${showPassword ? 'eye-off' : 'eye'}-line text-lg`}></i>
          </button>
        )}
      </div>

      {showStrengthIndicator && type === 'password' && value && (
        <div className={cn('password-strength', passwordStrength)} />
      )}
    </div>
  );
}