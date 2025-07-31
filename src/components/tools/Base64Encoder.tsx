import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Base64Encoder = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const encodeToBase64 = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const decodeFromBase64 = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 string. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard"
    });
  };

  const clear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Base64 Encoder/Decoder</CardTitle>
          <CardDescription>
            Convert text to Base64 encoding or decode Base64 strings back to text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="encode" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
            
            <TabsContent value="encode" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Text to Encode</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to encode to Base64..."
                  className="min-h-[120px]"
                />
              </div>
              <Button onClick={encodeToBase64} className="w-full">
                Encode to Base64
              </Button>
            </TabsContent>
            
            <TabsContent value="decode" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Base64 to Decode</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter Base64 string to decode..."
                  className="min-h-[120px]"
                />
              </div>
              <Button onClick={decodeFromBase64} className="w-full">
                Decode from Base64
              </Button>
            </TabsContent>
          </Tabs>

          {output && (
            <div className="space-y-2">
              <label className="text-sm font-medium block">Result</label>
              <Textarea
                value={output}
                readOnly
                className="min-h-[120px] bg-muted"
              />
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button onClick={clear} variant="outline" size="sm">
                  Clear
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Base64Encoder;