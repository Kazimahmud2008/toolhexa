import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, Copy, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RegexTester = () => {
  const [pattern, setPattern] = useState('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b');
  const [testString, setTestString] = useState(`Contact us at:
- john.doe@example.com
- invalid-email
- test@domain.co.uk
- another@test.org
- notanemail.com`);
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: true,
    multiline: false,
    sticky: false,
    unicode: false,
    dotAll: false
  });
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();

  const getFlagsString = () => {
    let flagsStr = '';
    if (flags.global) flagsStr += 'g';
    if (flags.ignoreCase) flagsStr += 'i';
    if (flags.multiline) flagsStr += 'm';
    if (flags.sticky) flagsStr += 'y';
    if (flags.unicode) flagsStr += 'u';
    if (flags.dotAll) flagsStr += 's';
    return flagsStr;
  };

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, getFlagsString());
      setError('');
      setIsValid(true);
      
      if (flags.global) {
        const allMatches = [];
        let match;
        const globalRegex = new RegExp(pattern, getFlagsString());
        
        while ((match = globalRegex.exec(testString)) !== null) {
          allMatches.push(match);
          if (!flags.global) break;
        }
        setMatches(allMatches);
      } else {
        const match = testString.match(regex);
        setMatches(match ? [match] : []);
      }
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
      setMatches([]);
    }
  };

  useEffect(() => {
    testRegex();
  }, [pattern, testString, flags]);

  const copyPattern = () => {
    navigator.clipboard.writeText(`/${pattern}/${getFlagsString()}`);
    toast({
      title: "Copied!",
      description: "Regex pattern has been copied to clipboard",
    });
  };

  const highlightMatches = (text: string) => {
    if (!matches.length || !isValid) return text;
    
    let highlightedText = text;
    let offset = 0;
    
    matches.forEach((match) => {
      if (match.index !== undefined) {
        const start = match.index + offset;
        const end = start + match[0].length;
        const before = highlightedText.slice(0, start);
        const matchText = highlightedText.slice(start, end);
        const after = highlightedText.slice(end);
        
        highlightedText = before + `<mark class="bg-yellow-300 text-yellow-900 px-1 rounded">${matchText}</mark>` + after;
        offset += 73; // Length of the mark tags
      }
    });
    
    return highlightedText;
  };

  const commonPatterns = [
    { name: 'Email', pattern: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
    { name: 'Phone', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}' },
    { name: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' },
    { name: 'Date (MM/DD/YYYY)', pattern: '\\b(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/(19|20)\\d{2}\\b' },
    { name: 'Hex Color', pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Regex Tester</h1>
        <p className="text-muted-foreground">
          Test and debug regular expressions with real-time matching
        </p>
      </div>

      {/* Pattern Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Regular Expression Pattern
          </CardTitle>
          <CardDescription>
            Enter your regex pattern and configure flags
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className={`font-mono ${!isValid ? 'border-red-500' : ''}`}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}
            </div>
            <Button onClick={copyPattern} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>

          {/* Flags */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Flags:</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(flags).map(([flag, value]) => (
                <div key={flag} className="flex items-center space-x-2">
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => setFlags({ ...flags, [flag]: checked })}
                  />
                  <Label className="text-sm capitalize">
                    {flag} ({flag === 'global' ? 'g' : flag === 'ignoreCase' ? 'i' : flag === 'multiline' ? 'm' : flag === 'sticky' ? 'y' : flag === 'unicode' ? 'u' : 's'})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Common Patterns */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Common Patterns:</Label>
            <div className="flex flex-wrap gap-2">
              {commonPatterns.map((item) => (
                <Button
                  key={item.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setPattern(item.pattern)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test String */}
        <Card>
          <CardHeader>
            <CardTitle>Test String</CardTitle>
            <CardDescription>
              Enter the text you want to test against your regex
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test..."
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isValid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              Results
              <Badge variant="secondary">
                {matches.length} matches
              </Badge>
            </CardTitle>
            <CardDescription>
              Highlighted matches and detailed results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Highlighted Text */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <div 
                className="font-mono text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightMatches(testString) }}
              />
            </div>

            {/* Match Details */}
            {matches.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Match Details:</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {matches.map((match, index) => (
                    <div key={index} className="text-sm border rounded p-2 bg-muted/20">
                      <div><strong>Match {index + 1}:</strong> "{match[0]}"</div>
                      <div><strong>Position:</strong> {match.index} - {(match.index || 0) + match[0].length - 1}</div>
                      {match.length > 1 && (
                        <div><strong>Groups:</strong> {match.slice(1).join(', ')}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegexTester;