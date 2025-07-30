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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="neon-text">ToolVibe</span>
              <br />
              <span className="text-3xl md:text-5xl text-muted-foreground">
                Developer Tools
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            The ultimate collection of free online developer tools. 
            Format, convert, optimize, and build with lightning-fast utilities.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search 50+ tools... (JSON formatter, Base64 encoder, etc.)"
              className="animate-shimmer"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Free Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Monthly Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools">
              <Button variant="hero" size="hero" className="animate-glow">
                Explore All Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="glass" size="hero">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Tool <span className="text-primary">Categories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover tools organized by category to find exactly what you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <Link key={category.id} to={`/categories/${category.id}`}>
                <Card className="group bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-neon group-hover:shadow-glow transition-all duration-300`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {category.count} tools
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/categories">
              <Button variant="outline" size="lg">
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h2 className="text-4xl font-bold">
                Popular <span className="text-primary">Tools</span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Most used tools by developers worldwide
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

          <div className="text-center mt-12">
            <Link to="/tools">
              <Button variant="hero" size="lg">
                View All Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">ToolVibe</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built by developers, for developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-neon mx-auto w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">
                All tools run locally in your browser for instant results
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-neon mx-auto w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data never leaves your device - completely secure
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-neon mx-auto w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                Built based on feedback from the developer community
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-neon mx-auto w-16 h-16 flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Always Free</h3>
              <p className="text-muted-foreground">
                No subscriptions, no limits - forever free to use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Supercharge Your Development?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who use ToolVibe daily to streamline their workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools">
              <Button variant="glass" size="hero" className="text-white border-white/30 hover:bg-white/20">
                Start Using Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="hero" className="text-white border-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;