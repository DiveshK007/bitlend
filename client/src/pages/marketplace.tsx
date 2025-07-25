import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketplaceLoanCard } from '@/components/shared/MarketplaceLoanCard';
import { RequestLoanForm } from '@/components/forms/RequestLoanForm';
import { OfferLoanForm } from '@/components/forms/OfferLoanForm';
import { Loan } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Marketplace() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQuery({
    queryKey: ['/api/loans/marketplace'],
  });

  const marketplaceLoans = queryClient.data || [];
  const isLoading = queryClient.isLoading;

  const requestLoans = marketplaceLoans.filter((loan: Loan) => loan.type === 'request');
  const offerLoans = marketplaceLoans.filter((loan: Loan) => loan.type === 'offer');

  const handleAcceptLoan = async (loan: Loan) => {
    try {
      await apiRequest('POST', `/api/loans/${loan.id}/accept`, {});
      
      toast({
        title: 'Success!',
        description: loan.type === 'request' 
          ? 'You have successfully funded this loan request.' 
          : 'You have successfully accepted this loan offer.',
      });
      
      queryClient.refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to process the loan',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitRequest = () => {
    setShowRequestForm(false);
    queryClient.refetch();
    toast({
      title: 'Request Created',
      description: 'Your loan request has been posted to the marketplace.',
    });
  };

  const handleSubmitOffer = () => {
    setShowOfferForm(false);
    queryClient.refetch();
    toast({
      title: 'Offer Created',
      description: 'Your loan offer has been posted to the marketplace.',
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-2 sm:mb-0">Loan Marketplace</h1>
          <div className="flex space-x-3">
            <Button onClick={() => setShowRequestForm(true)}>
              <i className="ri-add-line mr-2"></i> Request Loan
            </Button>
            <Button variant="outline" onClick={() => setShowOfferForm(true)}>
              <i className="ri-coin-line mr-2"></i> Offer Loan
            </Button>
          </div>
        </div>

        <Card>
          <Tabs defaultValue="requests">
            <CardContent className="pt-6">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="requests">Loan Requests</TabsTrigger>
                <TabsTrigger value="offers">Loan Offers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="requests">
                {isLoading ? (
                  <div className="py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading loan requests...</p>
                  </div>
                ) : requestLoans.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">No loan requests available</p>
                    <Button onClick={() => setShowOfferForm(true)}>Create a Loan Offer</Button>
                  </div>
                ) : (
                  <motion.div 
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {requestLoans.map((loan: Loan) => (
                      <motion.div key={loan.id} variants={fadeIn}>
                        <MarketplaceLoanCard 
                          loan={loan}
                          rating={4.5}
                          onAccept={handleAcceptLoan}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TabsContent>
              
              <TabsContent value="offers">
                {isLoading ? (
                  <div className="py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading loan offers...</p>
                  </div>
                ) : offerLoans.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">No loan offers available</p>
                    <Button onClick={() => setShowRequestForm(true)}>Create a Loan Request</Button>
                  </div>
                ) : (
                  <motion.div 
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {offerLoans.map((loan: Loan) => (
                      <motion.div key={loan.id} variants={fadeIn}>
                        <MarketplaceLoanCard 
                          loan={loan}
                          rating={4.7}
                          onAccept={handleAcceptLoan}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>

      {showRequestForm && (
        <RequestLoanForm 
          isOpen={showRequestForm} 
          onClose={() => setShowRequestForm(false)}
          onSuccess={handleSubmitRequest}
        />
      )}

      {showOfferForm && (
        <OfferLoanForm 
          isOpen={showOfferForm} 
          onClose={() => setShowOfferForm(false)}
          onSuccess={handleSubmitOffer}
        />
      )}
    </div>
  );
}
