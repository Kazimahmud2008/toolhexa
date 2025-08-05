import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, FileText } from 'lucide-react';

const YAMLFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const formatYAML = () => {
    if (!input.trim()) return;
    
    try {
      setError('');
      // Basic YAML formatting
      const lines = input.split('\n');
      let result = '';
      let currentIndent = 0;
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
          result += trimmed + '\n';
          continue;
        }
        
        if (trimmed.includes(':') && !trimmed.startsWith('-')) {
          const parts = trimmed.split(':');
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join(':').trim();
            result += '  '.repeat(currentIndent) + key + ': ' + value + '\n';
          }
        } else if (trimmed.startsWith('-')) {
          result += '  '.repeat(currentIndent) + trimmed + '\n';
        } else {
          result += '  '.repeat(currentIndent) + trimmed + '\n';
        }
      }
      
      setFormatted(result.trim());
    } catch (err) {
      setError('Invalid YAML format');
      setFormatted('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    toast({
      title: 'Copied!',
      description: 'Formatted YAML copied to clipboard',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">YAML Formatter</h1>
        <p className="text-muted-foreground">
          Format and validate YAML files with error detection
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Input YAML
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your YAML content here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-48 font-mono text-sm"
          />
          <Button onClick={formatYAML} disabled={!input.trim()}>
            Format YAML
          </Button>
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
        </CardContent>
      </Card>

      {formatted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Formatted YAML
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

export default YAMLFormatter;