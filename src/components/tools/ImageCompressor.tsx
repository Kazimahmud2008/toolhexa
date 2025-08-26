import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet'; // ✅ For SEO meta tags and canonical

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      setOriginalSize(file.size);
      compressImage(file, quality[0]);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file",
        variant: "destructive",
      });
    }
  };

  const compressImage = (file: File, qualityValue: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', qualityValue / 100);
        setCompressedImage(compressedDataUrl);

        // Calculate compressed size
        const byteString = atob(compressedDataUrl.split(',')[1]);
        setCompressedSize(byteString.length);
      }
    };

    img.src = URL.createObjectURL(file);
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value);
    if (originalImage) {
      compressImage(originalImage, value[0]);
    }
  };

  const downloadCompressed = () => {
    if (compressedImage) {
      const link = document.createElement('a');
      link.download = `compressed_${originalImage?.name || 'image.jpg'}`;
      link.href = compressedImage;
      link.click();

      toast({
        title: "Downloaded!",
        description: "Compressed image has been downloaded",
      });
    }
  };

  const clear = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setQuality([80]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionRatio =
    originalSize > 0
      ? ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
      : 0;

  return (
    <>
      {/* ✅ SEO FIX: Canonical, Title, Meta Description, OG tags */}
      <Helmet>
        <title>Free Online Image Compressor | ToolHexa</title>
        <meta
          name="description"
          content="Compress images online for free with ToolHexa. Reduce image size while keeping quality. Works with JPG, PNG, and WebP."
        />
        <link
          rel="canonical"
          href="https://www.toolhexa.com/tools/image-compressor"
        />
        <meta property="og:title" content="Free Online Image Compressor | ToolHexa" />
        <meta
          property="og:description"
          content="Easily compress your images online with ToolHexa. Fast, free, and high-quality image compression."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.toolhexa.com/tools/image-compressor"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Image Compressor</h1>
          <p className="text-muted-foreground">
            Compress images to reduce file size while maintaining quality.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Select an image file to compress
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Quality: {quality[0]}%</Label>
                  <Slider
                    value={quality}
                    onValueChange={handleQualityChange}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {formatFileSize(originalSize)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Original Size
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {formatFileSize(compressedSize)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Compressed Size
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {compressionRatio}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Size Reduction
                    </div>
                  </div>
                </div>

                {compressedImage && (
                  <div className="flex gap-2 justify-center">
                    <Button onClick={downloadCompressed}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Compressed
                    </Button>
                    <Button onClick={clear} variant="outline">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {compressedImage && originalImage && (
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
                <CardTitle>Compressed</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="w-full h-auto rounded-lg border"
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* ✅ Outgoing & Internal Link for SEO */}
        <div className="text-center mt-8">
          <p className="text-sm">
            Want more free tools? Try our{" "}
            <a
              href="/tools/pdf-compressor"
              className="text-blue-600 underline"
            >
              PDF Compressor
            </a>{" "}
            or{" "}
            <a href="/tools/image-resizer" className="text-blue-600 underline">
              Image Resizer
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageCompressor;
