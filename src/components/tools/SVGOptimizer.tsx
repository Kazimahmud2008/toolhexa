import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Upload, Download, Package, Trash2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SVGOptimizer = () => {
  const [originalSVG, setOriginalSVG] = useState('');
  const [optimizedSVG, setOptimizedSVG] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [optimizedSize, setOptimizedSize] = useState(0);
  const [options, setOptions] = useState({
    removeComments: true,
    removeMetadata: true,
    removeUnusedDefs: true,
    removeEmptyGroups: true,
    minifyStyles: true,
    removeDefaultAttrs: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setOriginalSVG(content);
        setOriginalSize(content.length);
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid SVG file",
        variant: "destructive"
      });
    }
  };

  const optimizeSVG = () => {
    if (!originalSVG.trim()) {
      toast({
        title: "No content",
        description: "Please provide SVG content to optimize",
        variant: "destructive"
      });
      return;
    }

    try {
      let optimized = originalSVG;

      // Remove XML comments
      if (options.removeComments) {
        optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');
      }

      // Remove metadata elements
      if (options.removeMetadata) {
        optimized = optimized.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
        optimized = optimized.replace(/<title[\s\S]*?<\/title>/gi, '');
        optimized = optimized.replace(/<desc[\s\S]*?<\/desc>/gi, '');
      }

      // Remove empty groups
      if (options.removeEmptyGroups) {
        optimized = optimized.replace(/<g\s*><\/g>/gi, '');
        optimized = optimized.replace(/<g\s+[^>]*><\/g>/gi, '');
      }

      // Remove unused defs
      if (options.removeUnusedDefs) {
        optimized = optimized.replace(/<defs\s*><\/defs>/gi, '');
      }

      // Remove default attributes
      if (options.removeDefaultAttrs) {
        optimized = optimized.replace(/\s+fill="black"/gi, '');
        optimized = optimized.replace(/\s+stroke="none"/gi, '');
        optimized = optimized.replace(/\s+stroke-width="1"/gi, '');
      }

      // Minify styles
      if (options.minifyStyles) {
        optimized = optimized.replace(/\s+/g, ' ');
        optimized = optimized.replace(/>\s+</g, '><');
      }

      // Clean up extra whitespace
      optimized = optimized.trim();

      setOptimizedSVG(optimized);
      setOptimizedSize(optimized.length);

      const savings = ((originalSize - optimized.length) / originalSize * 100).toFixed(1);
      toast({
        title: "Optimized!",
        description: `SVG optimized successfully. ${savings}% size reduction.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to optimize SVG. Please check your input.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "SVG code copied to clipboard"
    });
  };

  const downloadSVG = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `${filename} has been downloaded`
    });
  };

  const clear = () => {
    setOriginalSVG('');
    setOptimizedSVG('');
    setOriginalSize(0);
    setOptimizedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const sizeReduction = originalSize > 0 ? ((originalSize - optimizedSize) / originalSize * 100).toFixed(1) : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">SVG Optimizer</h1>
        <p className="text-muted-foreground">
          Optimize SVG files by removing unnecessary code and reducing file size
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Upload SVG or Paste Code
          </CardTitle>
          <CardDescription>
            Upload an SVG file or paste SVG code directly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/svg+xml,.svg"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="mb-4"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload SVG File
            </Button>
            <p className="text-sm text-muted-foreground">
              Or paste your SVG code in the text area below
            </p>
          </div>

          <div>
            <Label htmlFor="original">Original SVG Code</Label>
            <Textarea
              id="original"
              value={originalSVG}
              onChange={(e) => {
                setOriginalSVG(e.target.value);
                setOriginalSize(e.target.value.length);
              }}
              placeholder="Paste your SVG code here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Optimization Options</CardTitle>
          <CardDescription>
            Configure what optimizations to apply
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(options).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => setOptions({ ...options, [key]: checked })}
                />
                <Label className="text-sm">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button onClick={optimizeSVG} disabled={!originalSVG.trim()} className="w-full">
              <Package className="h-4 w-4 mr-2" />
              Optimize SVG
            </Button>
          </div>
        </CardContent>
      </Card>

      {optimizedSVG && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-primary">{formatFileSize(originalSize)}</div>
                <div className="text-sm text-muted-foreground">Original Size</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-primary">{formatFileSize(optimizedSize)}</div>
                <div className="text-sm text-muted-foreground">Optimized Size</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-green-600">{sizeReduction}%</div>
                <div className="text-sm text-muted-foreground">Size Reduction</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Optimized SVG</CardTitle>
              <CardDescription>
                Your optimized SVG code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={optimizedSVG}
                readOnly
                className="min-h-[200px] font-mono text-sm bg-muted"
              />
              <div className="flex gap-2">
                <Button onClick={() => copyToClipboard(optimizedSVG)} variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
                <Button onClick={() => downloadSVG(optimizedSVG, 'optimized.svg')} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
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
                <CardTitle>Original Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4 bg-muted rounded-lg">
                  <div 
                    dangerouslySetInnerHTML={{ __html: originalSVG }}
                    className="max-w-full max-h-64"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimized Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-4 bg-muted rounded-lg">
                  <div 
                    dangerouslySetInnerHTML={{ __html: optimizedSVG }}
                    className="max-w-full max-h-64"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default SVGOptimizer;