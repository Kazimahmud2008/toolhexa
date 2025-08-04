import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Copy, Settings } from 'lucide-react';

const CSSBorderRadiusGenerator = () => {
  const [topLeft, setTopLeft] = useState([20]);
  const [topRight, setTopRight] = useState([20]);
  const [bottomRight, setBottomRight] = useState([20]);
  const [bottomLeft, setBottomLeft] = useState([20]);
  const [uniformRadius, setUniformRadius] = useState(true);
  const [unit, setUnit] = useState('px');
  const { toast } = useToast();

  const generateCSS = () => {
    if (uniformRadius) {
      return `.element {
  border-radius: ${topLeft[0]}${unit};
}`;
    } else {
      return `.element {
  border-radius: ${topLeft[0]}${unit} ${topRight[0]}${unit} ${bottomRight[0]}${unit} ${bottomLeft[0]}${unit};
}

/* Individual properties */
.element-individual {
  border-top-left-radius: ${topLeft[0]}${unit};
  border-top-right-radius: ${topRight[0]}${unit};
  border-bottom-right-radius: ${bottomRight[0]}${unit};
  border-bottom-left-radius: ${bottomLeft[0]}${unit};
}`;
    }
  };

  const getBorderRadiusStyle = () => {
    if (uniformRadius) {
      return {
        borderRadius: `${topLeft[0]}${unit}`,
      };
    } else {
      return {
        borderTopLeftRadius: `${topLeft[0]}${unit}`,
        borderTopRightRadius: `${topRight[0]}${unit}`,
        borderBottomRightRadius: `${bottomRight[0]}${unit}`,
        borderBottomLeftRadius: `${bottomLeft[0]}${unit}`,
      };
    }
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: 'Copied!',
      description: 'CSS border-radius code copied to clipboard',
    });
  };

  const presets = [
    { name: 'None', values: [0, 0, 0, 0] },
    { name: 'Small', values: [4, 4, 4, 4] },
    { name: 'Medium', values: [8, 8, 8, 8] },
    { name: 'Large', values: [16, 16, 16, 16] },
    { name: 'Circle', values: [50, 50, 50, 50], unit: '%' },
    { name: 'Pill', values: [9999, 9999, 9999, 9999] },
    { name: 'Organic', values: [63, 20, 35, 80] },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setTopLeft([preset.values[0]]);
    setTopRight([preset.values[1]]);
    setBottomRight([preset.values[2]]);
    setBottomLeft([preset.values[3]]);
    if (preset.unit) {
      setUnit(preset.unit);
    }
    setUniformRadius(preset.values.every(v => v === preset.values[0]));
  };

  const handleUniformChange = (checked: boolean) => {
    setUniformRadius(checked);
    if (checked) {
      const value = topLeft[0];
      setTopRight([value]);
      setBottomRight([value]);
      setBottomLeft([value]);
    }
  };

  const handleUniformRadiusChange = (value: number[]) => {
    setTopLeft(value);
    if (uniformRadius) {
      setTopRight(value);
      setBottomRight(value);
      setBottomLeft(value);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Border Radius Generator</h1>
        <p className="text-muted-foreground">
          Create custom border radius with visual preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Border Radius Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="uniform" 
                checked={uniformRadius} 
                onCheckedChange={(checked) => handleUniformChange(checked === true)}
              />
              <Label htmlFor="uniform">Uniform radius</Label>
            </div>

            <div className="flex items-center space-x-4">
              <Label>Unit:</Label>
              <div className="flex space-x-2">
                <Button
                  variant={unit === 'px' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUnit('px')}
                >
                  px
                </Button>
                <Button
                  variant={unit === '%' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUnit('%')}
                >
                  %
                </Button>
                <Button
                  variant={unit === 'rem' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUnit('rem')}
                >
                  rem
                </Button>
              </div>
            </div>

            {uniformRadius ? (
              <div className="space-y-2">
                <Label>All Corners: {topLeft[0]}{unit}</Label>
                <Slider
                  value={topLeft}
                  onValueChange={handleUniformRadiusChange}
                  max={unit === '%' ? 50 : 100}
                  min={0}
                  step={unit === 'rem' ? 0.25 : 1}
                  className="w-full"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Top Left: {topLeft[0]}{unit}</Label>
                  <Slider
                    value={topLeft}
                    onValueChange={setTopLeft}
                    max={unit === '%' ? 50 : 100}
                    min={0}
                    step={unit === 'rem' ? 0.25 : 1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Top Right: {topRight[0]}{unit}</Label>
                  <Slider
                    value={topRight}
                    onValueChange={setTopRight}
                    max={unit === '%' ? 50 : 100}
                    min={0}
                    step={unit === 'rem' ? 0.25 : 1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bottom Right: {bottomRight[0]}{unit}</Label>
                  <Slider
                    value={bottomRight}
                    onValueChange={setBottomRight}
                    max={unit === '%' ? 50 : 100}
                    min={0}
                    step={unit === 'rem' ? 0.25 : 1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bottom Left: {bottomLeft[0]}{unit}</Label>
                  <Slider
                    value={bottomLeft}
                    onValueChange={setBottomLeft}
                    max={unit === '%' ? 50 : 100}
                    min={0}
                    step={unit === 'rem' ? 0.25 : 1}
                    className="w-full"
                  />
                </div>
              </div>
            )}

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
                className="w-48 h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium border-2 border-white/20"
                style={getBorderRadiusStyle()}
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
            className="min-h-32 bg-muted font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSBorderRadiusGenerator;