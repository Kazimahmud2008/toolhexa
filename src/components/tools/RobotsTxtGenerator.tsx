import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Shield, Plus, Trash2 } from 'lucide-react';

interface RobotRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
}

const RobotsTxtGenerator = () => {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [crawlDelay, setCrawlDelay] = useState('');
  const [host, setHost] = useState('');
  const [rules, setRules] = useState<RobotRule[]>([
    { userAgent: '*', allow: [], disallow: [] }
  ]);
  const [generatedRobots, setGeneratedRobots] = useState('');
  const { toast } = useToast();

  const addRule = () => {
    setRules([...rules, { userAgent: '', allow: [], disallow: [] }]);
  };

  const removeRule = (index: number) => {
    if (rules.length > 1) {
      setRules(rules.filter((_, i) => i !== index));
    }
  };

  const updateRule = (index: number, field: keyof RobotRule, value: any) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
  };

  const addPath = (ruleIndex: number, type: 'allow' | 'disallow', path: string) => {
    if (path.trim()) {
      const newRules = [...rules];
      newRules[ruleIndex][type].push(path.trim());
      setRules(newRules);
    }
  };

  const removePath = (ruleIndex: number, type: 'allow' | 'disallow', pathIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex][type].splice(pathIndex, 1);
    setRules(newRules);
  };

  const generateRobotsTxt = () => {
    let robotsContent = '';

    // Add rules for each user agent
    rules.forEach(rule => {
      if (rule.userAgent) {
        robotsContent += `User-agent: ${rule.userAgent}\n`;
        
        // Add disallow rules
        rule.disallow.forEach(path => {
          robotsContent += `Disallow: ${path}\n`;
        });
        
        // Add allow rules
        rule.allow.forEach(path => {
          robotsContent += `Allow: ${path}\n`;
        });
        
        // Add crawl delay if specified
        if (crawlDelay && rule.userAgent !== '*') {
          robotsContent += `Crawl-delay: ${crawlDelay}\n`;
        }
        
        robotsContent += '\n';
      }
    });

    // Add sitemap URL
    if (sitemapUrl) {
      robotsContent += `Sitemap: ${sitemapUrl}\n`;
    }

    // Add host if specified
    if (host) {
      robotsContent += `Host: ${host}\n`;
    }

    setGeneratedRobots(robotsContent.trim());
    
    toast({
      title: 'Robots.txt Generated!',
      description: 'Your robots.txt file has been created',
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRobots);
    toast({
      title: 'Copied!',
      description: 'Robots.txt content copied to clipboard',
    });
  };

  const downloadFile = () => {
    const blob = new Blob([generatedRobots], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Downloaded!',
      description: 'Robots.txt file has been downloaded',
    });
  };

  const loadTemplate = (template: string) => {
    switch (template) {
      case 'allow-all':
        setRules([{ userAgent: '*', allow: ['/'], disallow: [] }]);
        break;
      case 'disallow-all':
        setRules([{ userAgent: '*', allow: [], disallow: ['/'] }]);
        break;
      case 'standard':
        setRules([
          { userAgent: '*', allow: [], disallow: ['/admin/', '/private/', '/temp/'] },
          { userAgent: 'Googlebot', allow: ['/'], disallow: ['/admin/'] }
        ]);
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Robots.txt Generator</h1>
        <p className="text-muted-foreground">
          Generate robots.txt files for search engine crawling control
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Button onClick={() => loadTemplate('allow-all')} variant="outline">
          Allow All Template
        </Button>
        <Button onClick={() => loadTemplate('disallow-all')} variant="outline">
          Disallow All Template
        </Button>
        <Button onClick={() => loadTemplate('standard')} variant="outline">
          Standard Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                User Agent Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rules.map((rule, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>User Agent</Label>
                    {rules.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRule(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <Input
                    value={rule.userAgent}
                    onChange={(e) => updateRule(index, 'userAgent', e.target.value)}
                    placeholder="* (all bots) or specific bot name"
                  />

                  <div className="space-y-2">
                    <Label>Disallow Paths</Label>
                    {rule.disallow.map((path, pathIndex) => (
                      <div key={pathIndex} className="flex gap-2">
                        <Input value={path} readOnly />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePath(index, 'disallow', pathIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="/admin/, /private/, etc."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addPath(index, 'disallow', e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          addPath(index, 'disallow', input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Allow Paths</Label>
                    {rule.allow.map((path, pathIndex) => (
                      <div key={pathIndex} className="flex gap-2">
                        <Input value={path} readOnly />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePath(index, 'allow', pathIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="/public/, /assets/, etc."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addPath(index, 'allow', e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          addPath(index, 'allow', input.value);
                          input.value = '';
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button onClick={addRule} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add User Agent Rule
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Global Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sitemap">Sitemap URL</Label>
                <Input
                  id="sitemap"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://yoursite.com/sitemap.xml"
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crawlDelay">Crawl Delay (seconds)</Label>
                <Input
                  id="crawlDelay"
                  value={crawlDelay}
                  onChange={(e) => setCrawlDelay(e.target.value)}
                  placeholder="10"
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="host">Preferred Host</Label>
                <Input
                  id="host"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="https://www.yoursite.com"
                  type="url"
                />
              </div>

              <Button onClick={generateRobotsTxt} className="w-full">
                Generate Robots.txt
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {generatedRobots && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Generated Robots.txt
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
                  value={generatedRobots}
                  readOnly
                  className="min-h-96 bg-muted font-mono text-sm"
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Robots.txt Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Common User Agents</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code>*</code> - All web crawlers</li>
                  <li>• <code>Googlebot</code> - Google's crawler</li>
                  <li>• <code>Bingbot</code> - Microsoft Bing's crawler</li>
                  <li>• <code>Slurp</code> - Yahoo's crawler</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Path Examples</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code>/admin/</code> - Block admin directory</li>
                  <li>• <code>/private/*</code> - Block all private files</li>
                  <li>• <code>/*.pdf$</code> - Block all PDF files</li>
                  <li>• <code>/</code> - Allow/disallow entire site</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Place robots.txt in root directory</li>
                  <li>• Use lowercase for file names</li>
                  <li>• Include sitemap URL</li>
                  <li>• Test with Google Search Console</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RobotsTxtGenerator;