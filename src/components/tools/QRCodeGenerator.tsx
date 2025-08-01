import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Download, Copy } from 'lucide-react';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState('200');
  const [qrUrl, setQrUrl] = useState('');
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = () => {
    if (!text) return;
    
    // Using QR Server API for demonstration
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    setQrUrl(qrApiUrl);
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = 'qrcode.png';
    link.click();
    
    toast({
      title: 'Downloaded!',
      description: 'QR code saved to downloads',
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(qrUrl);
    toast({
      title: 'Copied!',
      description: 'QR code URL copied to clipboard',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter text, URL, or data to encode..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-32"
            />
            <div className="flex gap-4">
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150x150</SelectItem>
                  <SelectItem value="200">200x200</SelectItem>
                  <SelectItem value="300">300x300</SelectItem>
                  <SelectItem value="400">400x400</SelectItem>
                  <SelectItem value="500">500x500</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={generateQR} disabled={!text}>
                Generate QR Code
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {qrUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated QR Code
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUrl}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={downloadQR}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <img
                src={qrUrl}
                alt="Generated QR Code"
                className="border rounded-lg shadow-md"
                style={{ width: `${size}px`, height: `${size}px` }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRCodeGenerator;