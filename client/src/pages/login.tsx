import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { useAuth } from '@/hooks/use-auth';
import { WalletModal } from '@/components/shared/WalletModal';
import { FloatingLabel } from '@/components/shared/FloatingLabel';
import { RippleButton } from '@/components/shared/RippleButton';
import { BiometricAuth } from '@/components/shared/BiometricAuth';
import { SocialLogin } from '@/components/shared/SocialLogin';
import { FloatingParticles, GeometricShapes } from '@/components/shared/FloatingParticles';
import { ProgressIndicator } from '@/components/shared/ProgressIndicator';
import { Checkbox } from '@/components/ui/checkbox';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
});

export default function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setLocation] = useLocation();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const authSteps = ['Choose Method', 'Enter Details', 'Verify'];

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setCurrentStep(2);
    try {
      await login(values.email, values.password);
      // Redirect to dashboard after successful login
      setLocation('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setCurrentStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const handleBiometricSuccess = () => {
    setLocation('/dashboard');
  };

  const handleBiometricError = (error: string) => {
    console.error('Biometric auth error:', error);
  };

  const handleSocialSuccess = (provider: string) => {
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <FloatingParticles />
      <GeometricShapes />
      
      <motion.div
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="glass-card glass-card-glow p-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressIndicator 
              steps={authSteps}
              currentStep={currentStep}
            />
          </div>
          
          <Tabs defaultValue="email" onValueChange={() => setCurrentStep(1)}>
            <div className="text-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
              </motion.div>
              <p className="text-white/70">
                Sign in to your account to access your dashboard
              </p>
            </div>
            
            <div className="glass rounded-2xl p-1 mb-6">
              <TabsList className="grid grid-cols-3 bg-transparent">
                <TabsTrigger 
                  value="email" 
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-xl"
                >
                  Email
                </TabsTrigger>
                <TabsTrigger 
                  value="wallet"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-xl"
                >
                  Wallet
                </TabsTrigger>
                <TabsTrigger 
                  value="biometric"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70 rounded-xl"
                >
                  Biometric
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="email">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FloatingLabel
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="your@email.com"
                      required
                    />
                    
                    <FloatingLabel
                      label="Password"
                      type="password"
                      value={password}
                      onChange={setPassword}
                      placeholder="Enter your password"
                      showPasswordToggle
                      showStrengthIndicator
                      required
                    />
                    
                    <div className="flex items-center justify-between">
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="glass-checkbox"
                              />
                            </FormControl>
                            <FormLabel className="text-white/80 text-sm cursor-pointer">
                              Remember me
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm">
                        Forgot password?
                      </a>
                    </div>
                    
                    <RippleButton 
                      type="submit" 
                      variant="primary"
                      className="w-full text-lg py-4" 
                      loading={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </RippleButton>
                  </form>
                </Form>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-white/60">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <SocialLogin onSuccess={handleSocialSuccess} />
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-white/70">
                    Don't have an account?{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium">
                      Sign up
                    </a>
                  </p>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="biometric">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="glass rounded-3xl p-8 mb-6 inline-block">
                  <i className="ri-fingerprint-line text-blue-400 text-6xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Biometric Authentication</h3>
                <p className="text-white/70 mb-8 max-w-md mx-auto">
                  Use your fingerprint, face, or other biometric data to sign in securely.
                </p>
                  
                <BiometricAuth 
                  onSuccess={handleBiometricSuccess}
                  onError={handleBiometricError}
                />
                
                <div className="text-center mt-6">
                  <p className="text-sm text-white/60">
                    Biometric authentication provides the highest level of security
                  </p>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="wallet">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="glass rounded-3xl p-8 mb-6 inline-block">
                  <BitcoinIcon className="text-blue-400 text-6xl" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Connect with MetaMask</h3>
                <p className="text-white/70 mb-8 max-w-md mx-auto">
                  Use your cryptocurrency wallet to sign in securely without a password.
                </p>
                <RippleButton 
                  variant="primary"
                  className="text-lg px-8 py-4 w-full"
                  onClick={handleConnectWallet}
                >
                  <i className="ri-wallet-3-line mr-3"></i>
                  Connect Wallet
                </RippleButton>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-white/60">
                    By connecting your wallet, you agree to our{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                      Terms of Service
                    </a>
                  </p>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
          
          {/* Security Features Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 glass-card-subtle rounded-lg"
          >
            <div className="flex items-center text-sm text-white/70">
              <i className="ri-shield-check-line text-green-400 mr-2"></i>
              <span>Protected by 256-bit SSL encryption and multi-factor authentication</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}
              
              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>
                <div className="text-center">
                  <p className="text-white/70">
                    Don't have an account?{" "}
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="wallet">
              <div className="text-center py-8">
                <div className="glass rounded-3xl p-8 mb-6 inline-block">
                  <BitcoinIcon className="text-blue-400 text-6xl" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Connect with MetaMask</h3>
                <p className="text-white/70 mb-8 max-w-md mx-auto">
                  Use your cryptocurrency wallet to sign in securely without a password.
                </p>
                <button 
                  className="glass-button text-lg px-8 py-4 w-full"
                  onClick={handleConnectWallet}
                >
                  <i className="ri-wallet-3-line mr-3"></i>
                  Connect Wallet
                </button>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-white/60">
                  By connecting your wallet, you agree to our{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Terms of Service
                  </a>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
      
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
}