"use client";
import React from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import {
  Shield,
  Coins,
  Building,
  Workflow,
  Lock,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Whitepaper = () => {
  // Tokenomics Distribution Data
  const tokenomicsData = [
    { name: "Ecosystem & Liquidity", value: 40, color: "hsl(var(--primary))" },
    { name: "Investors & Partners", value: 25, color: "hsl(var(--secondary))" },
    {
      name: "Operations & Development",
      value: 20,
      color: "hsl(var(--accent))",
    },
    { name: "Marketing & Rewards", value: 10, color: "hsl(var(--chart-1))" },
    { name: "Team & Advisors", value: 5, color: "hsl(var(--chart-2))" },
  ];

  // Roadmap Timeline Data
  const roadmapData = [
    {
      phase: "Phase 1",
      progress: 100,
      description: "Smart Contract Prototype",
    },
    { phase: "Phase 2", progress: 75, description: "Pilot Properties" },
    { phase: "Phase 3", progress: 40, description: "Cross-border Integration" },
    { phase: "Phase 4", progress: 20, description: "IoT Rollout" },
    { phase: "Phase 5", progress: 10, description: "Secondary Trading" },
  ];

  // Growth Projection Data
  const growthData = [
    { year: "2025", properties: 10, investors: 500, volume: 2 },
    { year: "2026", properties: 50, investors: 2500, volume: 15 },
    { year: "2027", properties: 200, investors: 10000, volume: 75 },
    { year: "2028", properties: 500, investors: 35000, volume: 250 },
    { year: "2029", properties: 1000, investors: 100000, volume: 600 },
  ];

  return (
    <Layout>
      <Head>
        <title>RJB Token Whitepaper | Tokenized Real Estate for Africa</title>
        <meta
          name="description"
          content="Explore the RJB Token Whitepaper. Learn how RJB enables decentralized property investment, fractional ownership, and blockchain-powered real estate management across Africa."
        />
        <meta
          name="keywords"
          content="RJB Token, Property Tokenization, Real Estate Blockchain, Fractional Ownership, Real Estate Investment Africa, Tokenized Properties, RJB Whitepaper"
        />
        <meta
          property="og:title"
          content="RJB Token Whitepaper | Tokenized Real Estate for Africa"
        />
        <meta
          property="og:description"
          content="Decentralized property investment and management ecosystem for Africa using blockchain, IoT, and smart contracts."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://properties.rjbworld.org/whitepaper"
        />
        <meta
          property="og:image"
          content="https://properties.rjbworld.org/og-image.jpg"
        />
        <link
          rel="canonical"
          href="https://properties.rjbworld.org/whitepaper"
        />
      </Head>
      <script type="application/ld+json">
        {`
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "RJB Token Whitepaper: Tokenized Real Estate for Africa",
  "description": "A technical whitepaper detailing RJB Token’s blockchain-based real estate investment ecosystem across Africa.",
  "author": { "@type": "Organization", "name": "RJB Xclusive Properties" },
  "publisher": { "@type": "Organization", "name": "RJB Xclusive Properties" },
  "url": "https://properties.rjbworld.org/whitepaper"
}
`}
      </script>

      <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RJB Token Technical Whitepaper
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Decentralized Property Investment and Management Ecosystem for
              Africa
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
              <span>Version 1.0</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Last Updated: January 2025</span>
            </div>
          </div>

          {/* Abstract */}
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Coins className="h-6 w-6 text-primary" />
                Abstract
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                RJB Token powers a decentralized property investment and
                management ecosystem for Africa. It enables tokenized real
                estate ownership, automated rent and utility management, and
                borderless investment using smart contracts and IoT technology.
              </p>
            </CardContent>
          </Card>

          {/* Problem Statement */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Problem Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-semibold mb-2">
                    🚫 Expensive & Inaccessible
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Property investment in Africa is expensive and inaccessible
                    to most.
                  </p>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-semibold mb-2">
                    🌍 Cross-border Barriers
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Investors face currency restrictions and legal barriers.
                  </p>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-semibold mb-2">💧 Lack of Liquidity</h4>
                  <p className="text-sm text-muted-foreground">
                    Property owners lack liquidity and verified buyers.
                  </p>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-semibold mb-2">⏰ Manual Processes</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional rent and utility collection is slow and manual.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solution Architecture */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Workflow className="h-6 w-6 text-primary" />
                Solution Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 text-center">
                    <Building className="h-12 w-12 mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">
                      Property Tokenization
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Smart contracts on Polygon network
                    </p>
                  </div>
                  <div className="p-6 bg-secondary/5 rounded-lg border border-secondary/20 text-center">
                    <Coins className="h-12 w-12 mx-auto mb-3 text-secondary" />
                    <h4 className="font-semibold mb-2">Fractional Ownership</h4>
                    <p className="text-sm text-muted-foreground">
                      Using fungible RJB tokens
                    </p>
                  </div>
                  <div className="p-6 bg-accent/5 rounded-lg border border-accent/20 text-center">
                    <Zap className="h-12 w-12 mx-auto mb-3 text-accent" />
                    <h4 className="font-semibold mb-2">IoT Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Automated rent & utilities
                    </p>
                  </div>
                </div>

                {/* Architecture Flow Diagram */}
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 text-center">
                    Platform Flow Architecture
                  </h4>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1 p-4 bg-background rounded border text-center">
                      <p className="font-medium">Property Owner</p>
                      <p className="text-xs text-muted-foreground">
                        Lists Property
                      </p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="flex-1 p-4 bg-background rounded border text-center">
                      <p className="font-medium">Smart Contract</p>
                      <p className="text-xs text-muted-foreground">
                        Tokenization
                      </p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="flex-1 p-4 bg-background rounded border text-center">
                      <p className="font-medium">NFT Certificate</p>
                      <p className="text-xs text-muted-foreground">Minted</p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="flex-1 p-4 bg-background rounded border text-center">
                      <p className="font-medium">RJB Tokens</p>
                      <p className="text-xs text-muted-foreground">
                        Fractional Units
                      </p>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="flex-1 p-4 bg-background rounded border text-center">
                      <p className="font-medium">Investors</p>
                      <p className="text-xs text-muted-foreground">
                        Purchase & Earn
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                Platform Overview: Xclusive Properties
              </CardTitle>
              <CardDescription>
                Live MVP Platform for Tokenized Real Estate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Xclusive Properties is the live MVP platform that lists and
                manages tokenized properties. Users can buy, rent, or short-let
                properties in naira or USDT. Agents upload verified listings
                through a web dashboard, and buyers transact seamlessly with
                blockchain-backed transparency.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    ✅ Dual Currency Support
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Naira and USDT payments
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold mb-2">✅ Verified Listings</h4>
                  <p className="text-sm text-muted-foreground">
                    KYC-verified agents and developers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tokenization Framework */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                Tokenization Framework (RJB + NFT Module)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Property Tokenization</h4>
                      <p className="text-sm text-muted-foreground">
                        Each property is tokenized into RJB-backed units.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">NFT Certificate</h4>
                      <p className="text-sm text-muted-foreground">
                        A property certificate is minted as an NFT representing
                        ownership metadata (title, valuation, location).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Fractional Investment</h4>
                      <p className="text-sm text-muted-foreground">
                        Investors acquire fractions represented by RJB tokens
                        linked to the property NFT.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        Smart Contract Management
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Ownership, transfers, and yield distribution are managed
                        via smart contracts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smart Contract Design */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lock className="h-6 w-6 text-primary" />
                Smart Contract Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold">
                        Contract Type
                      </th>
                      <th className="text-left p-3 font-semibold">Standard</th>
                      <th className="text-left p-3 font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-medium">RJB Token</td>
                      <td className="p-3">ERC-20</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        Handles liquidity, yield, and trading
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-medium">Property NFTs</td>
                      <td className="p-3">ERC-721</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        Represents verified property records
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-medium">RJB-Exchange</td>
                      <td className="p-3">Custom</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        Enables peer-to-peer fractional ownership transfer
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">IoT Payment Gateway</td>
                      <td className="p-3">Custom</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        Connects on-chain payment verification to smart IoT
                        systems
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tokenomics */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="h-6 w-6 text-primary" />
                Tokenomics
              </CardTitle>
              <CardDescription>Total Supply: 1,000,000,000 RJB</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div>
                  <h4 className="font-semibold mb-4 text-center">
                    Token Distribution
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={tokenomicsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {tokenomicsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Token Utility */}
                <div>
                  <h4 className="font-semibold mb-4">Token Utility</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <p className="font-medium text-sm">
                        🏘️ Buy or rent tokenized properties
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <p className="font-medium text-sm">
                        💰 Stake for yield from rental income
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <p className="font-medium text-sm">
                        💳 Pay property fees, utilities, and maintenance
                      </p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded border border-primary/20">
                      <p className="font-medium text-sm">
                        🗳️ Vote on ecosystem governance proposals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governance and Staking */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-primary" />
                Governance and Staking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Holders stake RJB to gain governance power in decisions
                including new property listings, developer onboarding, and yield
                distribution rates. Staked tokens earn a percentage of platform
                transaction fees and property revenue.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20 text-center">
                  <h4 className="font-semibold mb-2">New Listings</h4>
                  <p className="text-xs text-muted-foreground">
                    Vote on property additions
                  </p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20 text-center">
                  <h4 className="font-semibold mb-2">Developer Onboarding</h4>
                  <p className="text-xs text-muted-foreground">
                    Approve new partners
                  </p>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20 text-center">
                  <h4 className="font-semibold mb-2">Yield Distribution</h4>
                  <p className="text-xs text-muted-foreground">
                    Set revenue rates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security and Compliance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-primary" />
                Security and Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-2">✅ KYC Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    All investors and agents verified
                  </p>
                </div>
                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-2">
                    ✅ Smart Contract Audits
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Third-party security audits
                  </p>
                </div>
                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-2">✅ SEC Compliance</h4>
                  <p className="text-sm text-muted-foreground">
                    Nigeria SEC guidelines followed
                  </p>
                </div>
                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-2">✅ Anti-fraud Layer</h4>
                  <p className="text-sm text-muted-foreground">
                    Property documentation verification
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Development Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roadmapData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phase" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {roadmapData.map((phase, index) => (
                    <div
                      key={index}
                      className="p-4 bg-muted/30 rounded-lg border"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{phase.phase}</h4>
                        <span className="text-sm font-medium text-primary">
                          {phase.progress}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Growth Projections */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                5-Year Growth Projections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="properties"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Properties Listed"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="investors"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    name="Total Investors"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="volume"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    name="Volume ($M)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vision and Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  To make property ownership borderless, transparent, and
                  automated using blockchain and IoT technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  To empower investors to own, manage, and earn from African
                  real estate from anywhere in the world through digital assets.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-center text-sm text-muted-foreground">
                This whitepaper is a living document and may be updated as the
                platform evolves. For the latest version, visit our official
                website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Whitepaper;
