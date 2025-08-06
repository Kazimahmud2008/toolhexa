import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Smartphone } from 'lucide-react';

interface PlatformSize {
  width: number;
  height: number;
  name: string;
}

interface PlatformSizes {
  [key: string]: PlatformSize;
}

interface Platforms {
  [key: string]: PlatformSizes;
}

const platforms: Platforms = {
  instagram: {
    post: { width: 1080, height: 1080, name: 'Instagram Post (Square)' },
    story: { width: 1080, height: 1920, name: 'Instagram Story' },
    reel: { width: 1080, height: 1920, name: 'Instagram Reel' }
  },
  facebook: {
    post: { width: 1200, height: 630, name: 'Facebook Post' },
    cover: { width: 820, height: 312, name: 'Facebook Cover' },
    profile: { width: 170, height: 170, name: 'Facebook Profile' }
  },
  twitter: {
    post: { width: 1200, height: 675, name: 'Twitter Post' },
    header: { width: 1500, height: 500, name: 'Twitter Header' },
    profile: { width: 400, height: 400, name: 'Twitter Profile' }
  },
  linkedin: {
    post: { width: 1200, height: 627, name: 'LinkedIn Post' },
    cover: { width: 1584, height: 396, name: 'LinkedIn Cover' },
    profile: { width: 400, height: 400, name: 'LinkedIn Profile' }
  },
  youtube: {
    thumbnail: { width: 1280, height: 720, name: 'YouTube Thumbnail' },
    channel: { width: 2560, height: 1440, name: 'YouTube Channel Art' },
    profile: { width: 800, height: 800, name: 'YouTube Profile' }
  }
};

const SocialMediaResizer = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setResizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = () => {
    if (!originalImage || !selectedPlatform || !selectedSize) {
      toast({
        title: 'Missing Information',
        description: 'Please select an image, platform, and size',
        variant: 'destructive',
      });
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = new Image();
    img.onload = () => {
      const platformData = platforms[selectedPlatform as keyof typeof platforms];
      const targetSize = platformData[selectedSize as keyof typeof platformData];
      
      canvas.width = targetSize.width;
      canvas.height = targetSize.height;

      // Calculate scaling to fit image while maintaining aspect ratio
      const scale = Math.max(
        targetSize.width / img.width,
        targetSize.height / img.height
      );

      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      // Center the image
      const x = (targetSize.width - scaledWidth) / 2;
      const y = (targetSize.height - scaledHeight) / 2;

      // Fill background with white
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetSize.width, targetSize.height);

      // Draw the image
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      setResizedImage(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!resizedImage) return;

    const link = document.createElement('a');
    link.download = `${selectedPlatform}-${selectedSize}-resized.jpg`;
    link.href = resizedImage;
    link.click();
  };

  const getPlatformSizes = () => {
    if (!selectedPlatform) return [];
    return Object.entries(platforms[selectedPlatform as keyof typeof platforms]).map(([key, value]) => ({
      key,
      ...value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Social Media Image Resizer</h1>
        <p className="text-muted-foreground">
          Resize images for different social media platforms
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Upload & Configure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Image</label>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Size</label>
              <Select 
                value={selectedSize} 
                onValueChange={setSelectedSize}
                disabled={!selectedPlatform}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {getPlatformSizes().map((size) => (
                    <SelectItem key={size.key} value={size.key}>
                      {size.name} ({size.width}x{size.height})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={resizeImage} 
            disabled={!originalImage || !selectedPlatform || !selectedSize}
            className="w-full"
          >
            Resize Image
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {originalImage && (
          <Card>
            <CardHeader>
              <CardTitle>Original Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-auto max-h-64 object-contain rounded border"
              />
            </CardContent>
          </Card>
        )}

        {resizedImage && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Resized Image
                <Button variant="ghost" size="sm" onClick={downloadImage}>
                  <Download className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={resizedImage}
                alt="Resized"
                className="w-full h-auto max-h-64 object-contain rounded border"
              />
              {selectedPlatform && selectedSize && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {(platforms[selectedPlatform as keyof typeof platforms][selectedSize as any] as any).name}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default SocialMediaResizer;