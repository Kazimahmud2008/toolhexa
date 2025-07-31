import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, Star } from 'lucide-react';

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  popular?: boolean;
  rating?: number;
  usage?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  id,
  name,
  description,
  category,
  icon,
  popular = false,
  rating = 0,
  usage = '0'
}) => {
  return (
    <Card className="group bg-card border-border hover:border-primary/30 transition-all duration-200 hover:shadow-card cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
                {popular && (
                  <Badge variant="outline" className="text-xs">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Popular
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-muted-foreground mb-4 text-sm line-clamp-2">
          {description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            <span>{usage} uses</span>
          </div>
          <Link to={`/tools/${id}`}>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Open Tool
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;