import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Type, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TextCaseConverter = () => {
  const [inputText, setInputText] = useState('Hello World! This is a Sample Text for Case Conversion.');
  const [results, setResults] = useState({
    uppercase: '',
    lowercase: '',
    titleCase: '',
    sentenceCase: '',
    camelCase: '',
    pascalCase: '',
    snakeCase: '',
    kebabCase: '',
    alternating: '',
    inverse: ''
  });
  const { toast } = useToast();

  const convertText = () => {
    const text = inputText;
    
    setResults({
      uppercase: text.toUpperCase(),
      lowercase: text.toLowerCase(),
      titleCase: text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      ),
      sentenceCase: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
      camelCase: text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, ''),
      pascalCase: text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
        .replace(/\s+/g, ''),
      snakeCase: text
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_'),
      kebabCase: text
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('-'),
      alternating: text
        .split('')
        .map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join(''),
      inverse: text
        .split('')
        .map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        )
        .join('')
    });
  };

  React.useEffect(() => {
    convertText();
  }, [inputText]);

  const copyToClipboard = (text: string, caseName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${caseName} has been copied to clipboard`,
    });
  };

  const clearText = () => {
    setInputText('');
  };

  const loadSample = () => {
    setInputText('Hello World! This is a Sample Text for Case Conversion. It includes UPPERCASE, lowercase, and Mixed Case words.');
  };

  const caseTypes = [
    {
      name: 'UPPERCASE',
      key: 'uppercase' as keyof typeof results,
      description: 'All letters in uppercase',
      example: 'HELLO WORLD'
    },
    {
      name: 'lowercase',
      key: 'lowercase' as keyof typeof results,
      description: 'All letters in lowercase',
      example: 'hello world'
    },
    {
      name: 'Title Case',
      key: 'titleCase' as keyof typeof results,
      description: 'First letter of each word capitalized',
      example: 'Hello World'
    },
    {
      name: 'Sentence case',
      key: 'sentenceCase' as keyof typeof results,
      description: 'First letter of sentence capitalized',
      example: 'Hello world'
    },
    {
      name: 'camelCase',
      key: 'camelCase' as keyof typeof results,
      description: 'First word lowercase, subsequent words capitalized',
      example: 'helloWorld'
    },
    {
      name: 'PascalCase',
      key: 'pascalCase' as keyof typeof results,
      description: 'All words capitalized, no spaces',
      example: 'HelloWorld'
    },
    {
      name: 'snake_case',
      key: 'snakeCase' as keyof typeof results,
      description: 'Lowercase words separated by underscores',
      example: 'hello_world'
    },
    {
      name: 'kebab-case',
      key: 'kebabCase' as keyof typeof results,
      description: 'Lowercase words separated by hyphens',
      example: 'hello-world'
    },
    {
      name: 'aLtErNaTiNg CaSe',
      key: 'alternating' as keyof typeof results,
      description: 'Alternating uppercase and lowercase letters',
      example: 'hElLo WoRlD'
    },
    {
      name: 'iNVERSE cASE',
      key: 'inverse' as keyof typeof results,
      description: 'Inverts the case of each letter',
      example: 'hELLO wORLD'
    }
  ];

  const getStats = () => {
    return {
      characters: inputText.length,
      charactersNoSpaces: inputText.replace(/\s/g, '').length,
      words: inputText.trim() ? inputText.trim().split(/\s+/).length : 0,
      sentences: inputText.trim() ? inputText.split(/[.!?]+/).filter(s => s.trim()).length : 0,
      paragraphs: inputText.trim() ? inputText.split(/\n\s*\n/).filter(p => p.trim()).length : 0
    };
  };

  const stats = getStats();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Text Case Converter</h1>
        <p className="text-muted-foreground">
          Convert text between different cases: uppercase, lowercase, title case, and more
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Input Text
          </CardTitle>
          <CardDescription>
            Enter the text you want to convert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            className="min-h-[150px]"
          />
          
          {/* Text Statistics */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Characters: {stats.characters}</Badge>
            <Badge variant="secondary">Characters (no spaces): {stats.charactersNoSpaces}</Badge>
            <Badge variant="secondary">Words: {stats.words}</Badge>
            <Badge variant="secondary">Sentences: {stats.sentences}</Badge>
            <Badge variant="secondary">Paragraphs: {stats.paragraphs}</Badge>
          </div>

          <div className="flex gap-2">
            <Button onClick={loadSample} variant="outline">
              Load Sample
            </Button>
            <Button onClick={clearText} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caseTypes.map((caseType) => (
          <Card key={caseType.key} className="h-fit">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{caseType.name}</CardTitle>
                <Button
                  onClick={() => copyToClipboard(results[caseType.key], caseType.name)}
                  size="sm"
                  variant="outline"
                  disabled={!results[caseType.key]}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-sm">
                {caseType.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Example: {caseType.example}</div>
                <div className="p-3 bg-muted/30 rounded-md border min-h-[60px] text-sm font-mono break-words">
                  {results[caseType.key] || 'Enter text to see conversion...'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TextCaseConverter;