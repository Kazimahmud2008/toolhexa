import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Youtube, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const YouTubeThumbnailDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/.*[?&]v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  const validateUrl = () => {
    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      setIsValid(true);
      setError('');
      // In a real app, you might fetch video title from YouTube API
      setVideoTitle('YouTube Video');
    } else {
      setVideoId('');
      setIsValid(false);
      if (url.trim()) {
        setError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
      } else {
        setError('');
      }
      setVideoTitle('');
    }
  };

  React.useEffect(() => {
    validateUrl();
  }, [url]);

  const thumbnailQualities = [
    {
      name: 'Max Resolution',
      key: 'maxresdefault',
      description: '1280x720 (if available)',
      size: 'Large'
    },
    {
      name: 'Standard Definition',
      key: 'sddefault',
      description: '640x480',
      size: 'Medium'
    },
    {
      name: 'High Quality',
      key: 'hqdefault',
      description: '480x360',
      size: 'Medium'
    },
    {
      name: 'Medium Quality',
      key: 'mqdefault',
      description: '320x180',
      size: 'Small'
    },
    {
      name: 'Default',
      key: 'default',
      description: '120x90',
      size: 'Small'
    }
  ];

  const downloadThumbnail = (quality: string, filename: string) => {
    if (!videoId) return;

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = `${filename}_${quality}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Started",
      description: `Downloading ${filename} thumbnail in ${quality} quality`,
    });
  };

  const downloadAll = () => {
    if (!videoId) return;

    thumbnailQualities.forEach(quality => {
      setTimeout(() => {
        downloadThumbnail(quality.key, videoTitle || 'youtube_thumbnail');
      }, 500 * thumbnailQualities.indexOf(quality));
    });

    toast({
      title: "All Downloads Started",
      description: "Downloading all thumbnail qualities",
    });
  };

  const loadSample = () => {
    setUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const clearUrl = () => {
    setUrl('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">YouTube Thumbnail Downloader</h1>
        <p className="text-muted-foreground">
          Download YouTube video thumbnails in various resolutions
        </p>
      </div>

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="h-5 w-5" />
            YouTube Video URL
          </CardTitle>
          <CardDescription>
            Enter a YouTube video URL to download its thumbnails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`flex-1 ${error ? 'border-red-500' : isValid ? 'border-green-500' : ''}`}
            />
            <Button onClick={loadSample} variant="outline">
              Sample
            </Button>
            <Button onClick={clearUrl} variant="outline">
              Clear
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {isValid && (
            <div className="flex items-center gap-2 text-green-500 text-sm">
              <CheckCircle className="h-4 w-4" />
              Valid YouTube URL detected
            </div>
          )}

          {videoId && (
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium">Video ID: {videoId}</div>
                <div className="text-sm text-muted-foreground">Ready to download thumbnails</div>
              </div>
              <Button onClick={downloadAll} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Thumbnail Preview and Downloads */}
      {isValid && videoId && (
        <>
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Thumbnail Preview</CardTitle>
              <CardDescription>
                Preview of the highest quality thumbnail available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="YouTube Thumbnail Preview"
                  className="max-w-full h-auto rounded-lg border"
                  onError={(e) => {
                    // Fallback to standard quality if max resolution fails
                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Download Options */}
          <Card>
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
              <CardDescription>
                Choose from different thumbnail qualities and resolutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {thumbnailQualities.map((quality) => (
                  <div
                    key={quality.key}
                    className="border rounded-lg p-4 space-y-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="aspect-video bg-muted/50 rounded-lg overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/${quality.key}.jpg`}
                        alt={`${quality.name} thumbnail`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{quality.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {quality.size}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {quality.description}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => downloadThumbnail(quality.key, videoTitle || 'youtube_thumbnail')}
                          size="sm"
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          onClick={() => window.open(`https://img.youtube.com/vi/${videoId}/${quality.key}.jpg`, '_blank')}
                          size="sm"
                          variant="outline"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Supported URL Formats:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
                <li>• https://youtu.be/VIDEO_ID</li>
                <li>• https://www.youtube.com/embed/VIDEO_ID</li>
                <li>• https://www.youtube.com/v/VIDEO_ID</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Available Qualities:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Max Resolution:</strong> Best quality (1280x720)</li>
                <li>• <strong>High Quality:</strong> Good quality (480x360)</li>
                <li>• <strong>Medium Quality:</strong> Standard quality (320x180)</li>
                <li>• <strong>Default:</strong> Small thumbnail (120x90)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeThumbnailDownloader;