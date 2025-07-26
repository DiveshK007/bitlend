import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Help() {
  const faqs = [
    {
      question: "What is BitLend?",
      answer: "BitLend is a peer-to-peer Bitcoin lending platform that connects borrowers with lenders. It allows users to request loans or lend their Bitcoin to earn interest."
    },
    {
      question: "How do I request a loan?",
      answer: "To request a loan, navigate to the Marketplace page and click on the 'Request Loan' button. Fill in the loan amount, interest rate, duration, and whether you're providing collateral."
    },
    {
      question: "How do I lend my Bitcoin?",
      answer: "To offer a loan, go to the Marketplace page and click on the 'Offer Loan' button. Specify the loan amount, interest rate, duration, and whether you require collateral from borrowers."
    },
    {
      question: "How is my Bitcoin secured?",
      answer: "Your Bitcoin is secured through smart contracts and our secure wallet integration. All transactions are recorded on the blockchain for transparency and security."
    },
    {
      question: "What are the interest rates?",
      answer: "Interest rates are set by the users of the platform. As a borrower, you can propose an interest rate, and as a lender, you can set your desired interest rate for your offers."
    },
    {
      question: "How do repayments work?",
      answer: "Repayments are made according to the loan terms. You can view your active loans in the 'My Loans' section and make repayments through the platform."
    }
  ];

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>Help & Support</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Find answers to common questions about using BitLend</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: '#ffffff' }}>
              <BitcoinIcon className="mr-2" style={{ color: '#007aff' }} />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Common questions about using the BitLend platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger style={{ color: '#ffffff' }}>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#ffffff' }}>Contact Support</CardTitle>
            <CardDescription>
              Need help with something specific? Get in touch with our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <i className="ri-mail-line text-lg mr-3" style={{ color: '#007aff' }}></i>
                <span style={{ color: '#ffffff' }}>support@bitlend.io</span>
              </div>
              <div className="flex items-center">
                <i className="ri-customer-service-line text-lg mr-3" style={{ color: '#007aff' }}></i>
                <span style={{ color: '#ffffff' }}>+1 (800) BIT-LEND</span>
              </div>
              <div className="flex items-center">
                <i className="ri-global-line text-lg mr-3" style={{ color: '#007aff' }}></i>
                <span style={{ color: '#ffffff' }}>www.bitlend.io</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: '#ffffff' }}>Resources</CardTitle>
            <CardDescription>
              Additional resources to help you get the most out of BitLend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="ri-book-open-line text-lg mr-3" style={{ color: '#007aff' }}></i>
                <span style={{ color: '#ffffff' }}>User Guide</span>
              </li>
              <li className="flex items-center">
                <i className="ri-video-line text-lg mr-3" style={{ color: '#007aff' }}></i>
                <span style={{ color: '#ffffff' }}>Tutorial Videos</span>
              </li>
              <li className="flex items-center">
                <i className="ri-file-list-line text-lg mr-3" style={{ color: '#007aff' }}></i>
                <span style={{ color: '#ffffff' }}>Terms of Service</span>
              </li>
              <li className="flex items-center">
                <i className="ri-shield-line text-lg mr-3" style={{ color: '#007aff' }}></i>
                <span style={{ color: '#ffffff' }}>Privacy Policy</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}