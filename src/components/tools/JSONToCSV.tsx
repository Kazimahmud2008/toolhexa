import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Copy, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JSONToCSV = () => {
  const [jsonInput, setJsonInput] = useState(`[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York"
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com", 
    "age": 25,
    "city": "Los Angeles"
  },
  {
    "name": "Bob Johnson",
    "email": "bob@example.com",
    "age": 35,
    "city": "Chicago"
  }
]`);
  
  const [csvOutput, setCsvOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();

  const convertJSONToCSV = () => {
    try {
      const jsonData = JSON.parse(jsonInput);
      setError('');
      setIsValid(true);

      if (!Array.isArray(jsonData)) {
        throw new Error('JSON must be an array of objects');
      }

      if (jsonData.length === 0) {
        setCsvOutput('');
        return;
      }

      // Get all unique keys from all objects
      const allKeys = Array.from(
        new Set(
          jsonData.flatMap(obj => 
            typeof obj === 'object' && obj !== null ? Object.keys(obj) : []
          )
        )
      );

      if (allKeys.length === 0) {
        throw new Error('No valid object properties found');
      }

      let csv = '';

      // Add headers if enabled
      if (includeHeaders) {
        csv += allKeys.map(key => `"${key}"`).join(delimiter) + '\n';
      }

      // Add data rows
      jsonData.forEach(obj => {
        if (typeof obj !== 'object' || obj === null) {
          // Skip non-object items
          return;
        }

        const row = allKeys.map(key => {
          const value = obj[key];
          if (value === null || value === undefined) {
            return '""';
          }
          // Convert value to string and escape quotes
          const stringValue = String(value).replace(/"/g, '""');
          return `"${stringValue}"`;
        });
        csv += row.join(delimiter) + '\n';
      });

      setCsvOutput(csv.trim());
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
      setCsvOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csvOutput);
    toast({
      title: "Copied!",
      description: "CSV has been copied to clipboard",
    });
  };

  const downloadCSV = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded!",
      description: "CSV file has been downloaded",
    });
  };

  const clearAll = () => {
    setJsonInput('');
    setCsvOutput('');
    setError('');
  };

  const loadSample = () => {
    setJsonInput(`[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@email.com",
    "department": "Engineering",
    "salary": 75000,
    "isActive": true,
    "joinDate": "2023-01-15"
  },
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@email.com",
    "department": "Marketing",
    "salary": 65000,
    "isActive": true,
    "joinDate": "2023-03-22"
  },
  {
    "id": 3,
    "firstName": "Bob",
    "lastName": "Johnson",
    "email": "bob.johnson@email.com",
    "department": "Sales",
    "salary": 70000,
    "isActive": false,
    "joinDate": "2022-11-10"
  }
]`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">JSON to CSV Converter</h1>
        <p className="text-muted-foreground">
          Convert JSON arrays to CSV format for spreadsheet import
        </p>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Customize the CSV output format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="delimiter">Delimiter</Label>
              <Input
                id="delimiter"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                placeholder="Enter delimiter"
                className="w-20"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={includeHeaders}
                onCheckedChange={setIncludeHeaders}
              />
              <Label>Include Headers</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={loadSample} variant="outline" size="sm">
                Load Sample
              </Button>
              <Button onClick={clearAll} variant="outline" size="sm">
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JSON Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              JSON Input
            </CardTitle>
            <CardDescription>
              Enter your JSON array data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Enter JSON array..."
              className={`min-h-[400px] font-mono text-sm ${!isValid ? 'border-red-500' : ''}`}
            />
            {error && (
              <div className="text-red-500 text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <Button onClick={convertJSONToCSV} className="w-full">
              Convert to CSV
            </Button>
          </CardContent>
        </Card>

        {/* CSV Output */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              CSV Output
              {csvOutput && (
                <Badge variant="secondary">
                  {csvOutput.split('\n').length} rows
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Generated CSV data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={csvOutput}
              readOnly
              placeholder="CSV output will appear here..."
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button 
                onClick={copyToClipboard} 
                disabled={!csvOutput} 
                variant="outline"
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy CSV
              </Button>
              <Button 
                onClick={downloadCSV} 
                disabled={!csvOutput}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Table */}
      {csvOutput && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Preview of the first few rows in table format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <tbody>
                  {csvOutput.split('\n').slice(0, 10).map((row, index) => {
                    const cells = row.split(delimiter).map(cell => cell.replace(/^"|"$/g, ''));
                    return (
                      <tr key={index} className={index === 0 && includeHeaders ? 'bg-muted' : ''}>
                        {cells.map((cell, cellIndex) => (
                          <td 
                            key={cellIndex} 
                            className={`border border-border px-2 py-1 text-sm ${
                              index === 0 && includeHeaders ? 'font-medium' : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {csvOutput.split('\n').length > 10 && (
                <p className="text-sm text-muted-foreground mt-2">
                  ... and {csvOutput.split('\n').length - 10} more rows
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JSONToCSV;