import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Upload, Eye, Image as ImageIcon, Trash2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageMetadata {
  filename: string;
  fileSize: number;
  fileType: string;
  dimensions: {
    width: number;
    height: number;
  };
  aspectRatio: string;
  created: string;
  modified: string;
  colorProfile?: string;
  hasTransparency?: boolean;
  compression?: string;
  quality?: number;
}

const ImageMetadataViewer = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      extractMetadata(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file",
        variant: "destructive"
      });
    }
  };

  const extractMetadata = (file: File) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = calculateAspectRatio(img.width, img.height);
      
      const metadata: ImageMetadata = {
        filename: file.name,
        fileSize: file.size,
        fileType: file.type,
        dimensions: {
          width: img.width,
          height: img.height
        },
        aspectRatio,
        created: new Date(file.lastModified).toLocaleString(),
        modified: new Date(file.lastModified).toLocaleString(),
        hasTransparency: checkTransparency(img),
        compression: getCompressionInfo(file.type),
      };

      setMetadata(metadata);
      
      toast({
        title: "Metadata extracted!",
        description: "Image metadata has been successfully analyzed"
      });
    };

    img.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load image for metadata extraction",
        variant: "destructive"
      });
    };

    img.src = URL.createObjectURL(file);
  };

  const calculateAspectRatio = (width: number, height: number): string => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(width, height);
    const ratioWidth = width / divisor;
    const ratioHeight = height / divisor;
    
    // Common aspect ratios
    const commonRatios: { [key: string]: string } = {
      '1:1': 'Square',
      '4:3': 'Standard',
      '3:2': 'Classic',
      '16:9': 'Widescreen',
      '16:10': 'Wide',
      '5:4': 'Large format',
      '3:4': 'Portrait',
      '2:3': 'Portrait classic',
      '9:16': 'Portrait wide'
    };

    const ratioString = `${ratioWidth}:${ratioHeight}`;
    return commonRatios[ratioString] ? `${ratioString} (${commonRatios[ratioString]})` : ratioString;
  };

  const checkTransparency = (img: HTMLImageElement): boolean => {
    if (!selectedImage) return false;
    return selectedImage.type === 'image/png' || selectedImage.type === 'image/gif';
  };

  const getCompressionInfo = (mimeType: string): string => {
    switch (mimeType) {
      case 'image/jpeg':
        return 'JPEG (Lossy)';
      case 'image/png':
        return 'PNG (Lossless)';
      case 'image/webp':
        return 'WebP (Hybrid)';
      case 'image/gif':
        return 'GIF (Lossless)';
      case 'image/bmp':
        return 'BMP (Uncompressed)';
      case 'image/tiff':
        return 'TIFF (Lossless)';
      default:
        return 'Unknown';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getImageCategory = (width: number, height: number): string => {
    const totalPixels = width * height;
    if (totalPixels >= 8000000) return 'Ultra High Resolution';
    if (totalPixels >= 2000000) return 'High Resolution';
    if (totalPixels >= 500000) return 'Medium Resolution';
    return 'Low Resolution';
  };

  const copyMetadata = () => {
    if (!metadata) return;
    
    const metadataText = `
Image Metadata:
Filename: ${metadata.filename}
File Size: ${formatFileSize(metadata.fileSize)}
File Type: ${metadata.fileType}
Dimensions: ${metadata.dimensions.width} × ${metadata.dimensions.height}
Aspect Ratio: ${metadata.aspectRatio}
Created: ${metadata.created}
Modified: ${metadata.modified}
Compression: ${metadata.compression}
Has Transparency: ${metadata.hasTransparency ? 'Yes' : 'No'}
    `.trim();

    navigator.clipboard.writeText(metadataText);
    toast({
      title: "Copied!",
      description: "Metadata has been copied to clipboard"
    });
  };

  const clear = () => {
    setSelectedImage(null);
    setMetadata(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Image Metadata Viewer</h1>
        <p className="text-muted-foreground">
          View and extract metadata information from image files
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image file to view its metadata
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
              Support for JPG, PNG, WebP, GIF, BMP, and other image formats
            </p>
          </div>
        </CardContent>
      </Card>

      {imagePreview && metadata && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Image Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-auto rounded-lg border"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Metadata Information
              </CardTitle>
              <CardDescription>
                Detailed information about your image file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Filename:</span>
                  <span className="text-sm bg-muted px-2 py-1 rounded">{metadata.filename}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">File Size:</span>
                  <Badge variant="secondary">{formatFileSize(metadata.fileSize)}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">File Type:</span>
                  <Badge variant="outline">{metadata.fileType}</Badge>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Dimensions:</span>
                  <span className="font-mono">{metadata.dimensions.width} × {metadata.dimensions.height}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Aspect Ratio:</span>
                  <span className="text-sm">{metadata.aspectRatio}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Resolution:</span>
                  <Badge variant="secondary">
                    {getImageCategory(metadata.dimensions.width, metadata.dimensions.height)}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Pixels:</span>
                  <span className="font-mono">
                    {(metadata.dimensions.width * metadata.dimensions.height).toLocaleString()}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Compression:</span>
                  <span className="text-sm">{metadata.compression}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Transparency:</span>
                  <Badge variant={metadata.hasTransparency ? "default" : "secondary"}>
                    {metadata.hasTransparency ? 'Yes' : 'No'}
                  </Badge>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Created:</span>
                  <span className="text-sm">{metadata.created}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Modified:</span>
                  <span className="text-sm">{metadata.modified}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button onClick={copyMetadata} variant="outline" className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Metadata
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
    </div>
  );
};

export default ImageMetadataViewer;