import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

const HTMLEncoder = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const { toast } = useToast();

  const htmlEntities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  const reverseHtmlEntities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
    '&apos;': "'"
  };

  const encodeHTML = () => {
    const result = input.replace(/[&<>"'\/]/g, (s) => htmlEntities[s]);
    setEncoded(result);
  };

  const decodeHTML = () => {
    let result = input;
    Object.keys(reverseHtmlEntities).forEach(entity => {
      result = result.replace(new RegExp(entity, 'g'), reverseHtmlEntities[entity]);
    });
    setDecoded(result);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Text copied to clipboard',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter HTML to encode/decode..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-32"
          />
          <div className="flex gap-2 mt-4">
            <Button onClick={encodeHTML} disabled={!input}>
              Encode HTML
            </Button>
            <Button onClick={decodeHTML} disabled={!input} variant="outline">
              Decode HTML
            </Button>
          </div>
        </CardContent>
      </Card>

      {encoded && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Encoded Result
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(encoded)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={encoded}
              readOnly
              className="min-h-32 bg-muted"
            />
          </CardContent>
        </Card>
      )}

      {decoded && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Decoded Result
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(decoded)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={decoded}
              readOnly
              className="min-h-32 bg-muted"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HTMLEncoder;