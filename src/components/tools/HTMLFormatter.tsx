import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, FileCode } from 'lucide-react';

const HTMLFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const { toast } = useToast();

  const formatHTML = () => {
    if (!input.trim()) return;
    
    // Basic HTML formatting
    let result = input
      .replace(/></g, '>\n<')
      .replace(/^\s+/gm, '')
      .split('\n')
      .map((line, index, arr) => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        
        let indent = 0;
        for (let i = 0; i < index; i++) {
          const prevLine = arr[i].trim();
          if (prevLine.match(/<[^\/][^>]*>/) && !prevLine.match(/<\/.*>/)) {
            indent++;
          }
          if (prevLine.match(/<\/.*>/)) {
            indent--;
          }
        }
        
        if (trimmed.match(/<\/.*>/)) {
          indent--;
        }
        
        return '  '.repeat(Math.max(0, indent)) + trimmed;
      })
      .filter(line => line.trim())
      .join('\n');
    
    setFormatted(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    toast({
      title: 'Copied!',
      description: 'Formatted HTML copied to clipboard',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">HTML Formatter</h1>
        <p className="text-muted-foreground">
          Format and beautify HTML code with proper indentation
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            Input HTML
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your HTML code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-48 font-mono text-sm"
          />
          <Button onClick={formatHTML} disabled={!input.trim()}>
            Format HTML
          </Button>
        </CardContent>
      </Card>

      {formatted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Formatted HTML
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
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
    </div>
  );
};

export default HTMLFormatter;