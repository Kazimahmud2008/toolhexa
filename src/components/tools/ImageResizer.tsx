import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Upload, Download, Image as ImageIcon, Trash2, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageResizer = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setTargetWidth(img.width);
        setTargetHeight(img.height);
      };
      img.src = URL.createObjectURL(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file",
        variant: "destructive"
      });
    }
  };

  const handleWidthChange = (value: string) => {
    const width = parseInt(value) || 0;
    setTargetWidth(width);
    
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width;
      setTargetHeight(Math.round(width * aspectRatio));
    }
  };

  const handleHeightChange = (value: string) => {
    const height = parseInt(value) || 0;
    setTargetHeight(height);
    
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setTargetWidth(Math.round(height * aspectRatio));
    }
  };

  const resizeImage = () => {
    if (!originalImage || targetWidth <= 0 || targetHeight <= 0) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const resizedDataUrl = canvas.toDataURL('image/png');
        setResizedImage(resizedDataUrl);
        
        toast({
          title: "Success!",
          description: "Image has been resized successfully"
        });
      }
    };

    img.src = URL.createObjectURL(originalImage);
  };

  const downloadResized = () => {
    if (resizedImage) {
      const link = document.createElement('a');
      link.download = `resized_${originalImage?.name || 'image.png'}`;
      link.href = resizedImage;
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Resized image has been downloaded"
      });
    }
  };

  const clear = () => {
    setOriginalImage(null);
    setResizedImage(null);
    setOriginalDimensions({ width: 0, height: 0 });
    setTargetWidth(800);
    setTargetHeight(600);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const setPresetSize = (width: number, height: number) => {
    setTargetWidth(width);
    setTargetHeight(height);
  };

  const presetSizes = [
    { name: "HD (1280x720)", width: 1280, height: 720 },
    { name: "Full HD (1920x1080)", width: 1920, height: 1080 },
    { name: "Instagram Square (1080x1080)", width: 1080, height: 1080 },
    { name: "Instagram Story (1080x1920)", width: 1080, height: 1920 },
    { name: "Facebook Cover (820x312)", width: 820, height: 312 },
    { name: "Twitter Header (1500x500)", width: 1500, height: 500 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Image Resizer</h1>
        <p className="text-muted-foreground">
          Resize images while maintaining aspect ratio and quality
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image file to resize
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="mb-4"
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Image
            </Button>
            <p className="text-sm text-muted-foreground">
              Support for JPG, PNG, WebP, and other image formats
            </p>
          </div>

          {originalImage && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {originalDimensions.width} × {originalDimensions.height}
                  </div>
                  <div className="text-sm text-muted-foreground">Original Size</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {targetWidth} × {targetHeight}
                  </div>
                  <div className="text-sm text-muted-foreground">Target Size</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={maintainAspectRatio}
                    onCheckedChange={setMaintainAspectRatio}
                  />
                  <Label className="flex items-center gap-2">
                    <Link className="h-4 w-4" />
                    Maintain aspect ratio
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={targetWidth}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={targetHeight}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      min="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preset Sizes</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {presetSizes.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => setPresetSize(preset.width, preset.height)}
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  <Button onClick={resizeImage}>
                    Resize Image
                  </Button>
                  {resizedImage && (
                    <Button onClick={downloadResized} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button onClick={clear} variant="outline">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {resizedImage && originalImage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Original</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={URL.createObjectURL(originalImage)}
                alt="Original"
                className="w-full h-auto rounded-lg border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resized</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={resizedImage}
                alt="Resized"
                className="w-full h-auto rounded-lg border"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;