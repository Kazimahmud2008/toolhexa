import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw, PaintBucket } from 'lucide-react';

const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [paletteType, setPaletteType] = useState('analogous');
  const [palette, setPalette] = useState<string[]>([]);
  const { toast } = useToast();

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

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

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const generatePalette = () => {
    const [h, s, l] = hexToHsl(baseColor);
    let colors: string[] = [];

    switch (paletteType) {
      case 'analogous':
        colors = [
          hslToHex((h - 30 + 360) % 360, s, l),
          hslToHex((h - 15 + 360) % 360, s, l),
          baseColor,
          hslToHex((h + 15) % 360, s, l),
          hslToHex((h + 30) % 360, s, l)
        ];
        break;
      case 'complementary':
        colors = [
          baseColor,
          hslToHex((h + 180) % 360, s, l)
        ];
        break;
      case 'triadic':
        colors = [
          baseColor,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l)
        ];
        break;
      case 'monochromatic':
        colors = [
          hslToHex(h, s, Math.max(10, l - 40)),
          hslToHex(h, s, Math.max(10, l - 20)),
          baseColor,
          hslToHex(h, s, Math.min(90, l + 20)),
          hslToHex(h, s, Math.min(90, l + 40))
        ];
        break;
      default:
        colors = [baseColor];
    }

    setPalette(colors);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: 'Copied!',
      description: `Color ${color} copied to clipboard`,
    });
  };

  const copyPalette = () => {
    navigator.clipboard.writeText(palette.join(', '));
    toast({
      title: 'Copied!',
      description: 'Entire palette copied to clipboard',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Color Palette Generator</h1>
        <p className="text-muted-foreground">
          Generate beautiful color palettes for your designs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PaintBucket className="h-5 w-5" />
            Palette Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Base Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Palette Type</label>
              <Select value={paletteType} onValueChange={setPaletteType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                  <SelectItem value="monochromatic">Monochromatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={generatePalette} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate Palette
          </Button>
        </CardContent>
      </Card>

      {palette.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated Palette
              <Button variant="ghost" size="sm" onClick={copyPalette}>
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className="w-full h-24 rounded-lg border border-border cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => copyColor(color)}
                  />
                  <div className="text-center">
                    <code className="text-sm font-mono">{color}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyColor(color)}
                      className="ml-2"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ColorPaletteGenerator;