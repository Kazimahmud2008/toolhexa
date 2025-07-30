import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Upload, RefreshCw, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const JSONFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJSON = () => {
    try {
      if (!input.trim()) {
        setError('Please enter some JSON to format');
        setOutput('');
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError('');
      toast({
        title: "Success",
        description: "JSON formatted successfully!"
      });
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      if (!input.trim()) {
        setError('Please enter some JSON to minify');
        setOutput('');
        return;
      }

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      toast({
        title: "Success",
        description: "JSON minified successfully!"
      });
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
    }
  };

  const validateJSON = () => {
    try {
      if (!input.trim()) {
        setError('Please enter some JSON to validate');
        return;
      }

      JSON.parse(input);
      setError('');
      toast({
        title: "Valid JSON",
        description: "Your JSON is valid!",
        variant: "default"
      });
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadJSON = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "JSON file downloaded successfully"
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInput(content);
    };
    reader.readAsText(file);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">JSON Formatter & Validator</h1>
        <p className="text-xl text-muted-foreground">
          Format, validate, and minify JSON data with syntax highlighting
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant="secondary">JSON Parser</Badge>
          <Badge variant="secondary">Syntax Validation</Badge>
          <Badge variant="secondary">Pretty Print</Badge>
          <Badge variant="secondary">Minify</Badge>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5" />
            <span>Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label htmlFor="indent" className="text-sm font-medium">
                Indent Size:
              </label>
              <select
                id="indent"
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-3 py-1 border border-border rounded-md text-sm"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </span>
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".json,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <Button onClick={clearAll} variant="outline" size="sm">
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>Input JSON</CardTitle>
            <CardDescription>
              Paste or type your JSON data here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-96 p-4 font-mono text-sm border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={formatJSON} className="flex-1">
                Format
              </Button>
              <Button onClick={minifyJSON} variant="outline" className="flex-1">
                Minify
              </Button>
              <Button onClick={validateJSON} variant="secondary" className="flex-1">
                Validate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Formatted JSON</span>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  disabled={!output}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={downloadJSON}
                  variant="outline"
                  size="sm"
                  disabled={!output}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Formatted and validated JSON output
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive font-medium">Error:</p>
                <p className="text-destructive text-sm mt-1">{error}</p>
              </div>
            ) : (
              <textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="w-full h-96 p-4 font-mono text-sm border border-border rounded-lg resize-none bg-muted/30"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">JSON Validation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Pretty Formatting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">JSON Minification</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Error Detection</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JSONFormatter;