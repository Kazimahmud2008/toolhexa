import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import JSONFormatter from '@/components/tools/JSONFormatter';
// ... (সব import আগের মতোই থাকবে)
import { tools } from '@/data/tools';
import { ArrowLeft, Star, ExternalLink } from 'lucide-react';

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The tool you're looking for doesn't exist.
          </p>
          <Link to="/tools">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedTools = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 5);

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'json-formatter':
        return <JSONFormatter />;
      // ... (all other tool cases remain the same)
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="p-12 bg-muted/30 rounded-lg border border-border">
              <tool.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-3">Tool Available Soon</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                This tool is being actively developed and will be available shortly.
              </p>
              <Link to="/tools">
                <Button variant="outline" size="sm">
                  Browse Other Tools
                </Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs for internal links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:underline">Home</Link> /{" "}
          <Link to="/tools" className="hover:underline">Tools</Link> /{" "}
          <span className="text-primary">{tool.name}</span>
        </nav>
      </div>

      {/* Header */}
      <div className="bg-gradient-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/tools">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-neon">
                <tool.icon className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
                <p className="text-xl text-muted-foreground mb-4 max-w-2xl">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{tool.category}</Badge>
                  {tool.subcategory && (
                    <Badge variant="outline">{tool.subcategory}</Badge>
                  )}
                  {tool.popular && (
                    <Badge className="bg-gradient-primary text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{tool.rating}</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{tool.usage}</div>
                  <div className="text-sm text-muted-foreground">Uses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">Free</div>
                  <div className="text-sm text-muted-foreground">Price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="py-8">
        {renderToolComponent()}
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div
