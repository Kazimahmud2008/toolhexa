import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Merge, Copy, RotateCcw, ArrowLeftRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TextDiffChecker = () => {
  const [text1, setText1] = useState(`Hello, this is the original text.
It contains multiple lines.
Some of these lines will be changed.
This line will remain the same.
Another line that might be different.`);
  
  const [text2, setText2] = useState(`Hello, this is the modified text.
It contains multiple lines.
Some of these lines have been changed.
This line will remain the same.
Another line that has been modified.
This is a new line added.`);
  
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const { toast } = useToast();

  const preprocessText = (text: string) => {
    let processed = text;
    if (ignoreCase) {
      processed = processed.toLowerCase();
    }
    if (ignoreWhitespace) {
      processed = processed.replace(/\s+/g, ' ').trim();
    }
    return processed;
  };

  const diff = useMemo(() => {
    const lines1 = preprocessText(text1).split('\n');
    const lines2 = preprocessText(text2).split('\n');
    const originalLines1 = text1.split('\n');
    const originalLines2 = text2.split('\n');
    
    const maxLength = Math.max(lines1.length, lines2.length);
    const result = [];
    
    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      const originalLine1 = originalLines1[i] || '';
      const originalLine2 = originalLines2[i] || '';
      
      if (line1 === line2) {
        result.push({
          type: 'unchanged',
          line1: originalLine1,
          line2: originalLine2,
          lineNumber: i + 1
        });
      } else if (!line1 && line2) {
        result.push({
          type: 'added',
          line1: '',
          line2: originalLine2,
          lineNumber: i + 1
        });
      } else if (line1 && !line2) {
        result.push({
          type: 'removed',
          line1: originalLine1,
          line2: '',
          lineNumber: i + 1
        });
      } else {
        result.push({
          type: 'modified',
          line1: originalLine1,
          line2: originalLine2,
          lineNumber: i + 1
        });
      }
    }
    
    return result;
  }, [text1, text2, ignoreWhitespace, ignoreCase]);

  const getDiffStats = () => {
    const added = diff.filter(d => d.type === 'added').length;
    const removed = diff.filter(d => d.type === 'removed').length;
    const modified = diff.filter(d => d.type === 'modified').length;
    const unchanged = diff.filter(d => d.type === 'unchanged').length;
    
    return { added, removed, modified, unchanged, total: diff.length };
  };

  const getCharacterDiff = (line1: string, line2: string) => {
    const result = [];
    const maxLength = Math.max(line1.length, line2.length);
    
    for (let i = 0; i < maxLength; i++) {
      const char1 = line1[i] || '';
      const char2 = line2[i] || '';
      
      if (char1 === char2) {
        result.push({ type: 'same', char: char1 });
      } else if (!char1) {
        result.push({ type: 'added', char: char2 });
      } else if (!char2) {
        result.push({ type: 'removed', char: char1 });
      } else {
        result.push({ type: 'changed', char1, char2 });
      }
    }
    
    return result;
  };

  const stats = getDiffStats();

  const copyDiff = () => {
    const diffText = diff.map(d => {
      switch (d.type) {
        case 'added':
          return `+ ${d.line2}`;
        case 'removed':
          return `- ${d.line1}`;
        case 'modified':
          return `- ${d.line1}\n+ ${d.line2}`;
        default:
          return `  ${d.line1}`;
      }
    }).join('\n');
    
    navigator.clipboard.writeText(diffText);
    toast({
      title: "Copied!",
      description: "Diff has been copied to clipboard",
    });
  };

  const swapTexts = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const clearTexts = () => {
    setText1('');
    setText2('');
  };

  const loadSample = () => {
    setText1(`The quick brown fox jumps over the lazy dog.
This is a sample text for comparison.
Line three contains some content.
This line will be modified.
Final line of the original text.`);
    
    setText2(`The quick brown fox jumps over the lazy dog.
This is a sample text for comparison purposes.
Line three contains different content.
This line has been modified significantly.
Final line of the modified text.
An additional line has been added.`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Text Diff Checker</h1>
        <p className="text-muted-foreground">
          Compare two texts and highlight the differences between them
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Comparison Settings</CardTitle>
          <CardDescription>Configure how the texts should be compared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                checked={ignoreCase}
                onCheckedChange={setIgnoreCase}
              />
              <Label>Ignore Case</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={ignoreWhitespace}
                onCheckedChange={setIgnoreWhitespace}
              />
              <Label>Ignore Whitespace</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={showLineNumbers}
                onCheckedChange={setShowLineNumbers}
              />
              <Label>Show Line Numbers</Label>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={loadSample} variant="outline">
              Load Sample
            </Button>
            <Button onClick={swapTexts} variant="outline">
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Swap Texts
            </Button>
            <Button onClick={clearTexts} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <Button onClick={copyDiff} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy Diff
            </Button>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Added: {stats.added}
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Removed: {stats.removed}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Modified: {stats.modified}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              Unchanged: {stats.unchanged}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Text */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Merge className="h-5 w-5" />
              Original Text
            </CardTitle>
            <CardDescription>Enter the original text for comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter original text..."
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Modified Text */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Merge className="h-5 w-5" />
              Modified Text
            </CardTitle>
            <CardDescription>Enter the modified text for comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter modified text..."
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>

      {/* Diff Results */}
      <Card>
        <CardHeader>
          <CardTitle>Comparison Results</CardTitle>
          <CardDescription>
            Visual representation of differences between the texts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="side-by-side">
            <TabsList>
              <TabsTrigger value="side-by-side">Side by Side</TabsTrigger>
              <TabsTrigger value="unified">Unified View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="side-by-side" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm text-muted-foreground">Original</h4>
                  <div className="border rounded-lg p-4 bg-muted/30 font-mono text-sm max-h-[400px] overflow-y-auto">
                    {diff.map((d, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          d.type === 'removed' ? 'bg-red-100 text-red-800' :
                          d.type === 'modified' ? 'bg-yellow-100 text-yellow-800' :
                          d.type === 'added' ? 'bg-transparent text-gray-400' :
                          ''
                        } ${d.type === 'added' ? 'opacity-50' : ''}`}
                      >
                        {showLineNumbers && (
                          <span className="w-8 text-right mr-2 text-gray-400 flex-shrink-0">
                            {d.type !== 'added' ? d.lineNumber : ''}
                          </span>
                        )}
                        <span className="break-all">{d.line1 || '\u00A0'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-medium text-sm text-muted-foreground">Modified</h4>
                  <div className="border rounded-lg p-4 bg-muted/30 font-mono text-sm max-h-[400px] overflow-y-auto">
                    {diff.map((d, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          d.type === 'added' ? 'bg-green-100 text-green-800' :
                          d.type === 'modified' ? 'bg-yellow-100 text-yellow-800' :
                          d.type === 'removed' ? 'bg-transparent text-gray-400' :
                          ''
                        } ${d.type === 'removed' ? 'opacity-50' : ''}`}
                      >
                        {showLineNumbers && (
                          <span className="w-8 text-right mr-2 text-gray-400 flex-shrink-0">
                            {d.type !== 'removed' ? d.lineNumber : ''}
                          </span>
                        )}
                        <span className="break-all">{d.line2 || '\u00A0'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="unified" className="mt-4">
              <div className="border rounded-lg p-4 bg-muted/30 font-mono text-sm max-h-[400px] overflow-y-auto">
                {diff.map((d, index) => (
                  <div key={index}>
                    {d.type === 'removed' && (
                      <div className="flex bg-red-100 text-red-800">
                        {showLineNumbers && (
                          <span className="w-8 text-right mr-2 text-gray-400 flex-shrink-0">
                            -{d.lineNumber}
                          </span>
                        )}
                        <span className="break-all">- {d.line1}</span>
                      </div>
                    )}
                    {d.type === 'added' && (
                      <div className="flex bg-green-100 text-green-800">
                        {showLineNumbers && (
                          <span className="w-8 text-right mr-2 text-gray-400 flex-shrink-0">
                            +{d.lineNumber}
                          </span>
                        )}
                        <span className="break-all">+ {d.line2}</span>
                      </div>
                    )}
                    {d.type === 'modified' && (
                      <>
                        <div className="flex bg-red-100 text-red-800">
                          {showLineNumbers && (
                            <span className="w-8 text-right mr-2 text-gray-400 flex-shrink-0">
                              -{d.lineNumber}
                            </span>
                          )}
                          <span className="break-all">- {d.line1}</span>
                        </div>
                        <div className="flex bg-green-100 text-green-800">
                          {showLineNumbers && (
                            <span className="w-8 text-right mr-2 text-gray-400 flex-shrink-0">
                              +{d.lineNumber}
                            </span>
                          )}
                          <span className="break-all">+ {d.line2}</span>
                        </div>
                      </>
                    )}
                    {d.type === 'unchanged' && (
                      <div className="flex">
                        {showLineNumbers && (
                          <span className="w-8 text-right mr-2 text-gray-400 flex-shrink-0">
                            {d.lineNumber}
                          </span>
                        )}
                        <span className="break-all">  {d.line1}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TextDiffChecker;