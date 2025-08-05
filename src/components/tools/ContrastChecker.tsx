import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

const ContrastChecker = () => {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [contrast, setContrast] = useState(21);

  const getLuminance = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const getContrastRatio = (fg: string, bg: string) => {
    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const lightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (lightest + 0.05) / (darkest + 0.05);
  };

  useEffect(() => {
    setContrast(getContrastRatio(foreground, background));
  }, [foreground, background]);

  const getComplianceLevel = (ratio: number) => {
    if (ratio >= 7) return { level: 'AAA', color: 'green' };
    if (ratio >= 4.5) return { level: 'AA', color: 'blue' };
    if (ratio >= 3) return { level: 'AA Large', color: 'yellow' };
    return { level: 'Fail', color: 'red' };
  };

  const compliance = getComplianceLevel(contrast);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Color Contrast Checker</h1>
        <p className="text-muted-foreground">
          Check color contrast ratios for accessibility compliance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Color Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Foreground Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {contrast.toFixed(2)}:1
                </div>
                <div className="text-sm text-muted-foreground">
                  Contrast Ratio
                </div>
              </div>

              <div className="flex justify-center">
                <Badge 
                  variant={compliance.color === 'green' || compliance.color === 'blue' ? 'default' : 'destructive'}
                  className="text-lg px-4 py-2"
                >
                  {compliance.color === 'red' ? (
                    <XCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  {compliance.level}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-8 rounded-lg border"
              style={{ 
                backgroundColor: background,
                color: foreground
              }}
            >
              <h2 className="text-2xl font-bold mb-4">Sample Heading</h2>
              <p className="text-lg mb-4">
                This is a sample paragraph to test the contrast ratio between 
                the selected foreground and background colors.
              </p>
              <p className="text-sm">
                Small text is also important for accessibility testing. 
                Make sure all text sizes meet the required contrast standards.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WCAG Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="font-semibold text-green-600">AAA (7:1)</div>
              <div className="text-sm text-muted-foreground">
                Enhanced level - provides the highest level of accessibility
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-blue-600">AA (4.5:1)</div>
              <div className="text-sm text-muted-foreground">
                Standard level - minimum for most text content
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-yellow-600">AA Large (3:1)</div>
              <div className="text-sm text-muted-foreground">
                For large text (18pt+ or 14pt+ bold)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContrastChecker;