import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Package, Download } from 'lucide-react';

const CSSMinifier = () => {
  const [input, setInput] = useState('');
  const [minified, setMinified] = useState('');
  const { toast } = useToast();

  const minifyCSS = () => {
    if (!input.trim()) return;

    // Advanced CSS minification
    let result = input
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove spaces around specific characters
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/\s*}\s*/g, '}')
      .replace(/,\s*/g, ',')
      .replace(/:\s*/g, ':')
      .replace(/;\s*}/g, '}')
      // Remove trailing semicolons
      .replace(/;}/g, '}')
      // Remove empty rules
      .replace(/[^{}]+{\s*}/g, '')
      // Remove leading/trailing whitespace
      .trim();

    setMinified(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(minified);
    toast({
      title: 'Copied!',
      description: 'Minified CSS copied to clipboard',
    });
  };

  const downloadMinified = () => {
    const blob = new Blob([minified], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Downloaded!',
      description: 'Minified CSS file has been downloaded',
    });
  };

  const loadSample = () => {
    const sampleCSS = `/* Main styles */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #ffffff;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    background-color: #333333;
    color: white;
    padding: 10px 0;
    text-align: center;
}

.nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
}

.nav li {
    margin-right: 20px;
}

.nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

.nav a:hover {
    text-decoration: underline;
}`;
    
    setInput(sampleCSS);
  };

  const clear = () => {
    setInput('');
    setMinified('');
  };

  const calculateReduction = () => {
    if (input.length === 0) return 0;
    return Math.round((1 - minified.length / input.length) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Minifier</h1>
        <p className="text-muted-foreground">
          Minify CSS code to reduce file size for production
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Input CSS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your CSS code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-64 font-mono text-sm"
          />
          <div className="flex gap-2 flex-wrap">
            <Button onClick={minifyCSS} disabled={!input.trim()}>
              <Package className="h-4 w-4 mr-2" />
              Minify CSS
            </Button>
            <Button onClick={loadSample} variant="outline">
              Load Sample
            </Button>
            <Button onClick={clear} variant="outline">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {minified && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Minified CSS
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={downloadMinified}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={minified}
              readOnly
              className="min-h-32 bg-muted font-mono text-sm"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{input.length.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Original Characters</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{minified.length.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Minified Characters</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{calculateReduction()}%</div>
                <div className="text-sm text-muted-foreground">Size Reduction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CSSMinifier;