import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ValidationResult {
  email: string;
  valid: boolean;
  reason?: string;
  suggestions?: string[];
}

const EmailValidator = () => {
  const [singleEmail, setSingleEmail] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateEmailFormat = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email_trimmed = email.trim().toLowerCase();
    
    if (!email_trimmed) {
      return { email, valid: false, reason: 'Empty email' };
    }

    if (!emailRegex.test(email_trimmed)) {
      return { 
        email, 
        valid: false, 
        reason: 'Invalid format',
        suggestions: ['Check for missing @ symbol', 'Ensure domain has extension (.com, .org, etc.)']
      };
    }

    const [localPart, domain] = email_trimmed.split('@');
    
    // Check local part length
    if (localPart.length > 64) {
      return { 
        email, 
        valid: false, 
        reason: 'Local part too long (max 64 characters)' 
      };
    }

    // Check for consecutive dots
    if (localPart.includes('..') || domain.includes('..')) {
      return { 
        email, 
        valid: false, 
        reason: 'Consecutive dots not allowed' 
      };
    }

    // Check for valid characters in local part
    const localPartRegex = /^[a-zA-Z0-9._-]+$/;
    if (!localPartRegex.test(localPart)) {
      return { 
        email, 
        valid: false, 
        reason: 'Invalid characters in local part',
        suggestions: ['Use only letters, numbers, dots, hyphens, and underscores']
      };
    }

    // Check domain format
    if (domain.length < 4 || !domain.includes('.')) {
      return { 
        email, 
        valid: false, 
        reason: 'Invalid domain format',
        suggestions: ['Domain must have at least one dot and valid extension']
      };
    }

    // Common domain typos
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domainSuggestions: string[] = [];
    
    commonDomains.forEach(commonDomain => {
      if (domain !== commonDomain && domain.replace(/[^a-z]/g, '') === commonDomain.replace(/[^a-z]/g, '')) {
        domainSuggestions.push(`Did you mean ${localPart}@${commonDomain}?`);
      }
    });

    return { 
      email: email_trimmed, 
      valid: true,
      suggestions: domainSuggestions.length > 0 ? domainSuggestions : undefined
    };
  };

  const validateSingle = () => {
    if (!singleEmail.trim()) {
      toast({
        title: 'Missing Email',
        description: 'Please enter an email address to validate',
        variant: 'destructive',
      });
      return;
    }

    setIsValidating(true);
    setTimeout(() => {
      const result = validateEmailFormat(singleEmail);
      setResults([result]);
      setIsValidating(false);
      
      toast({
        title: result.valid ? 'Valid Email' : 'Invalid Email',
        description: result.valid ? 'Email format is correct' : result.reason,
        variant: result.valid ? 'default' : 'destructive',
      });
    }, 500);
  };

  const validateBulk = () => {
    if (!bulkEmails.trim()) {
      toast({
        title: 'Missing Emails',
        description: 'Please enter email addresses to validate',
        variant: 'destructive',
      });
      return;
    }

    setIsValidating(true);
    
    setTimeout(() => {
      const emails = bulkEmails
        .split(/[\n,;]/)
        .map(email => email.trim())
        .filter(email => email.length > 0);

      const validationResults = emails.map(validateEmailFormat);
      setResults(validationResults);
      setIsValidating(false);

      const validCount = validationResults.filter(r => r.valid).length;
      toast({
        title: 'Validation Complete',
        description: `${validCount}/${validationResults.length} emails are valid`,
      });
    }, 1000);
  };

  const clearResults = () => {
    setResults([]);
    setSingleEmail('');
    setBulkEmails('');
  };

  const exportResults = () => {
    const validEmails = results.filter(r => r.valid).map(r => r.email);
    const text = validEmails.join('\n');
    
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${validEmails.length} valid emails copied to clipboard`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Email Validator</h1>
        <p className="text-muted-foreground">
          Validate email addresses for format and domain correctness
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Single Email Validation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={singleEmail}
              onChange={(e) => setSingleEmail(e.target.value)}
              placeholder="Enter email address"
              type="email"
            />
            <Button 
              onClick={validateSingle} 
              disabled={isValidating}
              className="w-full"
            >
              {isValidating ? 'Validating...' : 'Validate Email'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bulk Email Validation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={bulkEmails}
              onChange={(e) => setBulkEmails(e.target.value)}
              placeholder="Enter multiple emails (one per line or comma-separated)"
              className="min-h-24"
            />
            <Button 
              onClick={validateBulk} 
              disabled={isValidating}
              className="w-full"
            >
              {isValidating ? 'Validating...' : 'Validate Emails'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Validation Results ({results.length})
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={exportResults}>
                  Export Valid
                </Button>
                <Button variant="outline" size="sm" onClick={clearResults}>
                  Clear
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {result.valid ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <code className="text-sm">{result.email}</code>
                        <Badge variant={result.valid ? 'default' : 'destructive'}>
                          {result.valid ? 'Valid' : 'Invalid'}
                        </Badge>
                      </div>
                      
                      {result.reason && (
                        <div className="text-sm text-red-600 mb-2">
                          <AlertCircle className="h-3 w-3 inline mr-1" />
                          {result.reason}
                        </div>
                      )}
                      
                      {result.suggestions && (
                        <div className="space-y-1">
                          {result.suggestions.map((suggestion, i) => (
                            <div key={i} className="text-sm text-amber-600">
                              <AlertCircle className="h-3 w-3 inline mr-1" />
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.filter(r => r.valid).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Valid</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {results.filter(r => !r.valid).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Invalid</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {results.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Email Validation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">Valid Format</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Contains @ symbol</li>
                <li>• Has domain extension (.com, .org, etc.)</li>
                <li>• Local part ≤ 64 characters</li>
                <li>• No consecutive dots</li>
                <li>• Valid characters only</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">Common Issues</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Missing @ symbol</li>
                <li>• Invalid domain format</li>
                <li>• Special characters in wrong places</li>
                <li>• Typos in common domains</li>
                <li>• Spaces or extra characters</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailValidator;