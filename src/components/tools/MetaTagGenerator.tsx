import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy, Globe, Code } from 'lucide-react';

const MetaTagGenerator = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    url: '',
    image: '',
    siteName: '',
    type: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    locale: 'en_US'
  });
  
  const [generatedTags, setGeneratedTags] = useState('');
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateMetaTags = () => {
    if (!formData.title || !formData.description) {
      toast({
        title: 'Missing Required Fields',
        description: 'Title and description are required to generate meta tags',
        variant: 'destructive',
      });
      return;
    }

    const tags = [];

    // Basic meta tags
    tags.push(`<title>${formData.title}</title>`);
    tags.push(`<meta name="description" content="${formData.description}">`);
    
    if (formData.keywords) {
      tags.push(`<meta name="keywords" content="${formData.keywords}">`);
    }
    
    if (formData.author) {
      tags.push(`<meta name="author" content="${formData.author}">`);
    }

    // Open Graph tags
    tags.push(`<meta property="og:title" content="${formData.title}">`);
    tags.push(`<meta property="og:description" content="${formData.description}">`);
    tags.push(`<meta property="og:type" content="${formData.type}">`);
    
    if (formData.url) {
      tags.push(`<meta property="og:url" content="${formData.url}">`);
    }
    
    if (formData.image) {
      tags.push(`<meta property="og:image" content="${formData.image}">`);
    }
    
    if (formData.siteName) {
      tags.push(`<meta property="og:site_name" content="${formData.siteName}">`);
    }
    
    tags.push(`<meta property="og:locale" content="${formData.locale}">`);

    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${formData.twitterCard}">`);
    tags.push(`<meta name="twitter:title" content="${formData.title}">`);
    tags.push(`<meta name="twitter:description" content="${formData.description}">`);
    
    if (formData.image) {
      tags.push(`<meta name="twitter:image" content="${formData.image}">`);
    }
    
    if (formData.twitterSite) {
      tags.push(`<meta name="twitter:site" content="${formData.twitterSite}">`);
    }

    // Additional SEO tags
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0">`);
    tags.push(`<meta charset="UTF-8">`);
    tags.push(`<meta name="robots" content="index, follow">`);

    const formattedTags = tags.join('\n');
    setGeneratedTags(formattedTags);
    
    toast({
      title: 'Meta Tags Generated!',
      description: 'Your SEO meta tags have been created',
    });
  };

  const copyTags = () => {
    navigator.clipboard.writeText(generatedTags);
    toast({
      title: 'Copied!',
      description: 'Meta tags copied to clipboard',
    });
  };

  const loadSample = () => {
    setFormData({
      title: 'Best Web Development Tools 2024 | YourSite',
      description: 'Discover the top web development tools and resources for 2024. Comprehensive guides, tutorials, and reviews for developers.',
      keywords: 'web development, tools, programming, HTML, CSS, JavaScript, tutorials',
      author: 'John Developer',
      url: 'https://yoursite.com/web-development-tools',
      image: 'https://yoursite.com/images/web-dev-tools.jpg',
      siteName: 'YourSite',
      type: 'article',
      twitterCard: 'summary_large_image',
      twitterSite: '@yoursite',
      locale: 'en_US'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Meta Tag Generator</h1>
        <p className="text-muted-foreground">
          Generate SEO meta tags for better search engine optimization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Page Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Your page title (50-60 characters)"
                maxLength={60}
              />
              <div className="text-xs text-muted-foreground">
                {formData.title.length}/60 characters
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of your page content (150-160 characters)"
                maxLength={160}
                className="min-h-20"
              />
              <div className="text-xs text-muted-foreground">
                {formData.description.length}/160 characters
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Author name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Canonical URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://yoursite.com/page"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://yoursite.com/image.jpg"
                type="url"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media & SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={formData.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                placeholder="Your Website Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Content Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="website">Website</option>
                <option value="article">Article</option>
                <option value="product">Product</option>
                <option value="profile">Profile</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterCard">Twitter Card Type</Label>
              <select
                id="twitterCard"
                value={formData.twitterCard}
                onChange={(e) => handleInputChange('twitterCard', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="summary">Summary</option>
                <option value="summary_large_image">Summary Large Image</option>
                <option value="app">App</option>
                <option value="player">Player</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitterSite">Twitter Handle</Label>
              <Input
                id="twitterSite"
                value={formData.twitterSite}
                onChange={(e) => handleInputChange('twitterSite', e.target.value)}
                placeholder="@yoursite"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="locale">Language/Locale</Label>
              <select
                id="locale"
                value={formData.locale}
                onChange={(e) => handleInputChange('locale', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="en_US">English (US)</option>
                <option value="en_GB">English (UK)</option>
                <option value="es_ES">Spanish</option>
                <option value="fr_FR">French</option>
                <option value="de_DE">German</option>
                <option value="it_IT">Italian</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateMetaTags} className="flex-1">
                Generate Meta Tags
              </Button>
              <Button onClick={loadSample} variant="outline">
                Load Sample
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {generatedTags && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Generated Meta Tags
              </div>
              <Button variant="ghost" size="sm" onClick={copyTags}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Tags
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedTags}
              readOnly
              className="min-h-96 bg-muted font-mono text-sm"
            />
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-medium mb-2">How to use these meta tags:</h4>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Copy the generated meta tags above</li>
                <li>2. Paste them in the &lt;head&gt; section of your HTML document</li>
                <li>3. Replace placeholder URLs with your actual URLs</li>
                <li>4. Test your meta tags using tools like Facebook Debugger or Twitter Card Validator</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetaTagGenerator;