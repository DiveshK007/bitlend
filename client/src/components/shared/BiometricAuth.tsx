import React, { useState } from 'react';
import { RippleButton } from './RippleButton';
import { useToast } from '@/hooks/use-toast';

interface BiometricAuthProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export function BiometricAuth({ onSuccess, onError }: BiometricAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { toast } = useToast();

  const handleBiometricAuth = async () => {
    if (!window.navigator.credentials) {
      onError('Biometric authentication is not supported on this device');
      return;
    }

    setIsAuthenticating(true);

    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error('WebAuthn is not supported');
      }

      // Simulate biometric authentication
      // In a real app, this would use the WebAuthn API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success (80% chance)
      if (Math.random() > 0.2) {
        toast({
          title: 'Authentication Successful',
          description: 'You have been authenticated using biometrics',
        });
        onSuccess();
      } else {
        throw new Error('Biometric authentication failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Biometric authentication failed';
      toast({
        title: 'Authentication Failed',
        description: message,
        variant: 'destructive',
      });
      onError(message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <RippleButton
      variant="primary"
      className="biometric-button w-full"
      onClick={handleBiometricAuth}
      loading={isAuthenticating}
    >
      <div className="flex items-center justify-center">
        <i className="ri-fingerprint-line text-2xl mr-3"></i>
        <span>{isAuthenticating ? 'Authenticating...' : 'Use Biometric'}</span>
      </div>
    </RippleButton>
  );
}