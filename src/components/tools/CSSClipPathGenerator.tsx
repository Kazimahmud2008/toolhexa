import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Split } from 'lucide-react';

const CSSClipPathGenerator = () => {
  const [shapeType, setShapeType] = useState('circle');
  const [circleRadius, setCircleRadius] = useState('50%');
  const [circleX, setCircleX] = useState('50%');
  const [circleY, setCircleY] = useState('50%');
  const [ellipseRx, setEllipseRx] = useState('50%');
  const [ellipseRy, setEllipseRy] = useState('25%');
  const [ellipseX, setEllipseX] = useState('50%');
  const [ellipseY, setEllipseY] = useState('50%');
  const [insetTop, setInsetTop] = useState('10%');
  const [insetRight, setInsetRight] = useState('10%');
  const [insetBottom, setInsetBottom] = useState('10%');
  const [insetLeft, setInsetLeft] = useState('10%');
  const [customPath, setCustomPath] = useState('polygon(50% 0%, 0% 100%, 100% 100%)');
  const { toast } = useToast();

  const generateClipPath = () => {
    switch (shapeType) {
      case 'circle':
        return `circle(${circleRadius} at ${circleX} ${circleY})`;
      case 'ellipse':
        return `ellipse(${ellipseRx} ${ellipseRy} at ${ellipseX} ${ellipseY})`;
      case 'inset':
        return `inset(${insetTop} ${insetRight} ${insetBottom} ${insetLeft})`;
      case 'triangle':
        return 'polygon(50% 0%, 0% 100%, 100% 100%)';
      case 'diamond':
        return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      case 'hexagon':
        return 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)';
      case 'star':
        return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      case 'custom':
        return customPath;
      default:
        return 'none';
    }
  };

  const generateCSS = () => {
    return `.clipped-element {
  clip-path: ${generateClipPath()};
  background: #3b82f6;
  width: 200px;
  height: 200px;
}`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: 'Copied!',
      description: 'CSS clip-path code copied to clipboard',
    });
  };

  const presetShapes = [
    { name: 'Triangle', type: 'triangle' },
    { name: 'Diamond', type: 'diamond' },
    { name: 'Hexagon', type: 'hexagon' },
    { name: 'Star', type: 'star' },
  ];

  const applyPreset = (type: string) => {
    setShapeType(type);
  };

  const getClipPathStyle = () => ({
    clipPath: generateClipPath(),
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    width: '200px',
    height: '200px',
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Clip Path Generator</h1>
        <p className="text-muted-foreground">
          Create custom shapes using CSS clip-path property
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Split className="h-5 w-5" />
              Shape Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Shape Type</Label>
              <Select value={shapeType} onValueChange={setShapeType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="ellipse">Ellipse</SelectItem>
                  <SelectItem value="inset">Inset Rectangle</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                  <SelectItem value="hexagon">Hexagon</SelectItem>
                  <SelectItem value="star">Star</SelectItem>
                  <SelectItem value="custom">Custom Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {shapeType === 'circle' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="circleRadius">Radius</Label>
                  <Input
                    id="circleRadius"
                    value={circleRadius}
                    onChange={(e) => setCircleRadius(e.target.value)}
                    placeholder="50%"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="circleX">Center X</Label>
                    <Input
                      id="circleX"
                      value={circleX}
                      onChange={(e) => setCircleX(e.target.value)}
                      placeholder="50%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="circleY">Center Y</Label>
                    <Input
                      id="circleY"
                      value={circleY}
                      onChange={(e) => setCircleY(e.target.value)}
                      placeholder="50%"
                    />
                  </div>
                </div>
              </div>
            )}

            {shapeType === 'ellipse' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ellipseRx">Radius X</Label>
                    <Input
                      id="ellipseRx"
                      value={ellipseRx}
                      onChange={(e) => setEllipseRx(e.target.value)}
                      placeholder="50%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ellipseRy">Radius Y</Label>
                    <Input
                      id="ellipseRy"
                      value={ellipseRy}
                      onChange={(e) => setEllipseRy(e.target.value)}
                      placeholder="25%"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ellipseX">Center X</Label>
                    <Input
                      id="ellipseX"
                      value={ellipseX}
                      onChange={(e) => setEllipseX(e.target.value)}
                      placeholder="50%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ellipseY">Center Y</Label>
                    <Input
                      id="ellipseY"
                      value={ellipseY}
                      onChange={(e) => setEllipseY(e.target.value)}
                      placeholder="50%"
                    />
                  </div>
                </div>
              </div>
            )}

            {shapeType === 'inset' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="insetTop">Top</Label>
                  <Input
                    id="insetTop"
                    value={insetTop}
                    onChange={(e) => setInsetTop(e.target.value)}
                    placeholder="10%"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insetRight">Right</Label>
                  <Input
                    id="insetRight"
                    value={insetRight}
                    onChange={(e) => setInsetRight(e.target.value)}
                    placeholder="10%"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insetBottom">Bottom</Label>
                  <Input
                    id="insetBottom"
                    value={insetBottom}
                    onChange={(e) => setInsetBottom(e.target.value)}
                    placeholder="10%"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insetLeft">Left</Label>
                  <Input
                    id="insetLeft"
                    value={insetLeft}
                    onChange={(e) => setInsetLeft(e.target.value)}
                    placeholder="10%"
                  />
                </div>
              </div>
            )}

            {shapeType === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="customPath">Custom Polygon Path</Label>
                <Textarea
                  id="customPath"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  placeholder="polygon(50% 0%, 0% 100%, 100% 100%)"
                  className="min-h-24"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Shape Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {presetShapes.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset.type)}
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
              <div style={getClipPathStyle()}></div>
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
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Tip:</strong> You can use percentage values, pixel values, or viewport units. 
              For complex shapes, use online polygon generators or drawing tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSClipPathGenerator;