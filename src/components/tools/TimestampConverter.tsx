import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Timer, RefreshCw, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [humanDate, setHumanDate] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { toast } = useToast();

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Kolkata',
    'Australia/Sydney',
    'Pacific/Auckland'
  ];

  const convertTimestampToDate = (ts: string) => {
    try {
      const timestampNum = parseInt(ts);
      if (isNaN(timestampNum)) return '';
      
      // Handle both seconds and milliseconds
      const date = new Date(timestampNum.toString().length === 10 ? timestampNum * 1000 : timestampNum);
      
      if (timezone === 'UTC') {
        return date.toISOString().slice(0, 19).replace('T', ' ') + ' UTC';
      } else {
        return date.toLocaleString('en-US', {
          timeZone: timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ` (${timezone})`;
      }
    } catch (error) {
      return 'Invalid timestamp';
    }
  };

  const convertDateToTimestamp = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return Math.floor(date.getTime() / 1000).toString();
    } catch (error) {
      return '';
    }
  };

  useEffect(() => {
    setHumanDate(convertTimestampToDate(timestamp));
  }, [timestamp, timezone]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} has been copied to clipboard`,
    });
  };

  const setCurrentTimestamp = () => {
    setTimestamp(Math.floor(Date.now() / 1000).toString());
  };

  const formatRelativeTime = (ts: string) => {
    try {
      const timestampNum = parseInt(ts);
      if (isNaN(timestampNum)) return '';
      
      const date = new Date(timestampNum.toString().length === 10 ? timestampNum * 1000 : timestampNum);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (Math.abs(diffSeconds) < 60) {
        return diffSeconds === 0 ? 'now' : `${Math.abs(diffSeconds)} seconds ${diffSeconds > 0 ? 'ago' : 'from now'}`;
      } else if (Math.abs(diffMinutes) < 60) {
        return `${Math.abs(diffMinutes)} minutes ${diffMinutes > 0 ? 'ago' : 'from now'}`;
      } else if (Math.abs(diffHours) < 24) {
        return `${Math.abs(diffHours)} hours ${diffHours > 0 ? 'ago' : 'from now'}`;
      } else {
        return `${Math.abs(diffDays)} days ${diffDays > 0 ? 'ago' : 'from now'}`;
      }
    } catch (error) {
      return '';
    }
  };

  const getTimestampInfo = (ts: string) => {
    try {
      const timestampNum = parseInt(ts);
      if (isNaN(timestampNum)) return null;
      
      const isMilliseconds = timestampNum.toString().length === 13;
      const date = new Date(isMilliseconds ? timestampNum : timestampNum * 1000);
      
      return {
        isValid: !isNaN(date.getTime()),
        type: isMilliseconds ? 'milliseconds' : 'seconds',
        iso: date.toISOString(),
        relative: formatRelativeTime(ts),
        weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
        year: date.getFullYear(),
        isLeapYear: (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) || (date.getFullYear() % 400 === 0)
      };
    } catch (error) {
      return null;
    }
  };

  const timestampInfo = getTimestampInfo(timestamp);

  const commonTimestamps = [
    { name: 'Current Time', value: Math.floor(Date.now() / 1000).toString() },
    { name: 'Unix Epoch', value: '0' },
    { name: 'Y2K', value: '946684800' },
    { name: 'JavaScript Epoch', value: '0' },
    { name: '1 Hour Ago', value: Math.floor((Date.now() - 3600000) / 1000).toString() },
    { name: '1 Day Ago', value: Math.floor((Date.now() - 86400000) / 1000).toString() },
    { name: '1 Week Ago', value: Math.floor((Date.now() - 604800000) / 1000).toString() },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Timestamp Converter</h1>
        <p className="text-muted-foreground">
          Convert between Unix timestamps and human-readable dates
        </p>
      </div>

      {/* Current Time Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Current Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-mono font-bold text-primary">
                {Math.floor(currentTime / 1000)}
              </div>
              <div className="text-sm text-muted-foreground">Unix Timestamp</div>
            </div>
            <div>
              <div className="text-lg font-medium">
                {new Date(currentTime).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Local Time</div>
            </div>
            <div>
              <div className="text-lg font-medium">
                {new Date(currentTime).toISOString().replace('T', ' ').replace('.000Z', ' UTC')}
              </div>
              <div className="text-sm text-muted-foreground">UTC Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timestamp Input
            </CardTitle>
            <CardDescription>
              Enter a Unix timestamp to convert
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timestamp">Unix Timestamp</Label>
              <div className="flex gap-2">
                <Input
                  id="timestamp"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="Enter timestamp..."
                  className="font-mono"
                />
                <Button onClick={setCurrentTimestamp} variant="outline">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {timestampInfo && (
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="secondary">{timestampInfo.type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Relative:</span>
                  <span className="text-sm font-medium">{timestampInfo.relative}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Weekday:</span>
                  <span className="text-sm font-medium">{timestampInfo.weekday}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Leap Year:</span>
                  <Badge variant={timestampInfo.isLeapYear ? "default" : "secondary"}>
                    {timestampInfo.isLeapYear ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle>Converted Date</CardTitle>
            <CardDescription>
              Human-readable date and time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg border">
                <div className="text-lg font-medium break-all">
                  {humanDate || 'Enter a valid timestamp'}
                </div>
              </div>
              
              {timestampInfo?.isValid && (
                <>
                  <div className="space-y-2">
                    <Label>ISO Format</Label>
                    <div className="flex gap-2">
                      <Input
                        value={timestampInfo.iso}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        onClick={() => copyToClipboard(timestampInfo.iso, 'ISO date')}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Unix Timestamp (seconds)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={timestamp.length === 13 ? Math.floor(parseInt(timestamp) / 1000).toString() : timestamp}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        onClick={() => copyToClipboard(
                          timestamp.length === 13 ? Math.floor(parseInt(timestamp) / 1000).toString() : timestamp,
                          'Unix timestamp'
                        )}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Unix Timestamp (milliseconds)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={timestamp.length === 10 ? (parseInt(timestamp) * 1000).toString() : timestamp}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        onClick={() => copyToClipboard(
                          timestamp.length === 10 ? (parseInt(timestamp) * 1000).toString() : timestamp,
                          'Unix timestamp (ms)'
                        )}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>
            Common timestamps for quick testing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {commonTimestamps.map((item) => (
              <Button
                key={item.name}
                onClick={() => setTimestamp(item.value)}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {item.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Date to Timestamp */}
      <Card>
        <CardHeader>
          <CardTitle>Date to Timestamp</CardTitle>
          <CardDescription>
            Convert a human-readable date to Unix timestamp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="datetime-local"
              onChange={(e) => {
                if (e.target.value) {
                  const ts = convertDateToTimestamp(e.target.value);
                  if (ts) setTimestamp(ts);
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={() => {
                const now = new Date();
                const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
                const input = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
                if (input) input.value = localISOTime;
                setTimestamp(Math.floor(Date.now() / 1000).toString());
              }}
              variant="outline"
            >
              Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimestampConverter;