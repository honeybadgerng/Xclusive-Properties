import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="text-muted-foreground mb-6">
                Contact our team of experts today to start your journey towards
                finding your dream property. Whether you're looking to buy,
                rent, or invest, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+2348059522376">
                  <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us
                  </Button>
                </a>
                <a href="mailto:rjbxclusive@gmail.com">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send an Inquiry
                  </Button>
                </a>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-muted p-6 rounded-lg inline-block">
                <h3 className="text-xl font-semibold mb-4">
                  Download Our Mobile App
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get the best experience with our mobile application. Available
                  for iOS and Android devices.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-3">
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
                      alt="Download on App Store"
                      className="h-10"
                    />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                      alt="Get it on Google Play"
                      className="h-10"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
