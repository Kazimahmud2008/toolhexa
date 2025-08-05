import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Copy, Hash, RefreshCw } from 'lucide-react';

const hashtagSuggestions = {
  photography: ['#photography', '#photooftheday', '#picoftheday', '#instaphoto', '#photographer', '#photo', '#canon', '#nikon', '#portrait', '#landscape'],
  travel: ['#travel', '#wanderlust', '#explore', '#adventure', '#vacation', '#travelgram', '#instatravel', '#travelphotography', '#backpacking', '#tourism'],
  food: ['#food', '#foodie', '#instafood', '#foodporn', '#delicious', '#yummy', '#foodphotography', '#cooking', '#recipe', '#restaurant'],
  fitness: ['#fitness', '#gym', '#workout', '#health', '#fit', '#motivation', '#training', '#bodybuilding', '#cardio', '#exercise'],
  fashion: ['#fashion', '#style', '#ootd', '#outfit', '#fashionista', '#streetstyle', '#fashionblogger', '#trends', '#designer', '#shopping'],
  business: ['#business', '#entrepreneur', '#startup', '#success', '#marketing', '#leadership', '#innovation', '#growth', '#productivity', '#networking'],
  technology: ['#technology', '#tech', '#innovation', '#coding', '#programming', '#developer', '#software', '#ai', '#digital', '#startup'],
  art: ['#art', '#artist', '#artwork', '#creative', '#painting', '#drawing', '#design', '#illustration', '#gallery', '#contemporaryart']
};

const HashtagGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [customHashtags, setCustomHashtags] = useState('');
  const { toast } = useToast();

  const generateHashtags = () => {
    if (!keyword.trim()) {
      toast({
        title: 'Missing Keyword',
        description: 'Please enter a keyword to generate hashtags',
        variant: 'destructive',
      });
      return;
    }

    const baseHashtags = [`#${keyword.toLowerCase().replace(/\s+/g, '')}`];
    
    // Add related hashtags based on keyword
    const relatedHashtags = [
      `#${keyword.toLowerCase()}gram`,
      `#${keyword.toLowerCase()}life`,
      `#${keyword.toLowerCase()}love`,
      `#daily${keyword.toLowerCase()}`,
      `#${keyword.toLowerCase()}addict`,
    ];

    // Add category-specific hashtags if selected
    let categoryHashtags: string[] = [];
    if (selectedCategory && hashtagSuggestions[selectedCategory as keyof typeof hashtagSuggestions]) {
      categoryHashtags = hashtagSuggestions[selectedCategory as keyof typeof hashtagSuggestions].slice(0, 15);
    }

    // Generic popular hashtags
    const popularHashtags = [
      '#instagood', '#photooftheday', '#follow', '#picoftheday', 
      '#love', '#beautiful', '#happy', '#fun', '#smile', '#amazing'
    ];

    const allHashtags = [...baseHashtags, ...relatedHashtags, ...categoryHashtags, ...popularHashtags];
    const uniqueHashtags = Array.from(new Set(allHashtags)).slice(0, 30);
    
    setGeneratedHashtags(uniqueHashtags);
  };

  const copyHashtags = (hashtags: string[]) => {
    const text = hashtags.join(' ');
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Hashtags copied to clipboard',
    });
  };

  const copyAll = () => {
    const allHashtags = [...generatedHashtags];
    if (customHashtags.trim()) {
      const custom = customHashtags.split(/[\s,]+/).filter(h => h.trim());
      allHashtags.push(...custom.map(h => h.startsWith('#') ? h : `#${h}`));
    }
    copyHashtags(allHashtags);
  };

  const removeHashtag = (hashtag: string) => {
    setGeneratedHashtags(prev => prev.filter(h => h !== hashtag));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Hashtag Generator</h1>
        <p className="text-muted-foreground">
          Generate relevant hashtags for your social media posts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Generate Hashtags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Main Keyword</label>
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., photography, travel, food"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category (Optional)</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select category</option>
                {Object.keys(hashtagSuggestions).map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={generateHashtags} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Hashtags
          </Button>
        </CardContent>
      </Card>

      {generatedHashtags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated Hashtags ({generatedHashtags.length})
              <Button variant="ghost" size="sm" onClick={() => copyHashtags(generatedHashtags)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {generatedHashtags.map((hashtag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeHashtag(hashtag)}
                >
                  {hashtag} ×
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Custom Hashtags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={customHashtags}
            onChange={(e) => setCustomHashtags(e.target.value)}
            placeholder="Add your own hashtags here (space or comma separated)"
            className="min-h-24"
          />
          <Button onClick={copyAll} className="w-full" disabled={!generatedHashtags.length && !customHashtags.trim()}>
            <Copy className="h-4 w-4 mr-2" />
            Copy All Hashtags
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Popular Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.keys(hashtagSuggestions).map(category => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-primary text-primary-foreground' : ''}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HashtagGenerator;