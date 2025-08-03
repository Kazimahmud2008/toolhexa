import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, Image as ImageIcon, Trash2, Crop } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageCropper = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [cropData, setCropData] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 200
  });
  const [aspectRatio, setAspectRatio] = useState('custom');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const aspectRatios = [
    { value: 'custom', label: 'Custom', ratio: null },
    { value: '1:1', label: '1:1 (Square)', ratio: 1 },
    { value: '4:3', label: '4:3', ratio: 4/3 },
    { value: '16:9', label: '16:9', ratio: 16/9 },
    { value: '3:2', label: '3:2', ratio: 3/2 },
    { value: '5:4', label: '5:4', ratio: 5/4 }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        setCropData({
          x: 0,
          y: 0,
          width: Math.min(200, img.width),
          height: Math.min(200, img.height)
        });
        drawImageOnCanvas(img);
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

  const drawImageOnCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale down image if too large for preview
    const maxSize = 500;
    let { width, height } = img;
    
    if (width > maxSize || height > maxSize) {
      if (width > height) {
        height = (height * maxSize) / width;
        width = maxSize;
      } else {
        width = (width * maxSize) / height;
        height = maxSize;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    
    drawCropOverlay(ctx, width, height);
  };

  const drawCropOverlay = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    const scaleX = canvasWidth / imageDimensions.width;
    const scaleY = canvasHeight / imageDimensions.height;
    
    const scaledCrop = {
      x: cropData.x * scaleX,
      y: cropData.y * scaleY,
      width: cropData.width * scaleX,
      height: cropData.height * scaleY
    };

    // Draw overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Clear crop area
    ctx.clearRect(scaledCrop.x, scaledCrop.y, scaledCrop.width, scaledCrop.height);
    
    // Redraw image in crop area
    if (originalImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(
          img,
          cropData.x, cropData.y, cropData.width, cropData.height,
          scaledCrop.x, scaledCrop.y, scaledCrop.width, scaledCrop.height
        );
        
        // Draw crop border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(scaledCrop.x, scaledCrop.y, scaledCrop.width, scaledCrop.height);
      };
      img.src = URL.createObjectURL(originalImage);
    }
  };

  const handleAspectRatioChange = (value: string) => {
    setAspectRatio(value);
    const selected = aspectRatios.find(ar => ar.value === value);
    
    if (selected?.ratio) {
      const newHeight = Math.round(cropData.width / selected.ratio);
      setCropData(prev => ({ ...prev, height: newHeight }));
    }
  };

  const handleCropDataChange = (field: keyof typeof cropData, value: string) => {
    const numValue = parseInt(value) || 0;
    let newCropData = { ...cropData, [field]: numValue };
    
    // Apply aspect ratio constraint
    const selected = aspectRatios.find(ar => ar.value === aspectRatio);
    if (selected?.ratio && (field === 'width' || field === 'height')) {
      if (field === 'width') {
        newCropData.height = Math.round(numValue / selected.ratio);
      } else {
        newCropData.width = Math.round(numValue * selected.ratio);
      }
    }
    
    // Ensure crop area doesn't exceed image bounds
    newCropData.x = Math.max(0, Math.min(newCropData.x, imageDimensions.width - newCropData.width));
    newCropData.y = Math.max(0, Math.min(newCropData.y, imageDimensions.height - newCropData.height));
    newCropData.width = Math.min(newCropData.width, imageDimensions.width - newCropData.x);
    newCropData.height = Math.min(newCropData.height, imageDimensions.height - newCropData.y);
    
    setCropData(newCropData);
  };

  const cropImage = () => {
    if (!originalImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = cropData.width;
      canvas.height = cropData.height;
      
      if (ctx) {
        ctx.drawImage(
          img,
          cropData.x, cropData.y, cropData.width, cropData.height,
          0, 0, cropData.width, cropData.height
        );
        
        const croppedDataUrl = canvas.toDataURL('image/png');
        setCroppedImage(croppedDataUrl);
        
        toast({
          title: "Success!",
          description: "Image has been cropped successfully"
        });
      }
    };

    img.src = URL.createObjectURL(originalImage);
  };

  const downloadCropped = () => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.download = `cropped_${originalImage?.name || 'image.png'}`;
      link.href = croppedImage;
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Cropped image has been downloaded"
      });
    }
  };

  const clear = () => {
    setOriginalImage(null);
    setCroppedImage(null);
    setImageDimensions({ width: 0, height: 0 });
    setCropData({ x: 0, y: 0, width: 200, height: 200 });
    setAspectRatio('custom');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Update canvas when crop data changes
  React.useEffect(() => {
    if (originalImage && canvasRef.current) {
      const img = new Image();
      img.onload = () => drawImageOnCanvas(img);
      img.src = URL.createObjectURL(originalImage);
    }
  }, [cropData, originalImage]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Image Cropper</h1>
        <p className="text-muted-foreground">
          Crop images to specific dimensions or aspect ratios
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image file to crop
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
        </CardContent>
      </Card>

      {originalImage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Image Preview</CardTitle>
              <CardDescription>
                The white rectangle shows the crop area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border rounded-lg max-w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Crop Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="aspectRatio">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={handleAspectRatioChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="x">X Position</Label>
                  <Input
                    id="x"
                    type="number"
                    value={cropData.x}
                    onChange={(e) => handleCropDataChange('x', e.target.value)}
                    min="0"
                    max={imageDimensions.width - cropData.width}
                  />
                </div>
                <div>
                  <Label htmlFor="y">Y Position</Label>
                  <Input
                    id="y"
                    type="number"
                    value={cropData.y}
                    onChange={(e) => handleCropDataChange('y', e.target.value)}
                    min="0"
                    max={imageDimensions.height - cropData.height}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={cropData.width}
                    onChange={(e) => handleCropDataChange('width', e.target.value)}
                    min="1"
                    max={imageDimensions.width}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={cropData.height}
                    onChange={(e) => handleCropDataChange('height', e.target.value)}
                    min="1"
                    max={imageDimensions.height}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={cropImage} className="flex-1">
                  <Crop className="h-4 w-4 mr-2" />
                  Crop Image
                </Button>
                <Button onClick={clear} variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {croppedImage && (
        <Card>
          <CardHeader>
            <CardTitle>Cropped Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img
                src={croppedImage}
                alt="Cropped"
                className="border rounded-lg max-w-full h-auto"
              />
            </div>
            <div className="flex justify-center">
              <Button onClick={downloadCropped}>
                <Download className="h-4 w-4 mr-2" />
                Download Cropped Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageCropper;