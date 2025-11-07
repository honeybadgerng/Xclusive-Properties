"use client";
import React from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Rocket,
  Shield,
  TrendingUp,
  Coins,
  Building2,
  Zap,
  Globe,
  Lock,
  LineChart as LineChartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Investors: React.FC = () => {
  // Investment allocation data
  const investmentData = [
    { name: "Blockchain Integration", value: 40, color: "hsl(var(--primary))" },
    {
      name: "Marketing & Partnerships",
      value: 30,
      color: "hsl(var(--secondary))",
    },
    { name: "Operations & Compliance", value: 20, color: "hsl(var(--accent))" },
    { name: "Content & SEO Growth", value: 10, color: "hsl(var(--muted))" },
  ];

  // Market size data
  const marketData = [
    { name: "Nigeria Market", value: 56, color: "hsl(var(--primary))" },
    {
      name: "African Market (2030)",
      value: 600,
      color: "hsl(var(--secondary))",
    },
  ];

  // Crypto adoption
  const cryptoData = [
    { country: "Nigeria", users: 22 },
    { country: "Kenya", users: 8.5 },
    { country: "South Africa", users: 4.2 },
    { country: "Ghana", users: 2.1 },
  ];

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Smart Contract Prototype",
      description: "Deploy smart contract prototype on Polygon network",
      icon: <Rocket className="h-6 w-6" />,
      status: "In Progress",
    },
    {
      phase: "Phase 2",
      title: "Pilot Launch",
      description: "Launch pilot with 3–5 properties tokenized",
      icon: <Building2 className="h-6 w-6" />,
      status: "Upcoming",
    },
    {
      phase: "Phase 3",
      title: "Scale & Expand",
      description: "Expand to verified developers and agents in Nigeria",
      icon: <TrendingUp className="h-6 w-6" />,
      status: "Planned",
    },
    {
      phase: "Phase 4",
      title: "Global Trading",
      description:
        "Enable cross-border property investments and secondary trading",
      icon: <Globe className="h-6 w-6" />,
      status: "Planned",
    },
  ];

  const iotFeatures = [
    {
      title: "Smart Metering",
      description:
        "Automated utility monitoring and billing for water, electricity, and gas",
      icon: <Zap className="h-6 w-6 text-secondary" />,
    },
    {
      title: "Access Control",
      description: "Blockchain-based keyless entry and security management",
      icon: <Lock className="h-6 w-6 text-secondary" />,
    },
    {
      title: "Predictive Maintenance",
      description:
        "AI-powered property maintenance alerts and automated repairs",
      icon: <LineChartIcon className="h-6 w-6 text-secondary" />,
    },
    {
      title: "Remote Management",
      description:
        "Manage properties globally from your phone with real-time insights",
      icon: <Globe className="h-6 w-6 text-secondary" />,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-secondary">{`${payload[0].value}${
            payload[0].name.includes("Market") ? "B USD" : "%"
          }`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <Head>
        <title>
          Xclusive Property | Invest in Tokenized Real Estate in Africa
        </title>
        <meta
          name="description"
          content="Invest in Xclusive Property, Africa’s first blockchain-powered real estate platform. Earn from tokenized properties, trade in USDT or naira, and access verified developments across Nigeria and Africa."
        />
        <meta
          name="keywords"
          content="tokenized real estate, property investment Africa, blockchain real estate, fractional property ownership, invest in Nigeria property, real estate tokenization, Xclusive Property investors"
        />
        <meta
          property="og:title"
          content="Invest in Tokenized Real Estate with Xclusive Property"
        />
        <meta
          property="og:description"
          content="Xclusive Property connects global investors with verified African properties using blockchain tokenization. Invest, trade, and earn securely."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://xclusiveproperty.com/investment"
        />
        <meta
          property="og:image"
          content="https://xclusiveproperty.com/images/investment-banner.jpg"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://xclusiveproperty.com/investment" />

        <script type="application/ld+json">
          {`{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Xclusive Property",
      "url": "https://xclusiveproperty.com",
      "description": "Africa’s tokenized real estate investment platform connecting investors to verified properties.",
      "sameAs": [
        "https://www.linkedin.com/company/xclusiveproperty",
        "https://twitter.com/xclusiveproperty",
        "https://instagram.com/xclusiveproperty"
      ]
    }`}
        </script>
      </Head>
      <div className="bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Tokenized Real Estate Platform for Africa
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Making property investment borderless, transparent, and accessible
              through blockchain technology
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg">
                <Coins className="mr-2 h-5 w-5" />
                Investment Deck
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Schedule Meeting
              </Button>
            </div>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-destructive flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    The Problem
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Property investment in Africa is expensive and illiquid.
                  </p>
                  <p className="text-muted-foreground">
                    Cross-border investors face currency restrictions and opaque
                    land systems.
                  </p>
                  <p className="text-muted-foreground">
                    Property owners and agents lack digital exposure and access
                    to global buyers.
                  </p>
                  <p className="text-muted-foreground">
                    Traditional real estate deals are slow, manual, and
                    exclusionary.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Rocket className="h-6 w-6" />
                    Our Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    A property platform where users buy, rent, or short-let in
                    naira or USDT.
                  </p>
                  <p className="text-muted-foreground">
                    Smart contracts tokenize verified properties, allowing
                    fractional ownership and transparent records on the
                    blockchain.
                  </p>
                  <p className="text-muted-foreground">
                    Investors can hold, trade, or earn yield from property
                    tokens.
                  </p>
                  <p className="text-muted-foreground">
                    Property owners and agents gain faster liquidity and
                    verified buyers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Market Size & Investment Allocation */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Market Opportunity
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Market Size Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Size (Billions USD)</CardTitle>
                  <CardDescription>
                    Real estate market potential in Africa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={marketData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: $${value}B`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {marketData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Nigeria:</span> Over $56
                      billion (PwC)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Africa (2030):</span>{" "}
                      Projected $600+ billion
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Crypto Users:</span> 22
                      million in Nigeria (Chainalysis 2024)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Allocation Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>$250K Seed Round Allocation</CardTitle>
                  <CardDescription>Strategic fund distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={investmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {investmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Crypto Adoption Chart */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Crypto Adoption in Africa (Million Users)
                </CardTitle>
                <CardDescription>
                  Leading African markets for cryptocurrency adoption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cryptoData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis dataKey="country" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="users"
                      fill="hsl(var(--secondary))"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tokenization Roadmap */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Tokenization Roadmap
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmapPhases.map((phase, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                    {phase.status}
                  </div>
                  <CardHeader>
                    <div className="mb-4 text-primary">{phase.icon}</div>
                    <CardTitle className="text-lg">{phase.phase}</CardTitle>
                    <CardDescription className="font-semibold text-foreground">
                      {phase.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {phase.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Smart City Vision */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Smart City Vision
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Building Africa's first blockchain-powered smart city where
                investors worldwide can manage properties remotely with IoT
                technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Globe className="h-6 w-6 text-primary" />
                    Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To make real estate investment in Africa borderless,
                    transparent, and accessible to everyone through blockchain
                    technology. We're building a future where anyone, anywhere
                    can own and manage property in Africa with the tap of a
                    button.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/5 to-primary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                    Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Revolutionize African real estate by combining blockchain
                    tokenization with IoT-powered smart city infrastructure,
                    enabling fractional ownership, automated property
                    management, and seamless cross-border investment.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* IoT Technology Features */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                IoT-Powered Property Management
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {iotFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow border-secondary/20"
                  >
                    <CardHeader>
                      <div className="mb-2">{feature.icon}</div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">
                  Automated Property Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Smart Metering:
                    </span>{" "}
                    Automatically track and bill utility usage for water,
                    electricity, and gas
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Automated Enforcement:
                    </span>{" "}
                    System automatically restricts services for defaulters on
                    utility payments
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <LineChartIcon className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Predictive Maintenance:
                    </span>{" "}
                    AI detects issues before they become problems and schedules
                    repairs automatically
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Global Management:
                    </span>{" "}
                    Manage rent collection, repairs, and property operations
                    from anywhere in the world
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Business Model */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Business Model
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Listing Fees", desc: "From agents and developers" },
                {
                  title: "Transaction Commission",
                  desc: "On property sales and rentals",
                },
                { title: "Token Issuance Fee", desc: "Per property tokenized" },
                {
                  title: "Secondary Trading Fees",
                  desc: "On token marketplace",
                },
                {
                  title: "Property Management",
                  desc: "Optional management services",
                },
                {
                  title: "Verification Services",
                  desc: "Property due diligence",
                },
              ].map((model, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Coins className="h-5 w-5 text-secondary" />
                      {model.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {model.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Traction */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Current Traction
            </h2>
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2"></div>
                      <p className="text-muted-foreground">
                        Working app live with uploaded listings and blogs
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2"></div>
                      <p className="text-muted-foreground">
                        Properties priced in both naira and USDT
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2"></div>
                      <p className="text-muted-foreground">
                        Growing user engagement through organic traffic
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-secondary mt-2"></div>
                      <p className="text-muted-foreground">
                        Early discussions with agents and property developers
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Revolution
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of Africa's blockchain real estate transformation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-lg">
                Invest Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Download Pitch Deck
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">
              Investor FAQs
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">
                  What is tokenized real estate?
                </h3>
                <p className="text-muted-foreground">
                  Tokenized real estate divides property ownership into digital
                  tokens recorded on the blockchain, allowing fractional
                  ownership and easy trading.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  How do I invest with Xclusive Property?
                </h3>
                <p className="text-muted-foreground">
                  Create an investor account, verify your identity, and purchase
                  tokens for verified developments using naira or USDT. You can
                  monitor your holdings and returns from your dashboard.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Is my investment secure?</h3>
                <p className="text-muted-foreground">
                  All investments are secured by blockchain smart contracts,
                  with due diligence and legal verification completed before
                  listing any property.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Can I trade or withdraw my property tokens?
                </h3>
                <p className="text-muted-foreground">
                  Yes. Tokenized assets will be tradable within the platform’s
                  marketplace, allowing investors to sell or transfer holdings
                  after the required holding period.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Investors;
