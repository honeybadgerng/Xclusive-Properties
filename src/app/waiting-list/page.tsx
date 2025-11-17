"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Lock,
  CheckCircle,
  Blocks,
  Users,
  ArrowRight,
} from "lucide-react";

const waitlistSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email too long"),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number too long"),
  investmentRange: z.string().min(1, "Please select an investment range"),
  investmentPreference: z
    .string()
    .min(1, "Please select your investment preference"),
  paymentPreference: z.string().min(1, "Please select your payment preference"),
  wantsUpdates: z.boolean(),
});

export default function WaitingList() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    investmentRange: "",
    investmentPreference: "",
    paymentPreference: "",
    wantsUpdates: true,
  });

  useEffect(() => {
    document.title =
      "Invest in Real Estate From ₦5,000 | Xclusive Properties Waiting List";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription)
      metaDescription.setAttribute(
        "content",
        "Join the waiting list for Africa's tokenized real estate platform. Invest small amounts in verified properties and earn rental income."
      );

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords)
      metaKeywords.setAttribute(
        "content",
        "fractional real estate Nigeria, property investment, tokenized real estate, invest with ₦5k, blockchain real estate"
      );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = waitlistSchema.parse(formData);
      setIsSubmitting(true);

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!res.ok) throw new Error("Failed to save entry");

      router.push("/waitlist-confirmation");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to join waitlist. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy/5 via-background to-gold/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy/20 via-gold/10 to-transparent" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-navy via-primary to-navy bg-clip-text text-transparent">
                Invest in Real Estate From
              </span>
              <br />
              <span className="text-gold text-5xl md:text-7xl">₦5,000</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the waiting list for Africa's first{" "}
              <span className="text-gold font-semibold">
                tokenized property
              </span>{" "}
              investment platform.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-navy to-primary hover:from-navy/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
              onClick={() =>
                document
                  .getElementById("form-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Join the Waiting List
              <ArrowRight className="ml-2" />
            </Button>
          </div>

          {/* Value Proposition */}
          <div className="grid md:grid-cols-2 gap-4 mb-16">
            {[
              "Invest small amounts in real estate",
              "Target returns between 8% and 12% yearly",
              "Own fractions of verified properties",
              "Withdraw anytime depending on property rules",
              "Pay in naira or USDT",
              "Secure transactions with smart contracts",
            ].map((text, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${
                  i % 2 === 0
                    ? "from-navy/10 to-navy/5 border-navy/20"
                    : "from-gold/10 to-gold/5 border-gold/20"
                } border rounded-lg p-6 space-y-3 hover:shadow-lg transition-shadow`}
              >
                <CheckCircle
                  className={`w-8 h-8 ${
                    i % 2 === 0 ? "text-gold" : "text-navy"
                  }`}
                />
                <h3 className="font-semibold text-foreground">{text}</h3>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-navy to-gold bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: "Create your account",
                  desc: "Sign up with your email and verify your identity",
                  color: "from-navy to-primary",
                  textColor: "text-navy",
                },
                {
                  step: 2,
                  title: "Choose a verified property",
                  desc: "Browse tokenized properties across Nigeria",
                  color: "from-gold to-gold/80",
                  textColor: "text-gold",
                },
                {
                  step: 3,
                  title: "Buy shares and track returns",
                  desc: "Invest from ₦5,000 and earn rental income",
                  color: "from-navy to-primary",
                  textColor: "text-navy",
                },
              ].map((item) => (
                <div key={item.step} className="text-center space-y-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold ${item.textColor}`}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-16 grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              {
                icon: Shield,
                label: "Secure",
                color: "text-navy",
                bg: "bg-navy/5",
              },
              {
                icon: Lock,
                label: "Transparent",
                color: "text-gold",
                bg: "bg-gold/5",
              },
              {
                icon: CheckCircle,
                label: "Compliant",
                color: "text-navy",
                bg: "bg-navy/5",
              },
              {
                icon: Blocks,
                label: "Blockchain",
                color: "text-gold",
                bg: "bg-gold/5",
              },
              {
                icon: Users,
                label: "Verified",
                color: "text-navy",
                bg: "bg-navy/5",
              },
            ].map(({ icon: Icon, label, color, bg }, i) => (
              <div
                key={i}
                className={`text-center space-y-2 p-4 rounded-lg ${bg} hover:${bg.replace(
                  "/5",
                  "/10"
                )} transition-colors`}
              >
                <Icon className={`w-12 h-12 mx-auto ${color}`} />
                <p className={`text-sm font-semibold ${color}`}>{label}</p>
              </div>
            ))}
          </div>

          {/* Form Section */}
          <div
            id="form-section"
            className="bg-gradient-to-br from-white to-gold/5 border-2 border-gold rounded-xl p-8 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-center mb-2">
              <span className="bg-gradient-to-r from-navy to-gold bg-clip-text text-transparent">
                Join the Waiting List
              </span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Be among the first to invest in tokenized African real estate
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="+234 XXX XXX XXXX"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Investment Interest Range *</Label>
                <RadioGroup
                  value={formData.investmentRange}
                  onValueChange={(value) =>
                    setFormData({ ...formData, investmentRange: value })
                  }
                >
                  {[
                    { id: "r1", label: "₦5,000 to ₦20,000", value: "5k-20k" },
                    { id: "r2", label: "₦20,000 to ₦50,000", value: "20k-50k" },
                    {
                      id: "r3",
                      label: "₦50,000 to ₦200,000",
                      value: "50k-200k",
                    },
                    { id: "r4", label: "₦200,000+", value: "₦200k+" },
                  ].map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={opt.id} />
                      <Label
                        htmlFor={opt.id}
                        className="font-normal cursor-pointer"
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Investment Preference *</Label>
                <RadioGroup
                  value={formData.investmentPreference}
                  onValueChange={(value) =>
                    setFormData({ ...formData, investmentPreference: value })
                  }
                >
                  {[
                    {
                      id: "p1",
                      label: "Rental Income",
                      value: "rental-income",
                    },
                    { id: "p2", label: "Flipping", value: "flipping" },
                    {
                      id: "p3",
                      label: "Long-term Holding",
                      value: "long-term",
                    },
                  ].map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={opt.id} />
                      <Label
                        htmlFor={opt.id}
                        className="font-normal cursor-pointer"
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Payment Preference *</Label>
                <RadioGroup
                  value={formData.paymentPreference}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentPreference: value })
                  }
                >
                  {[
                    { id: "pay1", label: "Naira", value: "naira" },
                    { id: "pay2", label: "USDT", value: "usdt" },
                    { id: "pay3", label: "Both", value: "both" },
                  ].map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={opt.id} />
                      <Label
                        htmlFor={opt.id}
                        className="font-normal cursor-pointer"
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="updates"
                  checked={formData.wantsUpdates}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      wantsUpdates: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="updates" className="font-normal cursor-pointer">
                  I want early access and launch updates
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-lg bg-gradient-to-r from-navy to-primary hover:from-navy/90 hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Join the Waiting List"}
                <ArrowRight className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
