
import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Adebayo Johnson',
    title: 'Property Investor',
    content: 'Working with Xclusive Realtors has been an absolute pleasure. They helped me find the perfect investment property and guided me through the entire process.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Ngozi Okafor',
    title: 'Home Buyer',
    content: 'After months of searching, Xclusive Realtors found us our dream home. Their attention to detail and understanding of our needs made all the difference.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'Chinaza Eze',
    title: 'Business Owner',
    content: 'I needed a commercial property for my business, and the team at Xclusive Realtors delivered beyond expectations. Professional service from start to finish.',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience with Xclusive Realtors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-white/70 text-sm">{testimonial.title}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-secondary fill-secondary' : 'text-white/30'}`} 
                  />
                ))}
              </div>
              
              <p className="text-white/80">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
