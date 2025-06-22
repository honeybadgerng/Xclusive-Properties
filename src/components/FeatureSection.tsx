
import React from 'react';
import { Shield, Clock, Search, PiggyBank, MapPin, CreditCard } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="h-10 w-10 text-secondary" />,
    title: 'Verified Properties',
    description: 'All our properties are thoroughly inspected and verified to ensure quality standards.'
  },
  {
    icon: <Clock className="h-10 w-10 text-secondary" />,
    title: 'Quick Processing',
    description: 'Fast and efficient booking process with minimal paperwork and quick approvals.'
  },
  {
    icon: <Search className="h-10 w-10 text-secondary" />,
    title: 'Advanced Search',
    description: 'Find exactly what you need with our advanced property search and filtering options.'
  },
  {
    icon: <PiggyBank className="h-10 w-10 text-secondary" />,
    title: 'Flexible Payments',
    description: 'Multiple payment options including Naira, Pi cryptocurrency, and installment plans.'
  },
  {
    icon: <MapPin className="h-10 w-10 text-secondary" />,
    title: 'Prime Locations',
    description: 'Exclusive properties in the most sought-after locations across Nigeria.'
  },
  {
    icon: <CreditCard className="h-10 w-10 text-secondary" />,
    title: 'Secure Transactions',
    description: 'Safe and secure payment processing with multiple payment options.'
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Xclusive Realtors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide a premium real estate experience with exclusive features and benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-primary/5 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
