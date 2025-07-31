import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const { toast } = useToast();

  const generatePassword = () => {
    let chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars === '') {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      });
      return;
    }

    let result = '';
    for (let i = 0; i < length[0]; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard"
    });
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Very Weak': return 'text-red-500';
      case 'Weak': return 'text-orange-500';
      case 'Fair': return 'text-yellow-500';
      case 'Good': return 'text-blue-500';
      case 'Strong': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  const calculateStrength = () => {
    if (!password) return { strength: 'None', score: 0 };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthIndex = Math.min(Math.floor(score / 1.2), 4);
    
    return {
      strength: strengthLevels[strengthIndex],
      score: (score / 6) * 100
    };
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const { strength, score } = calculateStrength();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
          <CardDescription>
            Generate secure passwords with customizable options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Generated Password</label>
            <div className="flex gap-2">
              <Input
                value={password}
                readOnly
                className="font-mono text-lg bg-muted"
                placeholder="Generated password will appear here"
              />
              <Button onClick={copyToClipboard} variant="outline" size="icon" disabled={!password}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button onClick={generatePassword} variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            
            {password && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Strength:</span>
                  <span className={`text-sm font-medium ${getStrengthColor(strength)}`}>
                    {strength}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Length: {length[0]}</label>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  max={50}
                  min={4}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={(checked) => setIncludeUppercase(!!checked)}
                  />
                  <label htmlFor="uppercase" className="text-sm">Uppercase letters (A-Z)</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={(checked) => setIncludeLowercase(!!checked)}
                  />
                  <label htmlFor="lowercase" className="text-sm">Lowercase letters (a-z)</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(!!checked)}
                  />
                  <label htmlFor="numbers" className="text-sm">Numbers (0-9)</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) => setIncludeSymbols(!!checked)}
                  />
                  <label htmlFor="symbols" className="text-sm">Symbols (!@#$%^&*)</label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Password Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use at least 12 characters for better security</li>
              <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
              <li>• Avoid using personal information</li>
              <li>• Use a unique password for each account</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;