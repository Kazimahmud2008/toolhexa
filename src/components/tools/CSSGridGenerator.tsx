import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Grid, Download } from 'lucide-react';

const CSSGridGenerator = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState(10);
  const [rowHeight, setRowHeight] = useState('1fr');
  const [columnWidth, setColumnWidth] = useState('1fr');
  const { toast } = useToast();

  const generateCSS = () => {
    const gridTemplateRows = Array(rows).fill(rowHeight).join(' ');
    const gridTemplateColumns = Array(columns).fill(columnWidth).join(' ');
    
    return `.grid-container {
  display: grid;
  grid-template-rows: ${gridTemplateRows};
  grid-template-columns: ${gridTemplateColumns};
  gap: ${gap}px;
}

.grid-item {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
}`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: 'Copied!',
      description: 'CSS code copied to clipboard',
    });
  };

  const generateGridItems = () => {
    return Array.from({ length: rows * columns }, (_, i) => (
      <div key={i} className="bg-muted border border-border rounded p-4 text-center text-sm">
        Item {i + 1}
      </div>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Grid Generator</h1>
        <p className="text-muted-foreground">
          Create CSS grid layouts with visual controls and live preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid className="h-5 w-5" />
              Grid Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rows">Rows</Label>
                <Input
                  id="rows"
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="columns">Columns</Label>
                <Input
                  id="columns"
                  type="number"
                  value={columns}
                  onChange={(e) => setColumns(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gap">Gap (px)</Label>
              <Input
                id="gap"
                type="number"
                value={gap}
                onChange={(e) => setGap(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rowHeight">Row Height</Label>
              <Input
                id="rowHeight"
                value={rowHeight}
                onChange={(e) => setRowHeight(e.target.value)}
                placeholder="e.g., 1fr, 100px, auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="columnWidth">Column Width</Label>
              <Input
                id="columnWidth"
                value={columnWidth}
                onChange={(e) => setColumnWidth(e.target.value)}
                placeholder="e.g., 1fr, 200px, auto"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated CSS</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generateCSS()}
              readOnly
              className="min-h-64 bg-muted font-mono text-sm"
            />
            <Button onClick={copyCSS} className="mt-4 w-full">
              <Copy className="h-4 w-4 mr-2" />
              Copy CSS
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border border-border rounded p-4"
            style={{
              display: 'grid',
              gridTemplateRows: Array(rows).fill(rowHeight).join(' '),
              gridTemplateColumns: Array(columns).fill(columnWidth).join(' '),
              gap: `${gap}px`,
            }}
          >
            {generateGridItems()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSGridGenerator;