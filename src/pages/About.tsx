import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, Shield, Users, Star, Code, Globe, 
  Clock, Award, Heart, Target 
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'All tools run locally in your browser for instant results without server delays.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data never leaves your device. Everything is processed locally for maximum security.'
    },
    {
      icon: Users,
      title: 'Developer Focused',
      description: 'Built by developers, for developers. Every tool is designed with productivity in mind.'
    },
    {
      icon: Star,
      title: 'Always Free',
      description: 'No subscriptions, no hidden fees, no limits. Forever free to use for everyone.'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Transparent development process with community contributions welcome.'
    },
    {
      icon: Globe,
      title: 'Accessible Everywhere',
      description: 'Works on any device with a modern browser. No downloads or installations required.'
    }
  ];

  const stats = [
    { label: 'Tools Available', value: '50+' },
    { label: 'Monthly Users', value: '1M+' },
    { label: 'Countries Served', value: '190+' },
    { label: 'Developer Hours Saved', value: '100K+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-primary neon-text">ToolVibe</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The ultimate collection of free online developer tools, 
            designed to supercharge your development workflow and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools">
              <Button variant="hero" size="hero">
                Explore Tools
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="glass" size="hero">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="text-primary">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that developers shouldn't waste time on repetitive tasks 
                or searching for reliable tools. That's why we created ToolVibe - 
                a comprehensive suite of developer utilities that are fast, 
                reliable, and always available.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Every tool is carefully crafted with attention to detail, 
                ensuring you get accurate results every time. From JSON formatting 
                to image optimization, we've got your development needs covered.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Made with love</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Developer-first</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-glow opacity-20 rounded-2xl"></div>
              <Card className="bg-gradient-card border-border shadow-glow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-6 w-6 text-primary" />
                    <span>Why Choose ToolVibe?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Save hours of development time</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Complete privacy and security</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Zap className="h-4 w-4 text-primary" />
                      <span>Lightning-fast performance</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="h-4 w-4 text-primary" />
                      <span>Constantly updated and improved</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Makes Us <span className="text-primary">Different</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've built ToolVibe from the ground up with developers in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                <CardHeader>
                  <div className="p-3 bg-gradient-primary rounded-xl shadow-neon w-fit">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              ToolVibe by the <span className="text-primary">Numbers</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by developers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary mb-2 neon-text">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Who is ToolVibe <span className="text-primary">For?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Perfect for developers, designers, and tech professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-6 w-6 text-primary" />
                  <span>Frontend Developers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Format JSON, generate CSS, optimize images, and validate HTML with ease.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Backend Developers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hash generators, UUID creation, timestamp conversion, and data validation tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-6 w-6 text-primary" />
                  <span>UI/UX Designers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Color palettes, image resizers, contrast checkers, and design utilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who use ToolVibe daily to streamline their workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools">
              <Button variant="glass" size="hero" className="text-white border-white/30 hover:bg-white/20">
                Start Using Tools
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="hero" className="text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;