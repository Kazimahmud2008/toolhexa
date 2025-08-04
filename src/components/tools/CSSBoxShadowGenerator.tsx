import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Copy, Layers } from 'lucide-react';

const CSSBoxShadowGenerator = () => {
  const [offsetX, setOffsetX] = useState([0]);
  const [offsetY, setOffsetY] = useState([8]);
  const [blurRadius, setBlurRadius] = useState([24]);
  const [spreadRadius, setSpreadRadius] = useState([0]);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [opacity, setOpacity] = useState([25]);
  const [inset, setInset] = useState(false);
  const { toast } = useToast();

  const generateCSS = () => {
    const rgba = hexToRgba(shadowColor, opacity[0] / 100);
    const insetText = inset ? 'inset ' : '';
    
    return `.element {
  box-shadow: ${insetText}${offsetX[0]}px ${offsetY[0]}px ${blurRadius[0]}px ${spreadRadius[0]}px ${rgba};
}`;
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getBoxShadowStyle = () => {
    const rgba = hexToRgba(shadowColor, opacity[0] / 100);
    const insetText = inset ? 'inset ' : '';
    return {
      boxShadow: `${insetText}${offsetX[0]}px ${offsetY[0]}px ${blurRadius[0]}px ${spreadRadius[0]}px ${rgba}`,
    };
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: 'Copied!',
      description: 'CSS box-shadow code copied to clipboard',
    });
  };

  const presets = [
    { name: 'Subtle', values: { offsetX: [0], offsetY: [1], blur: [3], spread: [0], opacity: [12] } },
    { name: 'Medium', values: { offsetX: [0], offsetY: [4], blur: [6], spread: [-1], opacity: [10] } },
    { name: 'Large', values: { offsetX: [0], offsetY: [10], blur: [15], spread: [-3], opacity: [10] } },
    { name: 'Extra Large', values: { offsetX: [0], offsetY: [20], blur: [25], spread: [-5], opacity: [10] } },
    { name: 'Glow', values: { offsetX: [0], offsetY: [0], blur: [20], spread: [0], opacity: [50] } },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setOffsetX(preset.values.offsetX);
    setOffsetY(preset.values.offsetY);
    setBlurRadius(preset.values.blur);
    setSpreadRadius(preset.values.spread);
    setOpacity(preset.values.opacity);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Box Shadow Generator</h1>
        <p className="text-muted-foreground">
          Generate CSS box shadows with interactive controls
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Shadow Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Horizontal Offset: {offsetX[0]}px</Label>
              <Slider
                value={offsetX}
                onValueChange={setOffsetX}
                max={50}
                min={-50}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Vertical Offset: {offsetY[0]}px</Label>
              <Slider
                value={offsetY}
                onValueChange={setOffsetY}
                max={50}
                min={-50}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Blur Radius: {blurRadius[0]}px</Label>
              <Slider
                value={blurRadius}
                onValueChange={setBlurRadius}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Spread Radius: {spreadRadius[0]}px</Label>
              <Slider
                value={spreadRadius}
                onValueChange={setSpreadRadius}
                max={50}
                min={-50}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Opacity: {opacity[0]}%</Label>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shadowColor">Shadow Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="w-12 h-10 p-1 rounded border"
                />
                <Input
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="inset" 
                checked={inset} 
                onCheckedChange={(checked) => setInset(checked === true)}
              />
              <Label htmlFor="inset">Inset shadow</Label>
            </div>

            <div className="space-y-2">
              <Label>Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="text-xs"
                  >
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
            <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg min-h-[400px]">
              <div
                className="w-48 h-32 bg-white dark:bg-card rounded-lg flex items-center justify-center text-sm font-medium border"
                style={getBoxShadowStyle()}
              >
                Preview Element
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
            className="min-h-24 bg-muted font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSBoxShadowGenerator;