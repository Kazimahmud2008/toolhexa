import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, Image as ImageIcon, Trash2, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FaviconGenerator = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [favicons, setFavicons] = useState<{ size: number; dataUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const faviconSizes = [16, 32, 48, 64, 96, 128, 152, 180, 192, 256, 512];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      generateFavicons(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file",
        variant: "destructive"
      });
    }
  };

  const generateFavicons = (file: File) => {
    const img = new Image();
    
    img.onload = () => {
      const newFavicons: { size: number; dataUrl: string }[] = [];
      
      faviconSizes.forEach(size => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          canvas.width = size;
          canvas.height = size;
          
          // Clear canvas with transparent background
          ctx.clearRect(0, 0, size, size);
          
          // Draw image scaled to fit the canvas
          ctx.drawImage(img, 0, 0, size, size);
          
          const dataUrl = canvas.toDataURL('image/png');
          newFavicons.push({ size, dataUrl });
        }
      });
      
      setFavicons(newFavicons);
      toast({
        title: "Success!",
        description: "Favicons generated for all standard sizes"
      });
    };

    img.src = URL.createObjectURL(file);
  };

  const downloadFavicon = (size: number, dataUrl: string) => {
    const link = document.createElement('a');
    link.download = `favicon-${size}x${size}.png`;
    link.href = dataUrl;
    link.click();
    
    toast({
      title: "Downloaded!",
      description: `Favicon ${size}x${size} has been downloaded`
    });
  };

  const downloadAll = () => {
    favicons.forEach(({ size, dataUrl }) => {
      setTimeout(() => {
        downloadFavicon(size, dataUrl);
      }, size * 10); // Stagger downloads to avoid browser blocking
    });
    
    toast({
      title: "Downloaded!",
      description: "All favicons have been downloaded"
    });
  };

  const clear = () => {
    setOriginalImage(null);
    setFavicons([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSizeCategory = (size: number) => {
    if (size <= 32) return 'Browser';
    if (size <= 96) return 'Desktop';
    if (size <= 192) return 'Mobile';
    return 'High Resolution';
  };

  const getSizeCategoryColor = (size: number) => {
    if (size <= 32) return 'bg-blue-100 text-blue-800';
    if (size <= 96) return 'bg-green-100 text-green-800';
    if (size <= 192) return 'bg-orange-100 text-orange-800';
    return 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Favicon Generator</h1>
        <p className="text-muted-foreground">
          Generate favicons in multiple sizes and formats from your image
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image file to generate favicons. Square images work best.
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

          {originalImage && favicons.length > 0 && (
            <div className="space-y-4">
              <div className="flex gap-2 justify-center">
                <Button onClick={downloadAll}>
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
                <Button onClick={clear} variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {originalImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Original Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(originalImage)}
                alt="Original"
                className="max-w-xs h-auto rounded-lg border"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {favicons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Favicons</CardTitle>
            <CardDescription>
              Click on any favicon to download it individually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {favicons.map(({ size, dataUrl }) => (
                <div
                  key={size}
                  className="border rounded-lg p-4 text-center hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => downloadFavicon(size, dataUrl)}
                >
                  <div className="flex justify-center mb-2">
                    <img
                      src={dataUrl}
                      alt={`Favicon ${size}x${size}`}
                      className="border rounded"
                      style={{ width: Math.min(size, 64), height: Math.min(size, 64) }}
                    />
                  </div>
                  <div className="text-sm font-medium">{size}×{size}</div>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs mt-1 ${getSizeCategoryColor(size)}`}
                  >
                    {getSizeCategory(size)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {favicons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>HTML Usage</CardTitle>
            <CardDescription>
              Add these links to your HTML head section
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
              <div>&lt;link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png"&gt;</div>
              <div>&lt;link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png"&gt;</div>
              <div>&lt;link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png"&gt;</div>
              <div>&lt;link rel="apple-touch-icon" sizes="180x180" href="favicon-180x180.png"&gt;</div>
              <div>&lt;link rel="manifest" href="/site.webmanifest"&gt;</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FaviconGenerator;