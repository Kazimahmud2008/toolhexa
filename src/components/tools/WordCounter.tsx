import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Hash, Clock, FileText, RotateCcw } from 'lucide-react';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  const calculateStats = (inputText: string) => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Words calculation - split by whitespace and filter out empty strings
    const words = inputText.trim() ? inputText.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
    
    // Sentences calculation - split by sentence endings
    const sentences = inputText.trim() ? inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    
    // Paragraphs calculation - split by double line breaks
    const paragraphs = inputText.trim() ? inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0;
    
    // Reading time calculation (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);
    
    // Speaking time calculation (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    };
  };

  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  const clearText = () => {
    setText('');
  };

  const loadSample = () => {
    setText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`);
  };

  const getReadabilityLevel = () => {
    if (stats.words === 0) return { level: 'N/A', color: 'gray' };
    
    const avgWordsPerSentence = stats.sentences > 0 ? stats.words / stats.sentences : 0;
    const avgCharsPerWord = stats.words > 0 ? stats.charactersNoSpaces / stats.words : 0;
    
    if (avgWordsPerSentence < 15 && avgCharsPerWord < 5) {
      return { level: 'Very Easy', color: 'green' };
    } else if (avgWordsPerSentence < 20 && avgCharsPerWord < 6) {
      return { level: 'Easy', color: 'green' };
    } else if (avgWordsPerSentence < 25 && avgCharsPerWord < 7) {
      return { level: 'Moderate', color: 'yellow' };
    } else if (avgWordsPerSentence < 30 && avgCharsPerWord < 8) {
      return { level: 'Difficult', color: 'orange' };
    } else {
      return { level: 'Very Difficult', color: 'red' };
    }
  };

  const readability = getReadabilityLevel();
  
  const getProgressValue = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const targetLimits = {
    tweet: 280,
    facebook: 63206,
    instagram: 2200,
    linkedin: 3000,
    email: 200
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Word Counter</h1>
        <p className="text-muted-foreground">
          Count words, characters, paragraphs, and analyze reading time in your text
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Text Input
              </CardTitle>
              <CardDescription>
                Enter or paste your text here to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start typing or paste your text here..."
                className="min-h-[400px] text-sm"
              />
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
        </div>

        {/* Statistics Panel */}
        <div className="space-y-6">
          {/* Basic Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Text Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.characters.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">No Spaces</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.words.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
                  <div className="text-sm text-muted-foreground">Sentences</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
                  <div className="text-sm text-muted-foreground">Paragraphs</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className={`${
                    readability.color === 'green' ? 'bg-green-100 text-green-800' :
                    readability.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    readability.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                    readability.color === 'red' ? 'bg-red-100 text-red-800' : ''
                  }`}>
                    {readability.level}
                  </Badge>
                  <div className="text-sm text-muted-foreground">Readability</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reading Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time Estimates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.readingTime}</div>
                  <div className="text-sm text-muted-foreground">min reading</div>
                  <div className="text-xs text-muted-foreground">(200 wpm)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.speakingTime}</div>
                  <div className="text-sm text-muted-foreground">min speaking</div>
                  <div className="text-xs text-muted-foreground">(150 wpm)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Limits */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Limits</CardTitle>
              <CardDescription>Character count for different platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(targetLimits).map(([platform, limit]) => (
                <div key={platform} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{platform}</span>
                    <span className={stats.characters > limit ? 'text-red-500' : 'text-muted-foreground'}>
                      {stats.characters}/{limit}
                    </span>
                  </div>
                  <Progress 
                    value={getProgressValue(stats.characters, limit)} 
                    className={`h-2 ${stats.characters > limit ? '[&>div]:bg-red-500' : ''}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;