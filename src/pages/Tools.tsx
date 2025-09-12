import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import SEOHead from '@/components/SEOHead';
import { tools, categories } from '@/data/tools';
import { Filter, Grid, List, SortAsc, SortDesc } from 'lucide-react';

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedTools = useMemo(() => {
    let filtered = tools;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      if (categoryName) {
        filtered = filtered.filter(tool => tool.category === categoryName);
      }
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'usage':
          comparison = parseFloat(a.usage) - parseFloat(b.usage);
          break;
        case 'popular':
        default:
          comparison = (a.popular ? 1 : 0) - (b.popular ? 1 : 0);
          if (comparison === 0) {
            comparison = parseFloat(a.usage) - parseFloat(b.usage);
          }
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  const handleSearch = (query: string) => setSearchQuery(query);
  const toggleSortOrder = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  return (
    <>
      <SEOHead 
        title="All Developer Tools - Toolhexa Collection"
        description="Browse 55+ professional developer tools including JSON formatter, CSS generators, image converters, password generators, and code validators. All free to use."
        canonicalUrl="/tools"
        keywords={['developer tools', 'programming utilities', 'JSON formatter', 'CSS tools', 'code tools', 'web development']}
      />
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Developer <span className="text-primary">Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover all {tools.length} professional developer tools designed to supercharge your development workflow. From data processing and code formatting to image optimization and security utilities, find everything you need in one place. Each tool is carefully crafted to save you time and improve your productivity.
          </p>
          
          {/* Additional SEO Content */}
          <div className="mt-8 max-w-4xl mx-auto text-muted-foreground">
            <p className="mb-4">
              Our comprehensive collection covers every aspect of modern web development. Whether you're working with APIs and need JSON formatting, designing interfaces and require CSS generators, or optimizing assets with image tools, we've got you covered. All tools run in your browser for maximum security and performance.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/categories/text" className="hover:text-primary transition-colors">Text Processing Tools</Link>
              <span>•</span>
              <Link to="/categories/css" className="hover:text-primary transition-colors">CSS Generators</Link>
              <span>•</span>
              <Link to="/categories/image" className="hover:text-primary transition-colors">Image Utilities</Link>
              <span>•</span>
              <Link to="/categories/color" className="hover:text-primary transition-colors">Color Tools</Link>
              <span>•</span>
              <Link to="/categories/security" className="hover:text-primary transition-colors">Security Utilities</Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search tools by name, description, or keywords..."
            className="max-w-4xl mx-auto"
          />
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Tools
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                  <Badge variant="secondary" className="ml-2">
                    {cat.count}
                  </Badge>
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popular">Popular</option>
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                  <option value="rating">Rating</option>
                  <option value="usage">Usage</option>
                </select>
                <Button variant="outline" size="icon" onClick={toggleSortOrder}>
                  {sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedTools.length} of {tools.length} tools
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${categories.find(cat => cat.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Tools Grid/List */}
        {filteredAndSortedTools.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredAndSortedTools.map(tool => (
              <Link key={tool.id} to={`/tools/${tool.id}`}>
                <ToolCard
                  id={tool.id}
                  name={tool.name}
                  description={tool.description}
                  category={tool.category}
                  icon={<tool.icon className="h-6 w-6 text-white" />}
                  popular={tool.popular}
                  rating={tool.rating}
                  usage={tool.usage}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search query or category filter</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Tools;
