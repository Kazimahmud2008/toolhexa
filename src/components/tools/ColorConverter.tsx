import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';

const ColorConverter = () => {
  const [hex, setHex] = useState('#ff0000');
  const [rgb, setRgb] = useState({ r: 255, g: 0, b: 0 });
  const [hsl, setHsl] = useState({ h: 0, s: 100, l: 50 });
  const [cmyk, setCmyk] = useState({ c: 0, m: 100, y: 100, k: 0 });
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, Math.max(g, b));
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const rgbValue = hexToRgb(newHex);
    setRgb(rgbValue);
    setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
    setCmyk(rgbToCmyk(rgbValue.r, rgbValue.g, rgbValue.b));
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${format} color copied to clipboard`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Color Converter</h1>
        <p className="text-muted-foreground">
          Convert colors between different formats and color spaces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="w-full h-32 rounded-lg border border-border"
              style={{ backgroundColor: hex }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              HEX
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                placeholder="#ff0000"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(hex, 'HEX')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RGB</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="r">R</Label>
                <Input id="r" value={rgb.r} readOnly />
              </div>
              <div>
                <Label htmlFor="g">G</Label>
                <Input id="g" value={rgb.g} readOnly />
              </div>
              <div>
                <Label htmlFor="b">B</Label>
                <Input id="b" value={rgb.b} readOnly />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}
              className="w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy RGB
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HSL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="h">H</Label>
                <Input id="h" value={`${hsl.h}°`} readOnly />
              </div>
              <div>
                <Label htmlFor="s">S</Label>
                <Input id="s" value={`${hsl.s}%`} readOnly />
              </div>
              <div>
                <Label htmlFor="l">L</Label>
                <Input id="l" value={`${hsl.l}%`} readOnly />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}
              className="w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy HSL
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>CMYK</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              <div>
                <Label htmlFor="c">C</Label>
                <Input id="c" value={`${cmyk.c}%`} readOnly />
              </div>
              <div>
                <Label htmlFor="m">M</Label>
                <Input id="m" value={`${cmyk.m}%`} readOnly />
              </div>
              <div>
                <Label htmlFor="y">Y</Label>
                <Input id="y" value={`${cmyk.y}%`} readOnly />
              </div>
              <div>
                <Label htmlFor="k">K</Label>
                <Input id="k" value={`${cmyk.k}%`} readOnly />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, 'CMYK')}
              className="w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy CMYK
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorConverter;