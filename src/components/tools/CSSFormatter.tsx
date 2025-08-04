import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Code, Minimize2, Maximize2 } from 'lucide-react';

const CSSFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [minified, setMinified] = useState('');
  const { toast } = useToast();

  const formatCSS = () => {
    if (!input.trim()) return;

    // Basic CSS formatting
    let result = input
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/,\s*/g, ',\n')
      .replace(/\n\s*\n/g, '\n')
      .replace(/^\s+|\s+$/g, '')
      .replace(/\n  \}/g, '\n}');

    setFormatted(result);
  };

  const minifyCSS = () => {
    if (!input.trim()) return;

    // Basic CSS minification
    const result = input
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/\s*}\s*/g, '}')
      .replace(/,\s*/g, ',')
      .replace(/:\s*/g, ':')
      .trim();

    setMinified(result);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${type} CSS copied to clipboard`,
    });
  };

  const loadSample = () => {
    const sampleCSS = `body{margin:0;padding:0;font-family:Arial,sans-serif}
.container{max-width:1200px;margin:0 auto;padding:20px}
.header{background-color:#333;color:white;padding:10px 0}
.nav ul{list-style:none;margin:0;padding:0;display:flex}
.nav li{margin-right:20px}
.nav a{color:white;text-decoration:none}`;
    
    setInput(sampleCSS);
  };

  const clear = () => {
    setInput('');
    setFormatted('');
    setMinified('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Formatter</h1>
        <p className="text-muted-foreground">
          Format, beautify, and minify CSS code with proper indentation
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Input CSS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your CSS code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-48 font-mono text-sm"
          />
          <div className="flex gap-2 flex-wrap">
            <Button onClick={formatCSS} disabled={!input.trim()}>
              <Maximize2 className="h-4 w-4 mr-2" />
              Format CSS
            </Button>
            <Button onClick={minifyCSS} disabled={!input.trim()} variant="outline">
              <Minimize2 className="h-4 w-4 mr-2" />
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

      {formatted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Formatted CSS
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(formatted, 'Formatted')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formatted}
              readOnly
              className="min-h-48 bg-muted font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}

      {minified && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Minified CSS
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(minified, 'Minified')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={minified}
              readOnly
              className="min-h-32 bg-muted font-mono text-sm"
            />
            <div className="mt-4 text-sm text-muted-foreground">
              Original: {input.length} characters • Minified: {minified.length} characters • 
              Reduction: {input.length > 0 ? Math.round((1 - minified.length / input.length) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CSSFormatter;