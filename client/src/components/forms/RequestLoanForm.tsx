import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { formatBTC, calculateRepaymentAmount } from '@/lib/utils';

const formSchema = z.object({
  amount: z.number().min(0.01, {
    message: "Amount must be at least 0.01 BTC",
  }).max(10, {
    message: "Amount cannot exceed 10 BTC",
  }),
  interest: z.number().min(1, {
    message: "Interest rate must be at least 1%",
  }).max(15, {
    message: "Interest rate cannot exceed 15%",
  }),
  durationMonths: z.number().int().min(1, {
    message: "Duration must be at least 1 month",
  }).max(36, {
    message: "Duration cannot exceed 36 months",
  }),
  hasCollateral: z.boolean().default(false),
});

interface RequestLoanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RequestLoanForm({ isOpen, onClose, onSuccess }: RequestLoanFormProps) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0.5,
      interest: 5,
      durationMonths: 6,
      hasCollateral: false,
    },
  });

  const watchAmount = form.watch('amount');
  const watchInterest = form.watch('interest');
  const watchDuration = form.watch('durationMonths');

  const repaymentAmount = calculateRepaymentAmount(
    watchAmount, 
    watchInterest, 
    watchDuration
  );

  const monthlyPayment = repaymentAmount / watchDuration;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await apiRequest('POST', '/api/loans/request', values);
      
      toast({
        title: "Loan Request Created",
        description: "Your loan request has been successfully posted to the marketplace.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create loan request",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] glass-card border-0 bg-transparent">
        <div className="relative">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-white">Request a Loan</DialogTitle>
            <DialogDescription className="text-white/70">
              Create a loan request to borrow Bitcoin from lenders in our marketplace.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Loan Amount (BTC)</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Slider
                          min={0.01}
                          max={10}
                          step={0.01}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="w-full"
                        />
                        <input
                          type="number"
                          className="glass-input w-full text-center text-xl font-bold"
                          step={0.01}
                          min={0.01}
                          max={10}
                          {...field}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-white/60">
                      Amount of Bitcoin you want to borrow
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Interest Rate (%)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            min={1}
                            max={15}
                            step={0.1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                          <input
                            type="number"
                            className="glass-input w-full text-center font-bold"
                            step={0.1}
                            min={1}
                            max={15}
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-white/60">
                        Yearly interest rate you're willing to pay
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="durationMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Duration (Months)</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Slider
                            min={1}
                            max={36}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                          <input
                            type="number"
                            className="glass-input w-full text-center font-bold"
                            min={1}
                            max={36}
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value)) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-white/60">
                        Loan repayment period
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="hasCollateral"
                render={({ field }) => (
                  <FormItem className="glass p-6 rounded-2xl flex flex-row items-center justify-between">
                    <div className="space-y-1">
                      <FormLabel className="text-white font-medium text-base">Collateral</FormLabel>
                      <FormDescription className="text-white/60">
                        Are you offering collateral for this loan?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="glass p-6 rounded-2xl space-y-3">
                <h3 className="text-white font-medium mb-4">Loan Summary</h3>
                <div className="flex justify-between text-white/70">
                  <span>Total Repayment</span>
                  <span className="font-bold text-white">{formatBTC(repaymentAmount)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Monthly Payment</span>
                  <span className="font-bold text-white">{formatBTC(monthlyPayment)}</span>
                </div>
              </div>
              
              <div className="flex gap-4 justify-end pt-4">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="glass rounded-2xl px-8 py-3 text-white/70 hover:text-white font-medium transition-all duration-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="glass-button px-8 py-3 text-lg font-medium"
                >
                  Create Loan Request
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}