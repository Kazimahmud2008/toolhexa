import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ColorPicker = () => {
  const [color, setColor] = useState('#3b82f6');
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${value} copied to clipboard`
    });
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Color Picker</CardTitle>
          <CardDescription>
            Pick colors and get values in different formats (HEX, RGB, HSL)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Color Picker</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-32 rounded-lg border border-border cursor-pointer"
              />
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">HEX Value</label>
              <div className="flex gap-2">
                <Input
                  value={color.toUpperCase()}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                />
                <Button onClick={() => copyToClipboard(color.toUpperCase())} variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rgb && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">RGB</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <div>R: {rgb.r}</div>
                    <div>G: {rgb.g}</div>
                    <div>B: {rgb.b}</div>
                  </div>
                  <div className="flex gap-2">
                    <code className="flex-1 text-sm bg-muted p-2 rounded">
                      rgb({rgb.r}, {rgb.g}, {rgb.b})
                    </code>
                    <Button 
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} 
                      variant="outline" 
                      size="sm"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {hsl && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">HSL</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <div>H: {hsl.h}°</div>
                    <div>S: {hsl.s}%</div>
                    <div>L: {hsl.l}%</div>
                  </div>
                  <div className="flex gap-2">
                    <code className="flex-1 text-sm bg-muted p-2 rounded">
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </code>
                    <Button 
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} 
                      variant="outline" 
                      size="sm"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="w-full h-16 rounded-lg border border-border"
                  style={{ backgroundColor: color }}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPicker;