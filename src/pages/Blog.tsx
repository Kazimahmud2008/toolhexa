import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight, TrendingUp } from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    id: 'json-best-practices',
    title: 'JSON Best Practices for Developers in 2024',
    excerpt: 'Learn the latest JSON formatting techniques, validation methods, and performance optimization strategies that every developer should know.',
    content: 'Complete guide to working with JSON data effectively...',
    author: 'Sarah Chen',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Development',
    tags: ['JSON', 'Best Practices', 'Performance'],
    featured: true,
    image: '/blog/json-best-practices.jpg'
  };

  const blogPosts = [
    {
      id: 'css-grid-mastery',
      title: 'Mastering CSS Grid: A Complete Developer Guide',
      excerpt: 'Discover advanced CSS Grid techniques and learn how to create responsive layouts with our comprehensive grid generator tool.',
      author: 'Mike Rodriguez',
      date: '2024-01-12',
      readTime: '12 min read',
      category: 'CSS',
      tags: ['CSS', 'Grid', 'Layout'],
      featured: false
    },
    {
      id: 'image-optimization-2024',
      title: 'Image Optimization Techniques for Modern Web Development',
      excerpt: 'Optimize your web images for better performance using the latest compression algorithms and format conversions.',
      author: 'Emily Watson',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Performance',
      tags: ['Images', 'Optimization', 'WebP'],
      featured: false
    },
    {
      id: 'regex-debugging-tips',
      title: 'Advanced Regex Debugging and Testing Strategies',
      excerpt: 'Master regular expressions with proven debugging techniques and learn how to test patterns effectively.',
      author: 'David Kumar',
      date: '2024-01-08',
      readTime: '10 min read',
      category: 'Development',
      tags: ['Regex', 'Debugging', 'Testing'],
      featured: false
    },
    {
      id: 'color-theory-developers',
      title: 'Color Theory for Developers: Beyond Basic Palettes',
      excerpt: 'Understand color psychology, accessibility, and how to create harmonious color schemes for your applications.',
      author: 'Lisa Park',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Design',
      tags: ['Color', 'Design', 'Accessibility'],
      featured: false
    },
    {
      id: 'api-documentation-tools',
      title: 'Creating Better API Documentation with Modern Tools',
      excerpt: 'Learn how to document your APIs effectively using the latest tools and techniques for better developer experience.',
      author: 'James Wilson',
      date: '2024-01-03',
      readTime: '9 min read',
      category: 'API',
      tags: ['API', 'Documentation', 'Tools'],
      featured: false
    },
    {
      id: 'password-security-2024',
      title: 'Password Security Best Practices for 2024',
      excerpt: 'Stay ahead of security threats with the latest password generation and management strategies.',
      author: 'Alex Thompson',
      date: '2024-01-01',
      readTime: '5 min read',
      category: 'Security',
      tags: ['Security', 'Passwords', 'Best Practices'],
      featured: false
    }
  ];

  const categories = [
    { name: 'All', count: blogPosts.length + 1 },
    { name: 'Development', count: 3 },
    { name: 'CSS', count: 2 },
    { name: 'Performance', count: 2 },
    { name: 'Design', count: 1 },
    { name: 'Security', count: 1 },
    { name: 'API', count: 1 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Developer <span className="neon-text">Insights</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Stay updated with the latest developer tools, best practices, and industry insights from our expert team
          </p>
          <div className="flex items-center justify-center space-x-2 text-white/80">
            <TrendingUp className="h-5 w-5" />
            <span>Updated weekly with fresh content</span>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Badge className="mb-4 bg-primary text-primary-foreground">Featured Article</Badge>
            <Card className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <div className="flex items-center text-muted-foreground text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4 hover:text-primary transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{featuredPost.author}</span>
                    </div>
                    
                    <Link to={`/blog/${featuredPost.id}`}>
                      <Button variant="hero">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="md:w-1/2 bg-gradient-glow rounded-r-lg flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-muted-foreground">Featured Article</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-0 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Latest <span className="text-primary">Articles</span>
                </h2>
                <p className="text-muted-foreground">
                  Discover insights, tutorials, and best practices from our development team
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center text-muted-foreground text-sm space-x-2">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col">
                      <CardDescription className="mb-4 flex-1">
                        {post.excerpt}
                      </CardDescription>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                        
                        <Link to={`/blog/${post.id}`}>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-8 space-y-8">
                {/* Categories */}
                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/20 transition-colors duration-200 cursor-pointer">
                          <span className="text-sm">{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="bg-gradient-primary text-white">
                  <CardHeader>
                    <CardTitle className="text-lg">Stay Updated</CardTitle>
                    <CardDescription className="text-white/80">
                      Get the latest developer insights delivered to your inbox
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="glass" className="w-full text-white border-white/30 hover:bg-white/20">
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>

                {/* Popular Tools */}
                <Card className="bg-gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Link to="/tools/json-formatter" className="block p-3 rounded-lg hover:bg-muted/20 transition-colors duration-200">
                        <div className="font-medium text-sm">JSON Formatter</div>
                        <div className="text-xs text-muted-foreground">Format & validate JSON</div>
                      </Link>
                      <Link to="/tools/css-gradient-generator" className="block p-3 rounded-lg hover:bg-muted/20 transition-colors duration-200">
                        <div className="font-medium text-sm">CSS Gradient Generator</div>
                        <div className="text-xs text-muted-foreground">Create beautiful gradients</div>
                      </Link>
                      <Link to="/tools/password-generator" className="block p-3 rounded-lg hover:bg-muted/20 transition-colors duration-200">
                        <div className="font-medium text-sm">Password Generator</div>
                        <div className="text-xs text-muted-foreground">Generate secure passwords</div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;