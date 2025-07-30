import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import JSONFormatter from '@/components/tools/JSONFormatter';
import { tools } from '@/data/tools';
import { ArrowLeft, Star, Users, Calendar, ExternalLink } from 'lucide-react';

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
            <Button variant="hero">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related tools (same category, different tool)
  const relatedTools = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 5);

  // Render specific tool component
  const renderToolComponent = () => {
    switch (tool.id) {
      case 'json-formatter':
        return <JSONFormatter />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="p-16 bg-muted/30 rounded-lg border border-dashed border-border">
              <tool.icon className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
              <h3 className="text-2xl font-semibold mb-4">Tool Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                This tool is currently under development. Check back soon!
              </p>
              <Link to="/tools">
                <Button variant="outline">
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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Related <span className="text-primary">Tools</span>
              </h2>
              <p className="text-muted-foreground">
                Other tools in the {tool.category} category
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {relatedTools.map((relatedTool) => (
                <ToolCard
                  key={relatedTool.id}
                  id={relatedTool.id}
                  name={relatedTool.name}
                  description={relatedTool.description}
                  category={relatedTool.category}
                  icon={<relatedTool.icon className="h-6 w-6 text-white" />}
                  popular={relatedTool.popular}
                  rating={relatedTool.rating}
                  usage={relatedTool.usage}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to={`/categories/${tool.category.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button variant="outline">
                  View All {tool.category}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolDetail;