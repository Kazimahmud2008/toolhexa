import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ToolCard from '@/components/ToolCard';
import JSONFormatter from '@/components/tools/JSONFormatter';
import Base64Encoder from '@/components/tools/Base64Encoder';
import ColorPicker from '@/components/tools/ColorPicker';
import PasswordGenerator from '@/components/tools/PasswordGenerator';
import URLEncoder from '@/components/tools/URLEncoder';
import HTMLEncoder from '@/components/tools/HTMLEncoder';
import UUIDGenerator from '@/components/tools/UUIDGenerator';
import HashGenerator from '@/components/tools/HashGenerator';
import QRCodeGenerator from '@/components/tools/QRCodeGenerator';
import MarkdownToHTML from '@/components/tools/MarkdownToHTML';
import RegexTester from '@/components/tools/RegexTester';
import JSONToCSV from '@/components/tools/JSONToCSV';
import TextCaseConverter from '@/components/tools/TextCaseConverter';
import WordCounter from '@/components/tools/WordCounter';
import LoremIpsumGenerator from '@/components/tools/LoremIpsumGenerator';
import TextDiffChecker from '@/components/tools/TextDiffChecker';
import YouTubeThumbnailDownloader from '@/components/tools/YouTubeThumbnailDownloader';
import TimestampConverter from '@/components/tools/TimestampConverter';
import CSSGridGenerator from '@/components/tools/CSSGridGenerator';
import CSSFlexboxGenerator from '@/components/tools/CSSFlexboxGenerator';
import CSSFormatter from '@/components/tools/CSSFormatter';
import CSSAnimationGenerator from '@/components/tools/CSSAnimationGenerator';
import CSSMinifier from '@/components/tools/CSSMinifier';
import GradientTextGenerator from '@/components/tools/GradientTextGenerator';
import CSSBoxShadowGenerator from '@/components/tools/CSSBoxShadowGenerator';
import CSSClipPathGenerator from '@/components/tools/CSSClipPathGenerator';
import CSSBorderRadiusGenerator from '@/components/tools/CSSBorderRadiusGenerator';
import JavaScriptFormatter from '@/components/tools/JavaScriptFormatter';
import HTMLFormatter from '@/components/tools/HTMLFormatter';
import SQLFormatter from '@/components/tools/SQLFormatter';
import XMLFormatter from '@/components/tools/XMLFormatter';
import YAMLFormatter from '@/components/tools/YAMLFormatter';
import ImageCompressor from '@/components/tools/ImageCompressor';
import ImageResizer from '@/components/tools/ImageResizer';
import ImageFormatConverter from '@/components/tools/ImageFormatConverter';
import FaviconGenerator from '@/components/tools/FaviconGenerator';
import ImageCropper from '@/components/tools/ImageCropper';
import SVGOptimizer from '@/components/tools/SVGOptimizer';
import ImageFilter from '@/components/tools/ImageFilter';
import ImagePlaceholderGenerator from '@/components/tools/ImagePlaceholderGenerator';
import ImageMetadataViewer from '@/components/tools/ImageMetadataViewer';
import CSSGradientGenerator from '@/components/tools/CSSGradientGenerator';
import MetaTagGenerator from '@/components/tools/MetaTagGenerator';
import SitemapGenerator from '@/components/tools/SitemapGenerator';
import RobotsTxtGenerator from '@/components/tools/RobotsTxtGenerator';
import ColorPaletteGenerator from '@/components/tools/ColorPaletteGenerator';
import ColorConverter from '@/components/tools/ColorConverter';
import ContrastChecker from '@/components/tools/ContrastChecker';
import SocialMediaResizer from '@/components/tools/SocialMediaResizer';
import HashtagGenerator from '@/components/tools/HashtagGenerator';
import URLShortener from '@/components/tools/URLShortener';
import EmailValidator from '@/components/tools/EmailValidator';
import UnitConverter from '@/components/tools/UnitConverter';
import WHOISLookup from '@/components/tools/WHOISLookup';
import { tools } from '@/data/tools';
import { ArrowLeft, Star, Users, Calendar, ExternalLink } from 'lucide-react';

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = tools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The tool you're looking for doesn't exist.
          </p>
          <Link to="/tools">
            <Button variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related tools (same category, different tool)
  const relatedTools = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 5);

  // Render specific tool component
  const renderToolComponent = () => {
    switch (tool.id) {
      case 'json-formatter':
        return <JSONFormatter />;
      case 'base64-encoder':
        return <Base64Encoder />;
      case 'color-picker':
        return <ColorPicker />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'url-encoder':
        return <URLEncoder />;
      case 'html-encoder':
        return <HTMLEncoder />;
      case 'uuid-generator':
        return <UUIDGenerator />;
      case 'hash-generator':
        return <HashGenerator />;
      case 'qr-code-generator':
        return <QRCodeGenerator />;
      case 'markdown-to-html':
        return <MarkdownToHTML />;
      case 'regex-tester':
        return <RegexTester />;
      case 'json-to-csv':
        return <JSONToCSV />;
      case 'text-case-converter':
        return <TextCaseConverter />;
      case 'word-counter':
        return <WordCounter />;
      case 'lorem-ipsum':
        return <LoremIpsumGenerator />;
      case 'text-diff':
        return <TextDiffChecker />;
      case 'youtube-thumbnail-downloader':
        return <YouTubeThumbnailDownloader />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'css-grid-generator':
        return <CSSGridGenerator />;
      case 'css-flexbox-generator':
        return <CSSFlexboxGenerator />;
      case 'css-formatter':
        return <CSSFormatter />;
      case 'css-animation-generator':
        return <CSSAnimationGenerator />;
      case 'css-minifier':
        return <CSSMinifier />;
      case 'gradient-text-generator':
        return <GradientTextGenerator />;
      case 'css-box-shadow':
        return <CSSBoxShadowGenerator />;
      case 'css-clip-path':
        return <CSSClipPathGenerator />;
      case 'css-border-radius':
        return <CSSBorderRadiusGenerator />;
      case 'js-formatter':
        return <JavaScriptFormatter />;
      case 'html-formatter':
        return <HTMLFormatter />;
      case 'sql-formatter':
        return <SQLFormatter />;
      case 'xml-formatter':
        return <XMLFormatter />;
      case 'yaml-formatter':
        return <YAMLFormatter />;
      case 'image-compressor':
        return <ImageCompressor />;
      case 'image-resizer':
        return <ImageResizer />;
      case 'image-format-converter':
        return <ImageFormatConverter />;
      case 'favicon-generator':
        return <FaviconGenerator />;
      case 'image-cropper':
        return <ImageCropper />;
      case 'svg-optimizer':
        return <SVGOptimizer />;
      case 'image-filter':
        return <ImageFilter />;
      case 'image-placeholder':
        return <ImagePlaceholderGenerator />;
      case 'image-metadata-viewer':
        return <ImageMetadataViewer />;
      case 'css-gradient-generator':
        return <CSSGradientGenerator />;
      case 'meta-tag-generator':
        return <MetaTagGenerator />;
      case 'sitemap-generator':
        return <SitemapGenerator />;
      case 'robots-txt-generator':
        return <RobotsTxtGenerator />;
      case 'color-palette-generator':
        return <ColorPaletteGenerator />;
      case 'color-converter':
        return <ColorConverter />;
      case 'contrast-checker':
        return <ContrastChecker />;
      case 'social-media-resizer':
        return <SocialMediaResizer />;
      case 'hashtag-generator':
        return <HashtagGenerator />;
      case 'url-shortener':
        return <URLShortener />;
      case 'email-validator':
        return <EmailValidator />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'lorem-pixel':
        return <ImagePlaceholderGenerator />;
      case 'whois-lookup':
        return <WHOISLookup />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="p-12 bg-muted/30 rounded-lg border border-border">
              <tool.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-medium mb-3">Tool Available Soon</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                This tool is being actively developed and will be available shortly.
              </p>
              <Link to="/tools">
                <Button variant="outline" size="sm">
                  Browse Other Tools
                </Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/tools">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-neon">
                <tool.icon className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
                <p className="text-xl text-muted-foreground mb-4 max-w-2xl">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{tool.category}</Badge>
                  {tool.subcategory && (
                    <Badge variant="outline">{tool.subcategory}</Badge>
                  )}
                  {tool.popular && (
                    <Badge className="bg-gradient-primary text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{tool.rating}</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{tool.usage}</div>
                  <div className="text-sm text-muted-foreground">Uses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">Free</div>
                  <div className="text-sm text-muted-foreground">Price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="py-8">
        {renderToolComponent()}
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Related <span className="text-primary">Tools</span>
              </h2>
              <p className="text-muted-foreground">
                Other tools in the {tool.category} category
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {relatedTools.map((relatedTool) => (
                <ToolCard
                  key={relatedTool.id}
                  id={relatedTool.id}
                  name={relatedTool.name}
                  description={relatedTool.description}
                  category={relatedTool.category}
                  icon={<relatedTool.icon className="h-6 w-6 text-white" />}
                  popular={relatedTool.popular}
                  rating={relatedTool.rating}
                  usage={relatedTool.usage}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to={`/categories/${tool.category.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button variant="outline">
                  View All {tool.category}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolDetail;