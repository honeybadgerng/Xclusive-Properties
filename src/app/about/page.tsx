import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Head from "next/head";
import {
  Building2,
  Rocket,
  Shield,
  Globe,
  Zap,
  Users,
  CheckCircle2,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Chief Executive Officer",
      role: "Blockchain & Real Estate Expert",
      description:
        "15+ years in real estate development and blockchain technology integration.",
    },
    {
      name: "Chief Technology Officer",
      role: "IoT & Smart Systems Architect",
      description:
        "Leading innovation in smart city infrastructure and IoT property management.",
    },
    {
      name: "Chief Operations Officer",
      role: "Property Management Specialist",
      description:
        "Expertise in scaling property operations across multiple markets.",
    },
    {
      name: "Head of Blockchain",
      role: "Smart Contract Developer",
      description:
        "Building secure, transparent tokenization infrastructure on Polygon.",
    },
  ];

  const revolutionaryFeatures = [
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "Tokenized Ownership",
      description:
        "Property ownership recorded on blockchain with fractional investment opportunities for everyone.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "IoT Smart Management",
      description:
        "Automated property management with IoT sensors for utilities, security, and maintenance.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cross-Border Investment",
      description:
        "Invest in African real estate from anywhere using crypto, bypassing currency restrictions.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Transparent Transactions",
      description:
        "All property records, ownership transfers, and rental payments secured on blockchain.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      event: "Founded with vision to democratize African real estate",
    },
    {
      year: "2024",
      event: "Launched platform with USDT and Naira payment integration",
    },
    {
      year: "2024",
      event: "Started smart contract development on Polygon network",
    },
    { year: "2025", event: "Preparing first tokenized property pilot launch" },
  ];

  return (
    <Layout>
      <Head>
        <title>
          RJB Xclusive Properties | Blockchain Real Estate & Smart City
          Innovation in Africa
        </title>
        <meta
          name="description"
          content="Learn about RJB Xclusive Properties, pioneers in blockchain-powered real estate and IoT-based smart city infrastructure. We make African property investment accessible, secure, and transparent for investors worldwide."
        />
        <meta
          name="keywords"
          content="RJB Xclusive Properties,RJB Xclusive,Xclusive Properties, tokenized real estate Africa, blockchain property investment, smart city infrastructure, IoT real estate Nigeria, real estate tokenization, fractional ownership Africa"
        />
        <meta
          property="og:title"
          content="About RJB Xclusive Properties | Africa’s Blockchain Real Estate Platform"
        />
        <meta
          property="og:description"
          content="RJB Xclusive Properties is revolutionizing African real estate with blockchain tokenization and IoT smart property management. Learn more about our mission, leadership, and innovation."
        />
        <meta property="og:url" content="https://xclusiverealtors.com/about" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://xclusiverealtors.com/images/about-banner.jpg"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://xclusiverealtors.com/about" />

        <script type="application/ld+json">
          {`{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "RJB Xclusive Properties",
      "url": "https://xclusiverealtors.com",
      "logo": "https://xclusiverealtors.com/images/logo.png",
      "description": "RJB Xclusive Properties leverages blockchain and IoT to create transparent, accessible property investment opportunities across Africa.",
      "foundingDate": "2023",
      "founders": [
        {
          "@type": "Organization",
          "name": "RJB Xclusive Properties Founding Team"
        }
      ],
      "founders": [
        {
          "type": "WebSite",
          "name": "RJB Xclusive Properties",
          "url": "https://properties.rjbworld.org/" 
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/xclusiveproperties",
        "https://twitter.com/xclusiveprops",
        "https://instagram.com/xclusiveproperties"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@xclusiveproperties.com"
      }
    }`}
        </script>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                About RJB Xclusive Properties – Blockchain Real Estate & Smart
                City Innovation
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Revolutionizing African Real Estate Through Blockchain & IoT
                Technology
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/investors">Investment Opportunities</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/properties">Browse Properties</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Our Story and Mission
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                {" "}
                <p className="text-lg leading-relaxed">
                  {" "}
                  RJB Xclusive Properties is a real estate technology company
                  focused on redefining how people invest in property. RJB
                  Xclusive was created to remove the high barriers, lack of
                  trust, and limited access that define traditional real estate
                  investment in Nigeria and across Africa. From the start, RJB
                  Xclusive Properties has been built to serve both local and
                  global investors who want secure, transparent, and flexible
                  access to real assets.{" "}
                </p>{" "}
                <p className="text-lg leading-relaxed">
                  {" "}
                  At the core of RJB Xclusive Properties is blockchain powered
                  real estate tokenization. Properties on the platform are
                  verified, digitized, and divided into investment units
                  recorded on blockchain. This structure allows investors to
                  start with small amounts, participate from anywhere in the
                  world, and hold provable ownership records that cannot be
                  altered or duplicated. By using blockchain, RJB Xclusive
                  eliminates common problems such as fake property documents,
                  double allocation, and manual record keeping.{" "}
                </p>{" "}
                <p className="text-lg leading-relaxed">
                  {" "}
                  RJB Xclusive also integrates smart property and IoT driven
                  infrastructure to support efficient property management. Rent
                  collection, access control, service payments, and operational
                  monitoring are designed to run through automated systems. This
                  creates a more reliable experience for investors, property
                  owners, and tenants while reducing operational waste and human
                  error.{" "}
                </p>{" "}
                <p className="text-lg leading-relaxed">
                  {" "}
                  The long term vision of RJB Xclusive Properties is to power
                  smart, investment ready cities starting in Africa and
                  expanding globally. By combining real estate, blockchain, and
                  smart infrastructure, RJB Xclusive is building a trusted
                  foundation for modern property ownership and digital real
                  estate investment.{" "}
                </p>{" "}
              </div>

              {/* Milestones */}
              <div className="mt-12 space-y-4">
                <h3 className="text-2xl font-bold mb-6">Our Journey</h3>
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-20 font-bold text-primary">
                      {milestone.year}
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-foreground">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why We're Revolutionary */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Rocket className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Why We're Different
                  </h2>
                </div>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  We're not just another real estate platform. We're building
                  the infrastructure for the future of African property
                  investment.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {revolutionaryFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Smart City Vision */}
              <Card className="mt-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl text-center">
                    Building Africa's Smart Cities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-center text-muted-foreground text-lg mb-6">
                    Our IoT-powered smart city infrastructure enables complete
                    remote property management
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        Automated Utilities
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        IoT sensors manage water, electricity, and gas with
                        automatic cut-off for non-payment
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Smart Security</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time monitoring and access control managed from
                        anywhere in the world
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-background/50">
                      <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">Maintenance Alerts</h4>
                      <p className="text-sm text-muted-foreground">
                        Predictive maintenance with instant notifications for
                        repairs and issues
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Our Leadership Team
                  </h2>
                </div>
                <p className="text-xl text-muted-foreground">
                  Expert leaders combining decades of experience in real estate,
                  blockchain, and technology
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {team.map((member, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <p className="text-primary font-medium">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Our Leadership Team
                  </h2>
                </div>
                <p className="text-xl text-muted-foreground">
                  Expert leaders combining decades of experience in real estate,
                  blockchain, and technology
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    image: "/images/team/me.jpg",
                    name: "Onabanji Moshood Raji",
                    title: "Chief Executive Officer",
                    role: "Blockchain & Real Estate Expert",
                    description:
                      "15+ years in real estate development and blockchain technology integration.",
                    linkedin: "https://linkedin.com/in/onabanjimoshoodraji",
                    twitter: "https://x.com/incognitopap",
                    instagram: "https://instagram.com/rajibanj",
                  },
                  {
                    image: "/images/team/kay.jpg",
                    name: "Kayode Aderibigbe",
                    title: "Chief Operations Officer",
                    role: "Property Management Specialist",
                    description:
                      "Expertise in scaling property operations across multiple markets.",
                    linkedin: "https://linkedin.com/in/kayodeaderibigbe",
                    twitter: "https://x.com/edoyak09",
                    instagram: "https://www.instagram.com/edoyak01",
                  },
                  // {
                  //   image: "/team/olamide.jpg",
                  //   name: "Olamide Johnson",
                  //   title: "Chief Technology Officer",
                  //   role: "IoT & Smart Systems Architect",
                  //   description:
                  //     "Leading innovation in smart city infrastructure and IoT property management.",
                  //   linkedin: "https://linkedin.com/in/olamidejohnson",
                  //   twitter: "https://x.com/olamidejohnson",
                  //   instagram: "https://instagram.com/olamidejohnson",
                  // },
                  // {
                  //   image: "/team/emeka.jpg",
                  //   name: "Emeka Nwosu",
                  //   title: "Head of Blockchain",
                  //   role: "Smart Contract Developer",
                  //   description:
                  //     "Building secure, transparent tokenization infrastructure on Polygon.",
                  //   linkedin: "https://linkedin.com/in/emekanwosu",
                  //   twitter: "https://x.com/emekanwosu",
                  //   instagram: "https://instagram.com/emekanwosu",
                  // },
                ].map((member, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="flex flex-col items-center text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary/20"
                      />
                      <CardTitle className="text-xl font-semibold">
                        {member.name}
                      </CardTitle>
                      <p className="text-primary font-medium">{member.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {member.role}
                      </p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-4">
                        {member.description}
                      </p>
                      <div className="flex justify-center gap-4">
                        <Link
                          href={member.linkedin}
                          target="_blank"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5 text-primary hover:text-secondary" />
                        </Link>
                        <Link
                          href={member.twitter}
                          target="_blank"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-5 w-5 text-primary hover:text-secondary" />
                        </Link>
                        <Link
                          href={member.instagram}
                          target="_blank"
                          aria-label="Instagram"
                        >
                          <Instagram className="h-5 w-5 text-primary hover:text-secondary" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the Revolution
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of the future of African real estate. Invest in tokenized
              properties, earn yield, and help us build smart cities across the
              continent.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/investors">View Investment Opportunities</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/properties">Explore Properties</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
