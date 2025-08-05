import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Globe, Calendar, Shield, User } from 'lucide-react';

interface WHOISData {
  domain: string;
  registrar: string;
  registrationDate: string;
  expirationDate: string;
  status: string[];
  nameServers: string[];
  registrant: {
    organization?: string;
    country?: string;
  };
  adminContact: {
    email?: string;
    country?: string;
  };
}

const WHOISLookup = () => {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [whoisData, setWhoisData] = useState<WHOISData | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Mock WHOIS data since we can't make real WHOIS queries in a client-side app
  const generateMockWhoisData = (domain: string): WHOISData => {
    const registrars = ['GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare', 'Network Solutions'];
    const statuses = ['clientTransferProhibited', 'clientUpdateProhibited', 'clientDeleteProhibited'];
    const nameServers = [
      'ns1.example.com',
      'ns2.example.com',
      'ns3.example.com',
      'ns4.example.com'
    ];

    return {
      domain: domain.toLowerCase(),
      registrar: registrars[Math.floor(Math.random() * registrars.length)],
      registrationDate: new Date(Date.now() - Math.random() * 10 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      expirationDate: new Date(Date.now() + Math.random() * 2 * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: statuses.slice(0, Math.floor(Math.random() * 3) + 1),
      nameServers: nameServers.slice(0, Math.floor(Math.random() * 2) + 2),
      registrant: {
        organization: Math.random() > 0.5 ? 'Privacy Protected' : 'Example Corporation',
        country: 'US'
      },
      adminContact: {
        email: 'admin@' + domain.toLowerCase(),
        country: 'US'
      }
    };
  };

  const isValidDomain = (domain: string) => {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;
    return domainRegex.test(domain);
  };

  const lookupDomain = async () => {
    if (!domain.trim()) {
      toast({
        title: 'Missing Domain',
        description: 'Please enter a domain name to lookup',
        variant: 'destructive',
      });
      return;
    }

    const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    if (!isValidDomain(cleanDomain)) {
      setError('Please enter a valid domain name');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = generateMockWhoisData(cleanDomain);
      setWhoisData(mockData);
      
      toast({
        title: 'WHOIS Lookup Complete',
        description: `Found information for ${cleanDomain}`,
      });
    } catch (err) {
      setError('Failed to lookup domain information');
      toast({
        title: 'Lookup Failed',
        description: 'Unable to retrieve domain information',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setWhoisData(null);
    setError('');
    setDomain('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">WHOIS Lookup</h1>
        <p className="text-muted-foreground">
          Look up domain registration and ownership information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Domain Lookup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain name (e.g., example.com)"
              onKeyDown={(e) => e.key === 'Enter' && lookupDomain()}
            />
            <Button onClick={lookupDomain} disabled={isLoading}>
              {isLoading ? 'Looking up...' : 'Lookup'}
            </Button>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-2"><strong>Note:</strong> This is a demo WHOIS lookup tool that generates mock data for demonstration purposes.</p>
            <p>In a real implementation, this would connect to actual WHOIS databases to retrieve live domain information.</p>
          </div>
        </CardContent>
      </Card>

      {whoisData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Domain Information
                </div>
                <Button variant="outline" size="sm" onClick={clearResults}>
                  Clear
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Domain Name</label>
                    <div className="font-mono text-lg">{whoisData.domain}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Registrar</label>
                    <div>{whoisData.registrar}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {whoisData.status.map((status, index) => (
                        <Badge key={index} variant="secondary">
                          {status}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Registration Date
                    </label>
                    <div>{whoisData.registrationDate}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Expiration Date
                    </label>
                    <div>{whoisData.expirationDate}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name Servers</label>
                    <div className="space-y-1">
                      {whoisData.nameServers.map((ns, index) => (
                        <div key={index} className="font-mono text-sm">{ns}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Registrant Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Organization</label>
                  <div>{whoisData.registrant.organization || 'Not Available'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Country</label>
                  <div>{whoisData.registrant.country || 'Not Available'}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Administrative Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="font-mono text-sm">{whoisData.adminContact.email || 'Privacy Protected'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Country</label>
                  <div>{whoisData.adminContact.country || 'Not Available'}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>About WHOIS Lookup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">What is WHOIS?</h4>
              <p className="text-sm text-muted-foreground">
                WHOIS is a protocol that provides information about domain name registrations, 
                including registrant details, registration dates, and administrative contacts.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Common Use Cases</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check domain ownership</li>
                <li>• Verify registration details</li>
                <li>• Find expiration dates</li>
                <li>• Identify name servers</li>
                <li>• Research domain history</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WHOISLookup;