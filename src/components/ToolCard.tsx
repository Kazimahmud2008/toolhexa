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
    <Card className="group bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-neon group-hover:shadow-glow transition-all duration-300">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                {name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
                {popular && (
                  <Badge variant="outline" className="text-xs border-primary text-primary">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Popular
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            <span>{usage} uses</span>
          </div>
          <Link to={`/tools/${id}`}>
            <Button
              variant="outline"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            >
              Try Now
              <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;