import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';

const UUIDGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const { toast } = useToast();

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateUUIDs = () => {
    const newUUIDs = [];
    for (let i = 0; i < Math.min(count, 100); i++) {
      newUUIDs.push(generateUUID());
    }
    setUuids(newUUIDs);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'UUID copied to clipboard',
    });
  };

  const copyAllUUIDs = () => {
    const allUUIDs = uuids.join('\n');
    navigator.clipboard.writeText(allUUIDs);
    toast({
      title: 'Copied!',
      description: 'All UUIDs copied to clipboard',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate UUIDs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Number of UUIDs (max 100)
              </label>
              <Input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              />
            </div>
            <Button onClick={generateUUIDs} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {uuids.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated UUIDs ({uuids.length})
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAllUUIDs}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <code className="font-mono text-sm">{uuid}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(uuid)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UUIDGenerator;