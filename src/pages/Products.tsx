import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield, Users, Smartphone } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 'pro',
      name: 'ToolVibe Pro',
      description: 'Enhanced developer tools with premium features',
      price: '$9.99',
      period: '/month',
      popular: true,
      features: [
        'All 50+ tools unlocked',
        'Advanced tool configurations',
        'Bulk processing capabilities',
        'API access for automation',
        'Priority support',
        'No rate limits',
        'Custom themes',
        'Offline tool access'
      ],
      icon: Zap
    },
    {
      id: 'team',
      name: 'ToolVibe Team',
      description: 'Collaborative tools for development teams',
      price: '$19.99',
      period: '/month',
      popular: false,
      features: [
        'Everything in Pro',
        'Team collaboration features',
        'Shared tool configurations',
        'Usage analytics',
        'Team management',
        'SSO integration',
        'Advanced security',
        'Dedicated support'
      ],
      icon: Users
    },
    {
      id: 'enterprise',
      name: 'ToolVibe Enterprise',
      description: 'Custom solutions for large organizations',
      price: 'Custom',
      period: '',
      popular: false,
      features: [
        'Everything in Team',
        'Custom tool development',
        'On-premise deployment',
        'White-label solutions',
        'SLA guarantees',
        '24/7 phone support',
        'Training sessions',
        'Custom integrations'
      ],
      icon: Shield
    }
  ];

  const features = [
    {
      title: 'Lightning Fast Performance',
      description: 'All tools run locally in your browser for instant results with zero latency.',
      icon: Zap
    },
    {
      title: 'Privacy & Security First',
      description: 'Your data never leaves your device. Complete privacy and security guaranteed.',
      icon: Shield
    },
    {
      title: 'Mobile Optimized',
      description: 'Access all tools seamlessly across desktop, tablet, and mobile devices.',
      icon: Smartphone
    },
    {
      title: 'Developer Community',
      description: 'Built by developers, for developers. Join our growing community.',
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Supercharge Your <span className="neon-text">Development</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Choose the perfect plan to unlock the full potential of ToolVibe's developer tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glass" size="hero" className="text-white border-white/30 hover:bg-white/20">
              Start Free Trial
            </Button>
            <Button variant="outline" size="hero" className="text-white border-white hover:bg-white hover:text-primary">
              View All Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Choose Your <span className="text-primary">Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className={`relative bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow ${
                  product.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-xl w-16 h-16 flex items-center justify-center">
                    <product.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-baseline justify-center mt-4">
                    <span className="text-4xl font-bold text-primary">{product.price}</span>
                    <span className="text-muted-foreground ml-1">{product.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={product.popular ? "hero" : "outline"} 
                    className="w-full"
                    size="lg"
                  >
                    {product.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">ToolVibe</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern developers in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="p-4 bg-gradient-primary rounded-2xl shadow-neon mx-auto w-16 h-16 flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>

          <div className="space-y-8">
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">What makes ToolVibe different?</h3>
              <p className="text-muted-foreground">
                ToolVibe runs entirely in your browser, ensuring your data never leaves your device. 
                We focus on speed, privacy, and developer experience above all else.
              </p>
            </div>
            
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">Can I use ToolVibe offline?</h3>
              <p className="text-muted-foreground">
                Yes! Once loaded, most tools work offline. Pro users get enhanced offline capabilities 
                and can download tools for permanent offline access.
              </p>
            </div>
            
            <div className="border-b border-border pb-6">
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Absolutely! All plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who trust ToolVibe for their daily workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glass" size="hero" className="text-white border-white/30 hover:bg-white/20">
              Start Free Trial
            </Button>
            <Link to="/contact">
              <Button variant="outline" size="hero" className="text-white border-white hover:bg-white hover:text-primary">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;