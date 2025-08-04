import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Terminal } from 'lucide-react';

const JavaScriptFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const { toast } = useToast();

  const formatJS = () => {
    if (!input.trim()) return;
    
    // Basic JS formatting
    let result = input
      .replace(/;/g, ';\n')
      .replace(/{/g, ' {\n  ')
      .replace(/}/g, '\n}\n')
      .replace(/,/g, ',\n  ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    
    setFormatted(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    toast({
      title: 'Copied!',
      description: 'Formatted JavaScript copied to clipboard',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">JavaScript Formatter</h1>
        <p className="text-muted-foreground">
          Format and beautify JavaScript code with syntax highlighting
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Input JavaScript
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your JavaScript code here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-48 font-mono text-sm"
          />
          <Button onClick={formatJS} disabled={!input.trim()}>
            Format JavaScript
          </Button>
        </CardContent>
      </Card>

      {formatted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Formatted JavaScript
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

export default JavaScriptFormatter;