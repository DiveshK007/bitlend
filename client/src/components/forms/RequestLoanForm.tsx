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
      <DialogContent className="sm:max-w-[600px] glass-white">
        <div className="relative">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-gray-900">Request a Loan</DialogTitle>
            <DialogDescription className="text-gray-700">
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
                    <FormLabel className="text-gray-900 font-medium">Loan Amount (BTC)</FormLabel>
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
                        className="w-full text-center text-xl font-bold p-3 glass-input-dark rounded-md"
                          step={0.01}
                          min={0.01}
                          max={10}
                          {...field}
                          onChange={(e) => {
                    <FormItem className="glass-card-subtle rounded-lg p-6 flex flex-row items-center justify-between">
                            if (!isNaN(value)) {
                        <FormLabel className="text-white font-medium text-base">Collateral</FormLabel>
                        <FormDescription className="text-white/70">
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-gray-600">
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
                      <FormLabel className="text-gray-900 font-medium">Interest Rate (%)</FormLabel>
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
                            className="w-full text-center font-bold p-3 glass-input-dark rounded-md"
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
                      <FormDescription className="text-gray-600">
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
                      <FormLabel className="text-gray-900 font-medium">Duration (Months)</FormLabel>
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
                            className="w-full text-center font-bold p-3 glass-input-dark rounded-md"
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
                      <FormDescription className="text-gray-600">
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
                  <FormItem className="p-6 border border-gray-300 rounded-lg bg-gray-50 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                      <FormLabel className="text-gray-900 font-medium text-base">Collateral</FormLabel>
                      <FormDescription className="text-gray-600">
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
              
              <div className="p-6 glass-card-subtle rounded-lg space-y-3">
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
                <Button 
                  type="button" 
                  onClick={onClose}
                  className="px-8 py-3 glass-button-outline"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="px-8 py-3 text-lg font-medium glass-button-primary"
                >
                  Create Loan Request
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}