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
import { calculateRepaymentAmount, formatBTC } from '@/lib/utils';

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

interface OfferLoanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function OfferLoanForm({ isOpen, onClose, onSuccess }: OfferLoanFormProps) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0.5,
      interest: 4,
      durationMonths: 6,
      hasCollateral: true,
    },
  });

  const watchAmount = form.watch('amount');
  const watchInterest = form.watch('interest');
  const watchDuration = form.watch('durationMonths');

  const expectedReturn = calculateRepaymentAmount(
    watchAmount, 
    watchInterest, 
    watchDuration
  );

  const profitAmount = expectedReturn - watchAmount;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await apiRequest('POST', '/api/loans/offer', values);
      
      toast({
        title: "Loan Offer Created",
        description: "Your loan offer has been successfully posted to the marketplace.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create loan offer",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] glass-white">
        <DialogHeader>
          <DialogTitle className="text-white font-bold">Offer a Loan</DialogTitle>
          <DialogDescription className="text-white/70">
            Create a loan offer to lend your Bitcoin to borrowers.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        className="w-full text-center text-xl font-bold glass-input-dark"
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
                  <FormDescription className="text-white/70">
                    Amount of Bitcoin you want to lend
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
                          className="w-full text-center font-bold glass-input-dark"
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
                    <FormDescription className="text-white/70">
                      Yearly interest rate you want to earn
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
                          className="w-full text-center font-bold glass-input-dark"
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
                    <FormDescription className="text-white/70">
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
                <FormItem className="glass-card-subtle rounded-lg p-4 flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <FormLabel className="text-white font-medium text-base">Require Collateral</FormLabel>
                    <FormDescription className="text-white/70">
                      Require borrowers to provide collateral?
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
            
            <div className="glass-card-subtle rounded-lg p-4 space-y-3">
              <h3 className="text-white font-medium">Expected Returns</h3>
              <div className="flex justify-between">
                <span className="text-white/70">Expected Return</span>
                <span className="font-medium text-white">{formatBTC(expectedReturn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Profit</span>
                <span className="font-medium text-green-400">{formatBTC(profitAmount)}</span>
              </div>
            </div>
            
            <div className="flex gap-3 justify-end pt-4">
              <Button 
                type="button" 
                onClick={onClose}
                className="px-8 py-3 glass-button-outline"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="px-8 py-3 glass-button-primary"
              >
                Create Loan Offer
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}