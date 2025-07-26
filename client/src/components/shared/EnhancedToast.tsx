import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export function EnhancedToaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const getToastClass = () => {
          switch (variant) {
            case 'destructive':
              return 'toast-error';
            default:
              return 'toast-success';
          }
        };

        return (
          <Toast 
            key={id} 
            className={cn(getToastClass(), 'border-0')}
            {...props}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="flex items-center">
                  {variant === 'destructive' ? (
                    <i className="ri-error-warning-line mr-2 text-lg"></i>
                  ) : (
                    <div className="success-checkmark mr-2">
                      <i className="ri-check-line text-lg"></i>
                    </div>
                  )}
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-white/90">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-white/70 hover:text-white" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}