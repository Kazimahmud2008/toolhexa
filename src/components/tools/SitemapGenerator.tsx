import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Globe, Plus, Trash2 } from 'lucide-react';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const SitemapGenerator = () => {
  const [domain, setDomain] = useState('');
  const [urls, setUrls] = useState<SitemapUrl[]>([
    { loc: '', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' }
  ]);
  const [generatedSitemap, setGeneratedSitemap] = useState('');
  const { toast } = useToast();

  const addUrl = () => {
    setUrls([...urls, { 
      loc: '', 
      lastmod: new Date().toISOString().split('T')[0], 
      changefreq: 'monthly', 
      priority: '0.5' 
    }]);
  };

  const removeUrl = (index: number) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index: number, field: keyof SitemapUrl, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const generateSitemap = () => {
    if (!domain.trim()) {
      toast({
        title: 'Missing Domain',
        description: 'Please enter your website domain',
        variant: 'destructive',
      });
      return;
    }

    const validUrls = urls.filter(url => url.loc.trim());
    
    if (validUrls.length === 0) {
      toast({
        title: 'No URLs',
        description: 'Please add at least one URL to the sitemap',
        variant: 'destructive',
      });
      return;
    }

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    validUrls.forEach(url => {
      const fullUrl = url.loc.startsWith('http') ? url.loc : `${domain.replace(/\/$/, '')}${url.loc}`;
      sitemap += '  <url>\n';
      sitemap += `    <loc>${fullUrl}</loc>\n`;
      if (url.lastmod) {
        sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${url.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';

    setGeneratedSitemap(sitemap);
    
    toast({
      title: 'Sitemap Generated!',
      description: 'Your XML sitemap has been created',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSitemap);
    toast({
      title: 'Copied!',
      description: 'Sitemap XML copied to clipboard',
    });
  };

  const downloadFile = () => {
    const blob = new Blob([generatedSitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Downloaded!',
      description: 'Sitemap.xml file has been downloaded',
    });
  };

  const loadSampleData = () => {
    setDomain('https://yourwebsite.com');
    setUrls([
      { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
      { loc: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { loc: '/services', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      { loc: '/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'yearly', priority: '0.7' },
      { loc: '/blog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.8' }
    ]);
  };

  const bulkImport = (urlList: string) => {
    const lines = urlList.split('\n').filter(line => line.trim());
    const newUrls = lines.map(line => ({
      loc: line.trim(),
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.5'
    }));
    setUrls(newUrls);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Sitemap Generator</h1>
        <p className="text-muted-foreground">
          Generate XML sitemaps for better search engine indexing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Website Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Website Domain *</Label>
                <Input
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  type="url"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={loadSampleData} variant="outline" className="flex-1">
                  Load Sample
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                URL List
                <Button onClick={addUrl} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add URL
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {urls.map((url, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>URL {index + 1}</Label>
                      {urls.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeUrl(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <Input
                      value={url.loc}
                      onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                      placeholder="/page-path or full URL"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Last Modified</Label>
                        <Input
                          type="date"
                          value={url.lastmod}
                          onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Priority</Label>
                        <Select
                          value={url.priority}
                          onValueChange={(value) => updateUrl(index, 'priority', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                            <SelectItem value="0.9">0.9</SelectItem>
                            <SelectItem value="0.8">0.8</SelectItem>
                            <SelectItem value="0.7">0.7</SelectItem>
                            <SelectItem value="0.6">0.6</SelectItem>
                            <SelectItem value="0.5">0.5 (Default)</SelectItem>
                            <SelectItem value="0.4">0.4</SelectItem>
                            <SelectItem value="0.3">0.3</SelectItem>
                            <SelectItem value="0.2">0.2</SelectItem>
                            <SelectItem value="0.1">0.1 (Lowest)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Change Frequency</Label>
                      <Select
                        value={url.changefreq}
                        onValueChange={(value) => updateUrl(index, 'changefreq', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">Always</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={generateSitemap} className="w-full">
                Generate Sitemap
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Import URLs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste URLs here (one per line)&#10;/about&#10;/services&#10;/contact&#10;/blog"
                className="min-h-24"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    bulkImport(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <Button
                onClick={(e) => {
                  const textarea = e.currentTarget.previousElementSibling as HTMLTextAreaElement;
                  bulkImport(textarea.value);
                  textarea.value = '';
                }}
                variant="outline"
                className="w-full"
              >
                Import URLs (Ctrl+Enter)
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {generatedSitemap && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Generated Sitemap
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={downloadFile}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generatedSitemap}
                  readOnly
                  className="min-h-96 bg-muted font-mono text-sm"
                />
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-medium mb-2">Next Steps:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Save the XML content as 'sitemap.xml'</li>
                    <li>2. Upload to your website's root directory</li>
                    <li>3. Add sitemap URL to robots.txt: Sitemap: {domain}/sitemap.xml</li>
                    <li>4. Submit to Google Search Console and Bing Webmaster Tools</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Sitemap Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Priority Values</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>1.0:</strong> Homepage, most important pages</li>
                  <li>• <strong>0.8-0.9:</strong> Major category pages</li>
                  <li>• <strong>0.5-0.7:</strong> Regular content pages</li>
                  <li>• <strong>0.1-0.4:</strong> Less important pages</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Change Frequency</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Always:</strong> For pages that change every time they're accessed</li>
                  <li>• <strong>Daily:</strong> News sites, blogs</li>
                  <li>• <strong>Weekly:</strong> Product pages, forums</li>
                  <li>• <strong>Monthly:</strong> General content pages</li>
                  <li>• <strong>Yearly:</strong> About pages, policies</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Maximum 50,000 URLs per sitemap</li>
                  <li>• Keep file size under 50MB</li>
                  <li>• Use absolute URLs</li>
                  <li>• Update regularly</li>
                  <li>• Include only canonical URLs</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SitemapGenerator;