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

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [, setLocation] = useLocation();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      // Redirect to dashboard after successful login
      setLocation('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      
      <motion.div
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="glass-card p-8">
          <Tabs defaultValue="email">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/70">
                Sign in to your account to access your dashboard
              </p>
            </div>
            
            <div className="glass rounded-2xl p-1 mb-6">
              <TabsList className="grid grid-cols-2 bg-transparent">
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
              </TabsList>
            </div>
            
            <TabsContent value="email">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">Email</FormLabel>
                        <FormControl>
                          <input 
                            className="glass-input w-full py-4 px-5 text-lg"
                            placeholder="your@email.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium">Password</FormLabel>
                        <FormControl>
                          <input 
                            type="password" 
                            className="glass-input w-full py-4 px-5 text-lg"
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <button 
                    type="submit" 
                    className="glass-button w-full text-lg py-4" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              </Form>
              
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