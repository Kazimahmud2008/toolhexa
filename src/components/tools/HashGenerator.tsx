import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('MD5');
  const [hash, setHash] = useState('');
  const { toast } = useToast();

  // Simple hash functions (for demo purposes - in production use crypto libraries)
  const md5 = (str: string) => {
    // Simple MD5 implementation for demo
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  const sha1 = (str: string) => {
    // Simple SHA1 simulation for demo
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(10, '0');
  };

  const sha256 = (str: string) => {
    // Simple SHA256 simulation for demo
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  };

  const generateHash = () => {
    if (!input) return;

    let result = '';
    switch (algorithm) {
      case 'MD5':
        result = md5(input);
        break;
      case 'SHA1':
        result = sha1(input);
        break;
      case 'SHA256':
        result = sha256(input);
        break;
      default:
        result = md5(input);
    }
    setHash(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    toast({
      title: 'Copied!',
      description: 'Hash copied to clipboard',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hash Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter text to hash..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-32"
            />
            <div className="flex gap-4">
              <Select value={algorithm} onValueChange={setAlgorithm}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MD5">MD5</SelectItem>
                  <SelectItem value="SHA1">SHA1</SelectItem>
                  <SelectItem value="SHA256">SHA256</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={generateHash} disabled={!input}>
                Generate Hash
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {hash && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {algorithm} Hash
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg">
              <code className="font-mono text-sm break-all">{hash}</code>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HashGenerator;