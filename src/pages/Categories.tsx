import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import { categories, getToolsByCategory, tools } from '@/data/tools';
import { ArrowRight, Filter } from 'lucide-react';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : getToolsByCategory(selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Tool <span className="neon-text">Categories</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Discover developer tools organized by category. Find exactly what you need for your workflow.
          </p>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <Filter className="h-5 w-5" />
            <span>{categories.length} categories • {tools.length} tools total</span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-4">
              Browse by <span className="text-primary">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
              Each category contains specialized tools designed for specific development tasks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`group bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer h-full ${
                  selectedCategory === category.name.toLowerCase().replace(' tools', '') ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedCategory(category.name.toLowerCase().replace(' tools', ''))}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`p-4 bg-gradient-to-br ${category.color} rounded-xl shadow-neon group-hover:shadow-glow transition-all duration-300 mx-auto w-16 h-16 flex items-center justify-center mb-4`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                    {category.name}
                  </CardTitle>
                  <Badge variant="secondary" className="mx-auto">
                    {category.count} tools
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Button
              variant={selectedCategory === 'all' ? 'hero' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="sm"
            >
              All Tools ({tools.length})
            </Button>
            {categories.map((category) => {
              const categoryKey = category.name.toLowerCase().replace(' tools', '');
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === categoryKey ? 'hero' : 'outline'}
                  onClick={() => setSelectedCategory(categoryKey)}
                  size="sm"
                >
                  {category.name} ({category.count})
                </Button>
              );
            })}
          </div>

          {/* Tools Grid */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">
              {selectedCategory === 'all' 
                ? 'All Tools' 
                : categories.find(cat => cat.name.toLowerCase().replace(' tools', '') === selectedCategory)?.name || 'Tools'
              }
            </h3>
            <p className="text-muted-foreground mb-8">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
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

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No tools found</h3>
              <p className="text-muted-foreground mb-6">
                Try selecting a different category or browse all tools
              </p>
              <Button 
                variant="hero" 
                onClick={() => setSelectedCategory('all')}
              >
                View All Tools
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Most Popular <span className="text-primary">Categories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Categories with the highest usage and most loved tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)
              .map((category) => (
                <Card key={category.id} className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-br ${category.color} rounded-xl shadow-neon`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {category.count} tools available
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {category.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedCategory(category.name.toLowerCase().replace(' tools', ''))}
                      className="w-full"
                    >
                      Explore Category
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Can't Find What You Need?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Let us know what tools you'd like to see. We're always adding new categories and tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="glass" size="hero" className="text-white border-white/30 hover:bg-white/20">
                Request a Tool
              </Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" size="hero" className="text-white border-white hover:bg-white hover:text-primary">
                Browse All Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;