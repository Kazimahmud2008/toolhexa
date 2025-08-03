import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Copy, Plus, Trash2, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

const CSSGradientGenerator = () => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [direction, setDirection] = useState(90);
  const [radialShape, setRadialShape] = useState<'circle' | 'ellipse'>('circle');
  const [radialPosition, setRadialPosition] = useState('center');
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: '1', color: '#ff0000', position: 0 },
    { id: '2', color: '#0000ff', position: 100 }
  ]);
  const { toast } = useToast();

  const generateGradientCSS = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    
    if (gradientType === 'linear') {
      return `linear-gradient(${direction}deg, ${stopsString})`;
    } else {
      return `radial-gradient(${radialShape} at ${radialPosition}, ${stopsString})`;
    }
  };

  const addColorStop = () => {
    const newId = Date.now().toString();
    const newPosition = colorStops.length > 0 ? Math.max(...colorStops.map(s => s.position)) + 10 : 50;
    const newStop: ColorStop = {
      id: newId,
      color: '#888888',
      position: Math.min(newPosition, 100)
    };
    setColorStops([...colorStops, newStop]);
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter(stop => stop.id !== id));
    } else {
      toast({
        title: "Cannot remove",
        description: "At least 2 color stops are required",
        variant: "destructive"
      });
    }
  };

  const updateColorStop = (id: string, field: keyof ColorStop, value: string | number) => {
    setColorStops(colorStops.map(stop => 
      stop.id === id ? { ...stop, [field]: value } : stop
    ));
  };

  const copyCSS = () => {
    const css = `background: ${generateGradientCSS()};`;
    navigator.clipboard.writeText(css);
    toast({
      title: "Copied!",
      description: "CSS gradient code has been copied to clipboard"
    });
  };

  const copyGradientOnly = () => {
    navigator.clipboard.writeText(generateGradientCSS());
    toast({
      title: "Copied!",
      description: "Gradient value has been copied to clipboard"
    });
  };

  const resetGradient = () => {
    setGradientType('linear');
    setDirection(90);
    setRadialShape('circle');
    setRadialPosition('center');
    setColorStops([
      { id: '1', color: '#ff0000', position: 0 },
      { id: '2', color: '#0000ff', position: 100 }
    ]);
  };

  const presetGradients = [
    {
      name: 'Sunset',
      type: 'linear' as const,
      direction: 45,
      stops: [
        { id: '1', color: '#ff7e5f', position: 0 },
        { id: '2', color: '#feb47b', position: 100 }
      ]
    },
    {
      name: 'Ocean',
      type: 'linear' as const,
      direction: 180,
      stops: [
        { id: '1', color: '#667eea', position: 0 },
        { id: '2', color: '#764ba2', position: 100 }
      ]
    },
    {
      name: 'Forest',
      type: 'linear' as const,
      direction: 90,
      stops: [
        { id: '1', color: '#134e5e', position: 0 },
        { id: '2', color: '#71b280', position: 100 }
      ]
    },
    {
      name: 'Purple Rain',
      type: 'linear' as const,
      direction: 135,
      stops: [
        { id: '1', color: '#667eea', position: 0 },
        { id: '2', color: '#764ba2', position: 50 },
        { id: '3', color: '#667eea', position: 100 }
      ]
    }
  ];

  const applyPreset = (preset: typeof presetGradients[0]) => {
    setGradientType(preset.type);
    setDirection(preset.direction);
    setColorStops(preset.stops.map((stop, index) => ({
      ...stop,
      id: Date.now().toString() + index
    })));
  };

  const directionalPresets = [
    { name: 'To Right', value: 90 },
    { name: 'To Left', value: 270 },
    { name: 'To Bottom', value: 180 },
    { name: 'To Top', value: 0 },
    { name: 'To Bottom Right', value: 135 },
    { name: 'To Bottom Left', value: 225 },
    { name: 'To Top Right', value: 45 },
    { name: 'To Top Left', value: 315 }
  ];

  const radialPositions = [
    'center', 'top', 'bottom', 'left', 'right',
    'top left', 'top right', 'bottom left', 'bottom right'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Gradient Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful CSS gradients with live preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Gradient Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={gradientType} onValueChange={(value) => setGradientType(value as 'linear' | 'radial')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="linear">Linear</TabsTrigger>
                  <TabsTrigger value="radial">Radial</TabsTrigger>
                </TabsList>
                
                <TabsContent value="linear" className="space-y-4">
                  <div>
                    <Label>Direction: {direction}°</Label>
                    <Slider
                      value={[direction]}
                      onValueChange={([value]) => setDirection(value)}
                      max={360}
                      min={0}
                      step={1}
                      className="w-full mt-2"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Quick Directions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {directionalPresets.map((preset) => (
                        <Button
                          key={preset.name}
                          variant="outline"
                          size="sm"
                          onClick={() => setDirection(preset.value)}
                        >
                          {preset.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="radial" className="space-y-4">
                  <div>
                    <Label>Shape</Label>
                    <Select value={radialShape} onValueChange={(value) => setRadialShape(value as 'circle' | 'ellipse')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="ellipse">Ellipse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Position</Label>
                    <Select value={radialPosition} onValueChange={setRadialPosition}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {radialPositions.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos.charAt(0).toUpperCase() + pos.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Stops</CardTitle>
              <CardDescription>
                Add and customize gradient color stops
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {colorStops.map((stop, index) => (
                <div key={stop.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColorStop(stop.id, 'color', e.target.value)}
                      className="w-12 h-8"
                    />
                    <Input
                      value={stop.color}
                      onChange={(e) => updateColorStop(stop.id, 'color', e.target.value)}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={stop.position}
                        onChange={(e) => updateColorStop(stop.id, 'position', parseInt(e.target.value) || 0)}
                        min="0"
                        max="100"
                        className="w-16"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeColorStop(stop.id)}
                    disabled={colorStops.length <= 2}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button onClick={addColorStop} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Color Stop
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {presetGradients.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-64 rounded-lg border"
                style={{ background: generateGradientCSS() }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSS Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>CSS Property</Label>
                <Textarea
                  value={`background: ${generateGradientCSS()};`}
                  readOnly
                  className="font-mono text-sm bg-muted"
                  rows={3}
                />
              </div>
              
              <div>
                <Label>Gradient Value Only</Label>
                <Textarea
                  value={generateGradientCSS()}
                  readOnly
                  className="font-mono text-sm bg-muted"
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={copyCSS} className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy CSS
                </Button>
                <Button onClick={copyGradientOnly} variant="outline" className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Gradient
                </Button>
              </div>
              
              <Button onClick={resetGradient} variant="outline" className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CSSGradientGenerator;