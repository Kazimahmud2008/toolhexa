import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Image as ImageIcon, Trash2, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImagePlaceholderGenerator = () => {
  const [config, setConfig] = useState({
    width: 400,
    height: 300,
    backgroundColor: '#cccccc',
    textColor: '#666666',
    text: '',
    fontSize: 24,
    format: 'png'
  });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const presetSizes = [
    { name: 'Square Small', width: 200, height: 200 },
    { name: 'Square Medium', width: 400, height: 400 },
    { name: 'Square Large', width: 600, height: 600 },
    { name: 'Landscape 4:3', width: 640, height: 480 },
    { name: 'Landscape 16:9', width: 854, height: 480 },
    { name: 'Portrait 3:4', width: 480, height: 640 },
    { name: 'Banner', width: 728, height: 90 },
    { name: 'Social Media Post', width: 1080, height: 1080 },
    { name: 'Facebook Cover', width: 820, height: 312 },
    { name: 'Twitter Header', width: 1500, height: 500 }
  ];

  const colorPresets = [
    { name: 'Light Gray', bg: '#f5f5f5', text: '#666666' },
    { name: 'Dark Gray', bg: '#333333', text: '#cccccc' },
    { name: 'Blue', bg: '#e3f2fd', text: '#1976d2' },
    { name: 'Green', bg: '#e8f5e8', text: '#2e7d32' },
    { name: 'Orange', bg: '#fff3e0', text: '#f57c00' },
    { name: 'Purple', bg: '#f3e5f5', text: '#7b1fa2' },
    { name: 'Red', bg: '#ffebee', text: '#c62828' },
    { name: 'Cyan', bg: '#e0f2f1', text: '#00695c' }
  ];

  const generateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = config.width;
    canvas.height = config.height;

    // Fill background
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, config.width, config.height);

    // Draw border
    ctx.strokeStyle = config.textColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, config.width - 2, config.height - 2);

    // Set text properties
    ctx.fillStyle = config.textColor;
    ctx.font = `${config.fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Default text if none provided
    const displayText = config.text || `${config.width} × ${config.height}`;
    
    // Draw text
    const centerX = config.width / 2;
    const centerY = config.height / 2;
    
    // Check if text fits in one line
    const textWidth = ctx.measureText(displayText).width;
    const maxWidth = config.width - 40;
    
    if (textWidth <= maxWidth) {
      ctx.fillText(displayText, centerX, centerY);
    } else {
      // Split text into multiple lines
      const words = displayText.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = ctx.measureText(testLine).width;
        
        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            lines.push(word);
          }
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      const lineHeight = config.fontSize * 1.2;
      const totalHeight = lines.length * lineHeight;
      const startY = centerY - (totalHeight / 2) + (lineHeight / 2);
      
      lines.forEach((line, index) => {
        ctx.fillText(line, centerX, startY + (index * lineHeight));
      });
    }

    // Convert to data URL
    const mimeType = config.format === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = config.format === 'jpg' ? 0.9 : undefined;
    const dataUrl = canvas.toDataURL(mimeType, quality);
    setGeneratedImage(dataUrl);

    toast({
      title: "Generated!",
      description: "Placeholder image has been generated successfully"
    });
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.download = `placeholder-${config.width}x${config.height}.${config.format}`;
      link.href = generatedImage;
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Placeholder image has been downloaded"
      });
    }
  };

  const applyPresetSize = (preset: typeof presetSizes[0]) => {
    setConfig(prev => ({ ...prev, width: preset.width, height: preset.height }));
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setConfig(prev => ({ 
      ...prev, 
      backgroundColor: preset.bg, 
      textColor: preset.text 
    }));
  };

  const clear = () => {
    setGeneratedImage(null);
    setConfig({
      width: 400,
      height: 300,
      backgroundColor: '#cccccc',
      textColor: '#666666',
      text: '',
      fontSize: 24,
      format: 'png'
    });
  };

  // Auto-generate when config changes
  React.useEffect(() => {
    generateImage();
  }, [config]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Image Placeholder Generator</h1>
        <p className="text-muted-foreground">
          Generate placeholder images with custom text and colors for your designs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Image Settings
            </CardTitle>
            <CardDescription>
              Configure your placeholder image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={config.width}
                  onChange={(e) => setConfig(prev => ({ ...prev, width: parseInt(e.target.value) || 400 }))}
                  min="50"
                  max="2000"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={config.height}
                  onChange={(e) => setConfig(prev => ({ ...prev, height: parseInt(e.target.value) || 300 }))}
                  min="50"
                  max="2000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preset Sizes</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {presetSizes.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPresetSize(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="text">Custom Text (optional)</Label>
              <Input
                id="text"
                value={config.text}
                onChange={(e) => setConfig(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Leave empty for dimensions"
              />
            </div>

            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                id="fontSize"
                type="number"
                value={config.fontSize}
                onChange={(e) => setConfig(prev => ({ ...prev, fontSize: parseInt(e.target.value) || 24 }))}
                min="8"
                max="100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={config.backgroundColor}
                    onChange={(e) => setConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                    placeholder="#cccccc"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={config.textColor}
                    onChange={(e) => setConfig(prev => ({ ...prev, textColor: e.target.value }))}
                    className="w-16 h-10"
                  />
                  <Input
                    value={config.textColor}
                    onChange={(e) => setConfig(prev => ({ ...prev, textColor: e.target.value }))}
                    placeholder="#666666"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyColorPreset(preset)}
                    className="justify-start"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: preset.bg }}
                      />
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: preset.text }}
                      />
                      {preset.name}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="format">Format</Label>
              <Select value={config.format} onValueChange={(value) => setConfig(prev => ({ ...prev, format: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              {generatedImage && (
                <Button onClick={downloadImage} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
              <Button onClick={clear} variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Live preview of your placeholder image
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedImage ? (
              <div className="flex justify-center">
                <img
                  src={generatedImage}
                  alt="Generated placeholder"
                  className="max-w-full h-auto border rounded-lg"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <span className="text-muted-foreground">Configure settings to generate preview</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Hidden canvas for generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImagePlaceholderGenerator;