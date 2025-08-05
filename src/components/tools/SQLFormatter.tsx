import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Database } from 'lucide-react';

const SQLFormatter = () => {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const { toast } = useToast();

  const formatSQL = () => {
    if (!input.trim()) return;
    
    // Basic SQL formatting
    let result = input
      .replace(/\bSELECT\b/gi, '\nSELECT')
      .replace(/\bFROM\b/gi, '\nFROM')
      .replace(/\bWHERE\b/gi, '\nWHERE')
      .replace(/\bAND\b/gi, '\n  AND')
      .replace(/\bOR\b/gi, '\n  OR')
      .replace(/\bORDER BY\b/gi, '\nORDER BY')
      .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
      .replace(/\bHAVING\b/gi, '\nHAVING')
      .replace(/\bJOIN\b/gi, '\nJOIN')
      .replace(/\bINNER JOIN\b/gi, '\nINNER JOIN')
      .replace(/\bLEFT JOIN\b/gi, '\nLEFT JOIN')
      .replace(/\bRIGHT JOIN\b/gi, '\nRIGHT JOIN')
      .replace(/\bUPDATE\b/gi, '\nUPDATE')
      .replace(/\bSET\b/gi, '\nSET')
      .replace(/\bINSERT INTO\b/gi, '\nINSERT INTO')
      .replace(/\bVALUES\b/gi, '\nVALUES')
      .replace(/\bDELETE\b/gi, '\nDELETE')
      .replace(/,/g, ',\n  ')
      .replace(/\n\s*\n/g, '\n')
      .trim();
    
    setFormatted(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    toast({
      title: 'Copied!',
      description: 'Formatted SQL copied to clipboard',
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">SQL Formatter</h1>
        <p className="text-muted-foreground">
          Format and beautify SQL queries with proper indentation
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Input SQL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste your SQL query here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-48 font-mono text-sm"
          />
          <Button onClick={formatSQL} disabled={!input.trim()}>
            Format SQL
          </Button>
        </CardContent>
      </Card>

      {formatted && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Formatted SQL
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

export default SQLFormatter;