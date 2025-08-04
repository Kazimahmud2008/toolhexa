import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Zap, Play } from 'lucide-react';

const CSSAnimationGenerator = () => {
  const [animationName, setAnimationName] = useState('fadeIn');
  const [duration, setDuration] = useState('1');
  const [timingFunction, setTimingFunction] = useState('ease');
  const [delay, setDelay] = useState('0');
  const [iterationCount, setIterationCount] = useState('1');
  const [direction, setDirection] = useState('normal');
  const [fillMode, setFillMode] = useState('none');
  const [animationType, setAnimationType] = useState('fadeIn');
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const animationPresets = {
    fadeIn: {
      name: 'fadeIn',
      keyframes: `@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`
    },
    slideInLeft: {
      name: 'slideInLeft',
      keyframes: `@keyframes slideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}`
    },
    bounce: {
      name: 'bounce',
      keyframes: `@keyframes bounce {
  0%, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}`
    },
    pulse: {
      name: 'pulse',
      keyframes: `@keyframes pulse {
  from { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(1.05, 1.05, 1.05); }
  to { transform: scale3d(1, 1, 1); }
}`
    },
    shake: {
      name: 'shake',
      keyframes: `@keyframes shake {
  from, to { transform: translate3d(0, 0, 0); }
  10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); }
  20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); }
}`
    }
  };

  const generateCSS = () => {
    const preset = animationPresets[animationType as keyof typeof animationPresets];
    
    return `${preset.keyframes}

.animated-element {
  animation-name: ${preset.name};
  animation-duration: ${duration}s;
  animation-timing-function: ${timingFunction};
  animation-delay: ${delay}s;
  animation-iteration-count: ${iterationCount};
  animation-direction: ${direction};
  animation-fill-mode: ${fillMode};
}

/* Shorthand */
.animated-element-short {
  animation: ${preset.name} ${duration}s ${timingFunction} ${delay}s ${iterationCount} ${direction} ${fillMode};
}`;
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    toast({
      title: 'Copied!',
      description: 'CSS animation code copied to clipboard',
    });
  };

  const playAnimation = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), parseFloat(duration) * 1000 + 100);
  };

  const getAnimationStyle = () => {
    const preset = animationPresets[animationType as keyof typeof animationPresets];
    return isPlaying ? {
      animationName: preset.name,
      animationDuration: `${duration}s`,
      animationTimingFunction: timingFunction,
      animationDelay: `${delay}s`,
      animationIterationCount: iterationCount,
      animationDirection: direction,
      animationFillMode: fillMode,
    } : {};
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <style>
        {Object.values(animationPresets).map(preset => preset.keyframes).join('\n')}
      </style>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">CSS Animation Generator</h1>
        <p className="text-muted-foreground">
          Create CSS animations with keyframes and timing functions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Animation Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Animation Type</Label>
              <Select value={animationType} onValueChange={setAnimationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fadeIn">Fade In</SelectItem>
                  <SelectItem value="slideInLeft">Slide In Left</SelectItem>
                  <SelectItem value="bounce">Bounce</SelectItem>
                  <SelectItem value="pulse">Pulse</SelectItem>
                  <SelectItem value="shake">Shake</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (s)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="0.1"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delay">Delay (s)</Label>
                <Input
                  id="delay"
                  type="number"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Timing Function</Label>
              <Select value={timingFunction} onValueChange={setTimingFunction}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ease">ease</SelectItem>
                  <SelectItem value="ease-in">ease-in</SelectItem>
                  <SelectItem value="ease-out">ease-out</SelectItem>
                  <SelectItem value="ease-in-out">ease-in-out</SelectItem>
                  <SelectItem value="linear">linear</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Iteration Count</Label>
              <Select value={iterationCount} onValueChange={setIterationCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="infinite">infinite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Direction</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">normal</SelectItem>
                  <SelectItem value="reverse">reverse</SelectItem>
                  <SelectItem value="alternate">alternate</SelectItem>
                  <SelectItem value="alternate-reverse">alternate-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fill Mode</Label>
              <Select value={fillMode} onValueChange={setFillMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">none</SelectItem>
                  <SelectItem value="forwards">forwards</SelectItem>
                  <SelectItem value="backwards">backwards</SelectItem>
                  <SelectItem value="both">both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Animation Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center p-8 bg-muted/50 rounded-lg min-h-[200px] items-center">
              <div
                className="w-24 h-24 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-semibold"
                style={getAnimationStyle()}
              >
                Element
              </div>
            </div>
            <Button onClick={playAnimation} className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Play Animation
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Generated CSS
            <Button variant="ghost" size="sm" onClick={copyCSS}>
              <Copy className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={generateCSS()}
            readOnly
            className="min-h-64 bg-muted font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CSSAnimationGenerator;