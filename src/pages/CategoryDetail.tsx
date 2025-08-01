import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import SearchBar from '@/components/SearchBar';
import { tools, categories } from '@/data/tools';
import { ArrowLeft, Grid3X3, List, Search, Filter } from 'lucide-react';

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'usage' | 'popular'>('popular');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Find the category
  const category = categories.find(cat => cat.id === categoryId);
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link to="/categories">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter tools by category and search query
  const categoryTools = tools.filter(tool => 
    tool.category.toLowerCase() === category.name.toLowerCase() &&
    (searchQuery === '' || 
     tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  // Sort tools
  const sortedTools = [...categoryTools].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'usage':
        comparison = parseFloat(a.usage) - parseFloat(b.usage);
        break;
      case 'popular':
        comparison = (a.popular ? 1 : 0) - (b.popular ? 1 : 0);
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/categories">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Button>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-neon">
                <category.icon className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
                <p className="text-xl text-muted-foreground mb-4 max-w-2xl">
                  {category.description}
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="text-sm">
                    {categoryTools.length} tools available
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Free to use
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="w-full md:w-96">
              <SearchBar 
                onSearch={handleSearch}
                placeholder={`Search ${category.name.toLowerCase()}...`}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort Options */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm"
              >
                <option value="popular">Popular First</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="usage">Usage</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex border border-border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {sortedTools.length} {sortedTools.length === 1 ? 'tool' : 'tools'}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Tools Grid/List */}
        {sortedTools.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "grid grid-cols-1 gap-4"
          }>
            {sortedTools.map((tool) => (
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
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? `No tools match "${searchQuery}" in this category.`
                : 'No tools available in this category yet.'
              }
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;