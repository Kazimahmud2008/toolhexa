import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, Image as ImageIcon, Trash2, Filter, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ImageFilter = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [filteredImage, setFilteredImage] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brightness: [100],
    contrast: [100],
    saturation: [100],
    blur: [0],
    hueRotate: [0],
    grayscale: [0],
    sepia: [0],
    invert: [0]
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const filterConfigs = [
    { key: 'brightness', label: 'Brightness', min: 0, max: 200, step: 1, unit: '%' },
    { key: 'contrast', label: 'Contrast', min: 0, max: 200, step: 1, unit: '%' },
    { key: 'saturation', label: 'Saturation', min: 0, max: 200, step: 1, unit: '%' },
    { key: 'blur', label: 'Blur', min: 0, max: 10, step: 0.1, unit: 'px' },
    { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, step: 1, unit: '°' },
    { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, step: 1, unit: '%' },
    { key: 'sepia', label: 'Sepia', min: 0, max: 100, step: 1, unit: '%' },
    { key: 'invert', label: 'Invert', min: 0, max: 100, step: 1, unit: '%' }
  ];

  const presets = [
    { name: 'None', filters: { brightness: [100], contrast: [100], saturation: [100], blur: [0], hueRotate: [0], grayscale: [0], sepia: [0], invert: [0] } },
    { name: 'Vintage', filters: { brightness: [110], contrast: [120], saturation: [80], blur: [0], hueRotate: [15], grayscale: [0], sepia: [30], invert: [0] } },
    { name: 'Black & White', filters: { brightness: [100], contrast: [110], saturation: [100], blur: [0], hueRotate: [0], grayscale: [100], sepia: [0], invert: [0] } },
    { name: 'High Contrast', filters: { brightness: [100], contrast: [150], saturation: [120], blur: [0], hueRotate: [0], grayscale: [0], sepia: [0], invert: [0] } },
    { name: 'Soft Focus', filters: { brightness: [110], contrast: [90], saturation: [90], blur: [1], hueRotate: [0], grayscale: [0], sepia: [0], invert: [0] } },
    { name: 'Cool Tone', filters: { brightness: [100], contrast: [100], saturation: [110], blur: [0], hueRotate: [200], grayscale: [0], sepia: [0], invert: [0] } },
    { name: 'Warm Tone', filters: { brightness: [110], contrast: [100], saturation: [110], blur: [0], hueRotate: [30], grayscale: [0], sepia: [20], invert: [0] } }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      setFilteredImage(null);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file",
        variant: "destructive"
      });
    }
  };

  const applyFilters = () => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        // Build CSS filter string
        const filterString = [
          `brightness(${filters.brightness[0]}%)`,
          `contrast(${filters.contrast[0]}%)`,
          `saturate(${filters.saturation[0]}%)`,
          `blur(${filters.blur[0]}px)`,
          `hue-rotate(${filters.hueRotate[0]}deg)`,
          `grayscale(${filters.grayscale[0]}%)`,
          `sepia(${filters.sepia[0]}%)`,
          `invert(${filters.invert[0]}%)`
        ].join(' ');

        ctx.filter = filterString;
        ctx.drawImage(img, 0, 0);
        
        const filteredDataUrl = canvas.toDataURL('image/png');
        setFilteredImage(filteredDataUrl);
      }
    };

    img.src = URL.createObjectURL(originalImage);
  };

  useEffect(() => {
    if (originalImage) {
      applyFilters();
    }
  }, [filters, originalImage]);

  const handleFilterChange = (filterKey: string, value: number[]) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setFilters(preset.filters);
  };

  const resetFilters = () => {
    setFilters({
      brightness: [100],
      contrast: [100],
      saturation: [100],
      blur: [0],
      hueRotate: [0],
      grayscale: [0],
      sepia: [0],
      invert: [0]
    });
  };

  const downloadFiltered = () => {
    if (filteredImage) {
      const link = document.createElement('a');
      link.download = `filtered_${originalImage?.name || 'image.png'}`;
      link.href = filteredImage;
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Filtered image has been downloaded"
      });
    }
  };

  const clear = () => {
    setOriginalImage(null);
    setFilteredImage(null);
    resetFilters();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Image Filter</h1>
        <p className="text-muted-foreground">
          Apply various filters and effects to your images
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image file to apply filters
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
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Controls
              </CardTitle>
              <CardDescription>
                Adjust the sliders to apply different effects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterConfigs.map((config) => (
                  <div key={config.key} className="space-y-2">
                    <div className="flex justify-between">
                      <Label>{config.label}</Label>
                      <span className="text-sm text-muted-foreground">
                        {filters[config.key as keyof typeof filters][0]}{config.unit}
                      </span>
                    </div>
                    <Slider
                      value={filters[config.key as keyof typeof filters]}
                      onValueChange={(value) => handleFilterChange(config.key, value)}
                      max={config.max}
                      min={config.min}
                      step={config.step}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2 justify-center">
                <Button onClick={resetFilters} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                {filteredImage && (
                  <Button onClick={downloadFiltered}>
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
                <CardTitle>Filtered</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredImage ? (
                  <img
                    src={filteredImage}
                    alt="Filtered"
                    className="w-full h-auto rounded-lg border"
                  />
                ) : (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Processing...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Hidden canvas for processing */}
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}
    </div>
  );
};

export default ImageFilter;