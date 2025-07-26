import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function ProgressIndicator({ steps, currentStep, className }: ProgressIndicatorProps) {
  return (
    <div className={cn('flex items-center justify-center space-x-4', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'progress-step w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                index <= currentStep && 'active'
              )}
            >
              {index < currentStep ? (
                <i className="ri-check-line text-white"></i>
              ) : (
                <span className="text-white">{index + 1}</span>
              )}
            </div>
            <span className="text-xs text-white/70 mt-2 text-center max-w-20">
              {step}
            </span>
          </div>
          
          {index < steps.length - 1 && (
            <div
              className={cn(
                'h-0.5 w-12 transition-all duration-300',
                index < currentStep 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                  : 'bg-white/20'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}