import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import { tools, categories, getPopularTools } from '@/data/tools';
import { ArrowRight, Zap, Users, Star, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const popularTools = getPopularTools().slice(0, 6);
  const featuredCategories = categories.slice(0, 6);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search navigation
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              55+ Professional Developer Tools
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight antialiased">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Modern Tools for
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent font-bold antialiased" style={{ textRendering: 'optimizeLegibility' }}>
              Smart Developers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Enhance your development workflow with our collection of fast, secure, and intuitive browser-based utilities. 
            <br className="hidden md:block" />
            <span className="text-primary font-medium">No installations. No signups. Just pure productivity.</span>
          </p>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">55+</div>
              <div className="text-muted-foreground font-medium">Free Tools</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground font-medium">Monthly Users</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground font-medium">Uptime</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground font-medium">Available</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/tools">
              <Button variant="hero" size="hero" className="group">
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Browse All Tools
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="glass" size="hero" className="backdrop-blur-sm">
                View Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 tech-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Categories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Professional tools organized by functionality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <Link key={category.id} to={`/categories/${category.id}`}>
                <Card className="group bg-card border-border hover:border-primary/30 transition-all duration-200 hover:shadow-card cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {category.count} tools
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-muted-foreground text-sm">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/categories">
              <Button variant="outline">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">
                Popular Tools
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Most used by developers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTools.map((tool) => (
              <ToolCard
                key={tool.id}
                id={tool.id}
                name={tool.name}
                description={tool.description}
                category={tool.category}
                icon={<tool.icon className="h-6 w-6 text-white" />}
                popular={tool.popular}
                rating={tool.rating}
                usage={tool.usage}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/tools">
              <Button variant="default">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Toolhexa?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Professional tools designed for productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="p-3 bg-primary/10 rounded-lg mx-auto w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Fast</h3>
              <p className="text-muted-foreground text-sm">
                Browser-based tools with instant results
              </p>
            </div>

            <div className="text-center p-4">
              <div className="p-3 bg-primary/10 rounded-lg mx-auto w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Secure</h3>
              <p className="text-muted-foreground text-sm">
                Your data never leaves your device
              </p>
            </div>

            <div className="text-center p-4">
              <div className="p-3 bg-primary/10 rounded-lg mx-auto w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Reliable</h3>
              <p className="text-muted-foreground text-sm">
                Trusted by thousands of developers
              </p>
            </div>

            <div className="text-center p-4">
              <div className="p-3 bg-primary/10 rounded-lg mx-auto w-12 h-12 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Free</h3>
              <p className="text-muted-foreground text-sm">
                No subscriptions or limits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 tech-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Building Today
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Access professional developer tools instantly - no setup required
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools">
              <Button variant="default" size="lg">
                Browse Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" size="lg">
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;