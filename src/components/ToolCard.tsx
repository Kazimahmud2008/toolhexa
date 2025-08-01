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
    <Link to={`/tools/${id}`} className="block group">
      <Card className="h-full bg-card border-border hover:border-primary/30 transition-all duration-200 hover:shadow-card cursor-pointer transform hover:scale-105">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-neon group-hover:shadow-glow transition-all duration-300">
                {icon}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                  {name}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                  {popular && (
                    <Badge className="text-xs bg-gradient-primary text-white">
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
          <CardDescription className="text-muted-foreground mb-4 text-sm line-clamp-2 group-hover:text-foreground transition-colors">
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
            <div className="text-xs text-primary font-medium group-hover:text-primary-glow transition-colors">
              Click to open →
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ToolCard;