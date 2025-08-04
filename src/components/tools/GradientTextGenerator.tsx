import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Type, Palette } from 'lucide-react';

const GradientTextGenerator = () => {
  const [text, setText] = useState('Gradient Text');
  const [color1, setColor1] = useState('#ff0080');
  const [color2, setColor2] = useState('#7928ca');
  const [direction, setDirection] = useState('90deg');
  const [fontSize, setFontSize] = useState('48');
  const [fontWeight, setFontWeight] = useState('bold');
  const { toast } = useToast();

  const generateCSS = () => {
    return `.gradient-text {
  background: linear-gradient(${direction}, ${color1}, ${color2});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  display: inline-block;
}`;
  };

  const getTextStyle = () => ({
    background: `linear-gradient(${direction}, ${color1}, ${color2})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    display: 'inline-block',
  });

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: 'Copied!',
      description: 'CSS code copied to clipboard',
    });
  };

  const presetGradients = [
    { name: 'Sunset', colors: ['#ff0080', '#ff8c00'] },
    { name: 'Ocean', colors: ['#667eea', '#764ba2'] },
    { name: 'Rainbow', colors: ['#ff0080', '#7928ca'] },
    { name: 'Forest', colors: ['#11998e', '#38ef7d'] },
    { name: 'Purple', colors: ['#667eea', '#764ba2'] },
    { name: 'Fire', colors: ['#ff416c', '#ff4b2b'] },
  ];

  const applyPreset = (colors: string[]) => {
    setColor1(colors[0]);
    setColor2(colors[1]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Gradient Text Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful gradient text effects with CSS
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Text Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color1">Start Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-12 h-10 p-1 rounded border"
                  />
                  <Input
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    placeholder="#ff0080"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color2">End Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-12 h-10 p-1 rounded border"
                  />
                  <Input
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    placeholder="#7928ca"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Direction</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90deg">Left to Right</SelectItem>
                  <SelectItem value="0deg">Top to Bottom</SelectItem>
                  <SelectItem value="45deg">Diagonal ↗</SelectItem>
                  <SelectItem value="135deg">Diagonal ↘</SelectItem>
                  <SelectItem value="180deg">Bottom to Top</SelectItem>
                  <SelectItem value="270deg">Right to Left</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size (px)</Label>
                <Input
                  id="fontSize"
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  min="12"
                  max="200"
                />
              </div>
              <div className="space-y-2">
                <Label>Font Weight</Label>
                <Select value={fontWeight} onValueChange={setFontWeight}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="lighter">Lighter</SelectItem>
                    <SelectItem value="bolder">Bolder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {presetGradients.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset.colors)}
                    className="text-xs"
                  >
                    <Palette className="h-3 w-3 mr-1" />
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg min-h-[300px]">
              <div style={getTextStyle()}>
                {text || 'Gradient Text'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Generated CSS
            <Button variant="ghost" size="sm" onClick={copyCSS}>
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={generateCSS()}
            readOnly
            className="min-h-32 bg-muted font-mono text-sm"
          />
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> Gradient text uses -webkit-background-clip which may not be supported in all browsers. 
              Consider providing a fallback color for better compatibility.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradientTextGenerator;