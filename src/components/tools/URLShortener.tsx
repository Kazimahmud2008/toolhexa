import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Globe, Link, BarChart3 } from 'lucide-react';

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<Array<{
    original: string;
    short: string;
    clicks: number;
    created: string;
  }>>([]);
  const { toast } = useToast();

  const generateShortCode = (length = 6) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const shortenUrl = () => {
    if (!originalUrl.trim()) {
      toast({
        title: 'Missing URL',
        description: 'Please enter a URL to shorten',
        variant: 'destructive',
      });
      return;
    }

    if (!isValidUrl(originalUrl)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL (including http:// or https://)',
        variant: 'destructive',
      });
      return;
    }

    const code = customAlias.trim() || generateShortCode();
    const shortUrl = `https://short.ly/${code}`;
    
    const newEntry = {
      original: originalUrl,
      short: shortUrl,
      clicks: 0,
      created: new Date().toLocaleDateString()
    };

    setShortenedUrls(prev => [newEntry, ...prev]);
    setShortUrl(shortUrl);
    setOriginalUrl('');
    setCustomAlias('');

    toast({
      title: 'URL Shortened!',
      description: 'Your shortened URL has been created',
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'URL copied to clipboard',
    });
  };

  const incrementClicks = (shortUrl: string) => {
    setShortenedUrls(prev => 
      prev.map(url => 
        url.short === shortUrl 
          ? { ...url, clicks: url.clicks + 1 }
          : url
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
        <p className="text-muted-foreground">
          Create short URLs for easy sharing and tracking
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Shorten URL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Original URL</label>
            <Input
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Alias (Optional)</label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 py-2 bg-muted rounded-l-md text-sm">
                short.ly/
              </span>
              <Input
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="custom-name"
                className="rounded-l-none"
              />
            </div>
          </div>

          <Button onClick={shortenUrl} disabled={!originalUrl.trim()} className="w-full">
            <Link className="h-4 w-4 mr-2" />
            Shorten URL
          </Button>
        </CardContent>
      </Card>

      {shortUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Shortened URL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input value={shortUrl} readOnly className="bg-muted" />
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(shortUrl)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {shortenedUrls.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              URL History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shortenedUrls.map((url, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="font-medium text-sm truncate">
                        {url.original}
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={url.short}
                          className="text-primary hover:underline text-sm"
                          onClick={() => incrementClicks(url.short)}
                        >
                          {url.short}
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(url.short)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{url.clicks} clicks</div>
                      <div>{url.created}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <Link className="h-8 w-8 mx-auto text-primary" />
              <div className="font-medium">Custom Aliases</div>
              <div className="text-sm text-muted-foreground">
                Create memorable short URLs with custom names
              </div>
            </div>
            <div className="text-center space-y-2">
              <BarChart3 className="h-8 w-8 mx-auto text-primary" />
              <div className="font-medium">Click Tracking</div>
              <div className="text-sm text-muted-foreground">
                Monitor how many times your links are clicked
              </div>
            </div>
            <div className="text-center space-y-2">
              <Globe className="h-8 w-8 mx-auto text-primary" />
              <div className="font-medium">Easy Sharing</div>
              <div className="text-sm text-muted-foreground">
                Share short URLs across any platform or medium
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default URLShortener;