import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, Image as ImageIcon, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageFormatConverter = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>('png');
  const [originalFormat, setOriginalFormat] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const supportedFormats = [
    { value: 'png', label: 'PNG', mimeType: 'image/png' },
    { value: 'jpeg', label: 'JPEG', mimeType: 'image/jpeg' },
    { value: 'webp', label: 'WebP', mimeType: 'image/webp' },
    { value: 'bmp', label: 'BMP', mimeType: 'image/bmp' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      setOriginalFormat(file.type.split('/')[1].toUpperCase());
      setConvertedImage(null);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file",
        variant: "destructive"
      });
    }
  };

  const convertImage = () => {
    if (!originalImage) return;

    const selectedFormat = supportedFormats.find(f => f.value === targetFormat);
    if (!selectedFormat) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        // Set background to white for JPEG format to avoid transparency issues
        if (targetFormat === 'jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.drawImage(img, 0, 0);
        const convertedDataUrl = canvas.toDataURL(selectedFormat.mimeType);
        setConvertedImage(convertedDataUrl);
        
        toast({
          title: "Success!",
          description: `Image converted to ${selectedFormat.label} successfully`
        });
      }
    };

    img.src = URL.createObjectURL(originalImage);
  };

  const downloadConverted = () => {
    if (convertedImage && originalImage) {
      const selectedFormat = supportedFormats.find(f => f.value === targetFormat);
      const originalName = originalImage.name.split('.')[0];
      
      const link = document.createElement('a');
      link.download = `${originalName}.${targetFormat}`;
      link.href = convertedImage;
      link.click();
      
      toast({
        title: "Downloaded!",
        description: `Converted image has been downloaded as ${selectedFormat?.label}`
      });
    }
  };

  const clear = () => {
    setOriginalImage(null);
    setConvertedImage(null);
    setOriginalFormat('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileSize = (dataUrl: string) => {
    const byteString = atob(dataUrl.split(',')[1]);
    const bytes = byteString.length;
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Image Format Converter</h1>
        <p className="text-muted-foreground">
          Convert images between different formats: JPG, PNG, WebP, and more
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image file to convert
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
              Support for JPG, PNG, WebP, BMP, and other image formats
            </p>
          </div>

          {originalImage && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-lg font-semibold text-primary">Original Format</div>
                    <div className="text-2xl font-bold">{originalFormat}</div>
                    <div className="text-sm text-muted-foreground">
                      Size: {(originalImage.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="format">Convert to:</Label>
                    <Select value={targetFormat} onValueChange={setTargetFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedFormats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {convertedImage && (
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <div className="text-lg font-semibold text-primary">Converted Format</div>
                      <div className="text-2xl font-bold">{targetFormat.toUpperCase()}</div>
                      <div className="text-sm text-muted-foreground">
                        Size: {getFileSize(convertedImage)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button onClick={convertImage}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Convert Image
                </Button>
                {convertedImage && (
                  <Button onClick={downloadConverted} variant="outline">
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
          )}
        </CardContent>
      </Card>

      {convertedImage && originalImage && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Original ({originalFormat})</CardTitle>
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
              <CardTitle>Converted ({targetFormat.toUpperCase()})</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={convertedImage}
                alt="Converted"
                className="w-full h-auto rounded-lg border"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ImageFormatConverter;