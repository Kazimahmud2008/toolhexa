import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, FileText, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoremIpsumGenerator = () => {
  const [count, setCount] = useState(5);
  const [type, setType] = useState('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generated, setGenerated] = useState('');
  const { toast } = useToast();

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'reprehenderit', 'in', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
    'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
    'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo',
    'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit', 'fugit',
    'consequuntur', 'magni', 'dolores', 'ratione', 'sequi', 'nesciunt', 'neque',
    'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam', 'eius', 'modi',
    'tempora', 'incidunt', 'magnam', 'quaerat', 'voluptatem', 'fuga', 'harum',
    'quidem', 'rerum', 'facilis', 'expedita', 'distinctio', 'nam', 'libero',
    'tempore', 'cum', 'soluta', 'nobis', 'eligendi', 'optio', 'cumque', 'nihil',
    'impedit', 'quo', 'minus', 'maxime', 'placeat', 'facere', 'possimus', 'omnis',
    'assumenda', 'repellendus', 'temporibus', 'quibusdam', 'officiis', 'debitis',
    'necessitatibus', 'saepe', 'eveniet', 'voluptates', 'repudiandae', 'recusandae',
    'itaque', 'earum', 'hic', 'tenetur', 'sapiente', 'delectus', 'reiciendis',
    'maiores', 'alias', 'perferendis', 'doloribus', 'asperiores', 'repellat'
  ];

  const generateWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  };

  const generateSentence = () => {
    const length = Math.floor(Math.random() * 10) + 5; // 5-14 words
    const words = [];
    for (let i = 0; i < length; i++) {
      words.push(generateWord());
    }
    // Capitalize first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = () => {
    const length = Math.floor(Math.random() * 5) + 3; // 3-7 sentences
    const sentences = [];
    for (let i = 0; i < length; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generate = () => {
    let result = '';
    
    switch (type) {
      case 'words':
        const words = [];
        for (let i = 0; i < count; i++) {
          words.push(generateWord());
        }
        if (startWithLorem && words.length > 0) {
          words[0] = 'Lorem';
          if (words.length > 1) words[1] = 'ipsum';
        }
        result = words.join(' ') + '.';
        break;
        
      case 'sentences':
        const sentences = [];
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence());
        }
        if (startWithLorem && sentences.length > 0) {
          sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        }
        result = sentences.join(' ');
        break;
        
      case 'paragraphs':
      default:
        const paragraphs = [];
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph());
        }
        if (startWithLorem && paragraphs.length > 0) {
          paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' + paragraphs[0].substring(paragraphs[0].indexOf(' ') + 1);
        }
        result = paragraphs.join('\n\n');
        break;
    }
    
    setGenerated(result);
  };

  React.useEffect(() => {
    generate();
  }, [count, type, startWithLorem]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    toast({
      title: "Copied!",
      description: "Lorem ipsum text has been copied to clipboard",
    });
  };

  const getStats = () => {
    const words = generated.split(/\s+/).filter(word => word.length > 0).length;
    const characters = generated.length;
    const charactersNoSpaces = generated.replace(/\s/g, '').length;
    const paragraphs = generated.split('\n\n').filter(p => p.trim()).length;
    
    return { words, characters, charactersNoSpaces, paragraphs };
  };

  const stats = getStats();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Lorem Ipsum Generator</h1>
        <p className="text-muted-foreground">
          Generate placeholder text for your designs and mockups
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Configuration
            </CardTitle>
            <CardDescription>
              Customize your Lorem Ipsum generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="count">Number of {type}</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-2">
              <Label>Generation Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={startWithLorem}
                onCheckedChange={setStartWithLorem}
              />
              <Label>Start with "Lorem ipsum"</Label>
            </div>

            <Button onClick={generate} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate New
            </Button>

            {/* Statistics */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-medium">Statistics</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Words:</span>
                  <Badge variant="secondary">{stats.words}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Characters:</span>
                  <Badge variant="secondary">{stats.characters}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>No spaces:</span>
                  <Badge variant="secondary">{stats.charactersNoSpaces}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Paragraphs:</span>
                  <Badge variant="secondary">{stats.paragraphs}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated Text */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Lorem Ipsum</span>
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
              </CardTitle>
              <CardDescription>
                Generated {count} {type} of Lorem Ipsum text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generated}
                readOnly
                className="min-h-[500px] font-serif text-sm leading-relaxed"
                placeholder="Generated text will appear here..."
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Templates</CardTitle>
          <CardDescription>
            Common Lorem Ipsum templates for different use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setType('paragraphs');
                setCount(3);
                setStartWithLorem(true);
              }}
            >
              Short Article (3 paragraphs)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setType('paragraphs');
                setCount(5);
                setStartWithLorem(true);
              }}
            >
              Medium Article (5 paragraphs)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setType('sentences');
                setCount(10);
                setStartWithLorem(true);
              }}
            >
              List Content (10 sentences)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setType('words');
                setCount(50);
                setStartWithLorem(true);
              }}
            >
              Short Description (50 words)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setType('words');
                setCount(150);
                setStartWithLorem(true);
              }}
            >
              Medium Description (150 words)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setType('sentences');
                setCount(2);
                setStartWithLorem(false);
              }}
            >
              Button Text (2 sentences)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoremIpsumGenerator;