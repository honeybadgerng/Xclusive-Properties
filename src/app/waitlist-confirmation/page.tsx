"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Shield,
  Lock,
  Blocks,
  Users,
  ArrowRight,
} from "lucide-react";

export default function WaitlistConfirmation() {
  const router = useRouter();

  // Set page title and meta tags
  useEffect(() => {
    document.title = "You're on the List! | Xclusive Properties";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Thank you for joining the Xclusive Properties waiting list. You will be notified when our tokenized real estate platform launches."
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "fractional real estate Nigeria, tokenized properties, real estate investment, early access, Xclusive Properties"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-gold/10 flex flex-col items-center justify-center px-4 py-16">
      {/* Hero Confirmation */}
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="mx-auto w-28 h-28 rounded-full bg-gradient-to-br from-gold to-gold/80 flex items-center justify-center shadow-2xl animate-pulse">
          <CheckCircle className="w-16 h-16 text-white" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-navy to-gold bg-clip-text text-transparent">
              You're on the list!
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Thank you for joining the{" "}
            <span className="text-gold font-semibold">Xclusive Properties</span>{" "}
            waiting list. We’ll keep you updated on our launch.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-gradient-to-br from-navy/5 to-gold/5 border-2 border-gold/30 rounded-xl p-8 shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold text-navy text-center mb-4">
            What happens next?
          </h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                You’ll receive a confirmation email shortly
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                We’ll notify you when the platform goes live
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Early access to our first tokenized properties
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Exclusive investment insights and updates in your inbox
              </span>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Button
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-navy to-primary hover:from-navy/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
            onClick={() => router.push("/properties")}
          >
            Explore Our Properties
            <ArrowRight className="ml-2" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full md:w-auto border-2 border-gold text-gold hover:bg-gold/10"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
          <div className="text-center space-y-2 p-4 rounded-lg bg-navy/5 hover:bg-navy/10 transition-colors">
            <Shield className="w-12 h-12 mx-auto text-navy" />
            <p className="text-sm font-semibold text-navy">Secure</p>
          </div>
          <div className="text-center space-y-2 p-4 rounded-lg bg-gold/5 hover:bg-gold/10 transition-colors">
            <Lock className="w-12 h-12 mx-auto text-gold" />
            <p className="text-sm font-semibold text-gold">Transparent</p>
          </div>
          <div className="text-center space-y-2 p-4 rounded-lg bg-navy/5 hover:bg-navy/10 transition-colors">
            <CheckCircle className="w-12 h-12 mx-auto text-navy" />
            <p className="text-sm font-semibold text-navy">Compliant</p>
          </div>
          <div className="text-center space-y-2 p-4 rounded-lg bg-gold/5 hover:bg-gold/10 transition-colors">
            <Blocks className="w-12 h-12 mx-auto text-gold" />
            <p className="text-sm font-semibold text-gold">Blockchain</p>
          </div>
          <div className="text-center space-y-2 p-4 rounded-lg bg-navy/5 hover:bg-navy/10 transition-colors">
            <Users className="w-12 h-12 mx-auto text-navy" />
            <p className="text-sm font-semibold text-navy">Verified</p>
          </div>
        </div>

        {/* Footer Contact */}
        <div className="pt-8 border-t border-gold/30 text-center">
          <p className="text-sm text-muted-foreground">
            Have questions? Contact us at{" "}
            <a
              href="mailto:info@xclusiveproperties.com"
              className="text-gold font-semibold hover:underline"
            >
              info@xclusiveproperties.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
