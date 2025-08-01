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
              <Link 
                key={category.id}
                to={`/categories/${category.id}`}
                className="block group"
              >
                <Card className="group bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="p-4 bg-gradient-primary rounded-xl shadow-neon group-hover:shadow-glow transition-all duration-300 mx-auto w-16 h-16 flex items-center justify-center mb-4">
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
                    <CardDescription className="text-muted-foreground mb-4">
                      {category.description}
                    </CardDescription>
                    <div className="text-sm text-primary font-medium group-hover:text-primary-glow transition-colors">
                      View Tools →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

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
                    <Link to={`/categories/${category.id}`}>
                      <Button variant="outline" className="w-full">
                        Explore Category
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
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
            <Link to="/tools">
              <Button variant="glass" size="hero" className="text-white border-white/30 hover:bg-white/20">
                Browse All Tools
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" size="hero" className="text-white border-white hover:bg-white hover:text-primary">
                View Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;