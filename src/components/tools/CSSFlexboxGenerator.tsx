import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Layers } from 'lucide-react';

const CSSFlexboxGenerator = () => {
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [gap, setGap] = useState('0');
  const { toast } = useToast();

  const generateCSS = () => {
    return `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};${gap !== '0' ? `\n  gap: ${gap};` : ''}
}

.flex-item {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  min-width: 100px;
}`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: 'Copied!',
      description: 'CSS code copied to clipboard',
    });
  };

  const getContainerStyle = () => ({
    display: 'flex',
    flexDirection: flexDirection as any,
    justifyContent: justifyContent as any,
    alignItems: alignItems as any,
    flexWrap: flexWrap as any,
    gap: gap,
    minHeight: '200px',
    border: '1px solid hsl(var(--border))',
    borderRadius: '6px',
    padding: '16px',
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Flexbox Generator</h1>
        <p className="text-muted-foreground">
          Generate CSS flexbox layouts with visual controls and live preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Flexbox Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Flex Direction</Label>
              <Select value={flexDirection} onValueChange={setFlexDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">row</SelectItem>
                  <SelectItem value="row-reverse">row-reverse</SelectItem>
                  <SelectItem value="column">column</SelectItem>
                  <SelectItem value="column-reverse">column-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Justify Content</Label>
              <Select value={justifyContent} onValueChange={setJustifyContent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="space-between">space-between</SelectItem>
                  <SelectItem value="space-around">space-around</SelectItem>
                  <SelectItem value="space-evenly">space-evenly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Align Items</Label>
              <Select value={alignItems} onValueChange={setAlignItems}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stretch">stretch</SelectItem>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="baseline">baseline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Flex Wrap</Label>
              <Select value={flexWrap} onValueChange={setFlexWrap}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nowrap">nowrap</SelectItem>
                  <SelectItem value="wrap">wrap</SelectItem>
                  <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Gap</Label>
              <Select value={gap} onValueChange={setGap}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="0.5rem">0.5rem</SelectItem>
                  <SelectItem value="1rem">1rem</SelectItem>
                  <SelectItem value="1.5rem">1.5rem</SelectItem>
                  <SelectItem value="2rem">2rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated CSS</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generateCSS()}
              readOnly
              className="min-h-64 bg-muted font-mono text-sm"
            />
            <Button onClick={copyCSS} className="mt-4 w-full">
              <Copy className="h-4 w-4 mr-2" />
              Copy CSS
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={getContainerStyle()}>
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="bg-muted border border-border rounded p-4 text-center text-sm min-w-[100px]"
              >
                Item {i + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSFlexboxGenerator;