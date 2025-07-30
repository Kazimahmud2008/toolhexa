import { 
  Code, FileText, Palette, Image, Wrench, Share2, Calculator,
  Hash, Key, Timer, Gauge, Download, Upload, Copy, Eye,
  Zap, Shield, Lock, Unlock, RefreshCw, Search, Filter,
  Type, FileImage, PaintBucket, Layers, Globe, Smartphone,
  Monitor, Tablet, Settings, Database, Server, Cloud,
  GitBranch, Package, Terminal, FileCode, Brackets,
  Variable, Merge, Split
} from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  icon: any;
  popular: boolean;
  rating: number;
  usage: string;
  keywords: string[];
  path: string;
}

export const tools: Tool[] = [
  // Text Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data with syntax highlighting and error detection.',
    category: 'Text Tools',
    subcategory: 'JSON',
    icon: Brackets,
    popular: true,
    rating: 4.9,
    usage: '50.2K',
    keywords: ['json', 'format', 'validate', 'pretty print', 'minify'],
    path: '/tools/json-formatter'
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode text to/from Base64 format safely and quickly.',
    category: 'Text Tools',
    subcategory: 'Encoding',
    icon: Code,
    popular: true,
    rating: 4.8,
    usage: '45.1K',
    keywords: ['base64', 'encode', 'decode', 'text', 'binary'],
    path: '/tools/base64-encoder'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for safe transmission over the internet.',
    category: 'Text Tools',
    subcategory: 'Encoding',
    icon: Globe,
    popular: false,
    rating: 4.7,
    usage: '32.5K',
    keywords: ['url', 'encode', 'decode', 'percent', 'uri'],
    path: '/tools/url-encoder'
  },
  {
    id: 'html-encoder',
    name: 'HTML Encoder/Decoder',
    description: 'Encode and decode HTML entities and special characters.',
    category: 'Text Tools',
    subcategory: 'Encoding',
    icon: FileCode,
    popular: false,
    rating: 4.6,
    usage: '28.3K',
    keywords: ['html', 'encode', 'decode', 'entities', 'escape'],
    path: '/tools/html-encoder'
  },
  {
    id: 'markdown-to-html',
    name: 'Markdown to HTML',
    description: 'Convert Markdown text to HTML with live preview.',
    category: 'Text Tools',
    subcategory: 'Conversion',
    icon: FileText,
    popular: true,
    rating: 4.8,
    usage: '41.7K',
    keywords: ['markdown', 'html', 'convert', 'preview', 'parser'],
    path: '/tools/markdown-to-html'
  },
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    description: 'Convert text between different cases: uppercase, lowercase, title case, etc.',
    category: 'Text Tools',
    subcategory: 'Formatting',
    icon: Type,
    popular: false,
    rating: 4.5,
    usage: '25.9K',
    keywords: ['text', 'case', 'uppercase', 'lowercase', 'title', 'camel'],
    path: '/tools/text-case-converter'
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, paragraphs, and reading time in your text.',
    category: 'Text Tools',
    subcategory: 'Analysis',
    icon: Hash,
    popular: false,
    rating: 4.6,
    usage: '22.1K',
    keywords: ['word', 'count', 'characters', 'paragraphs', 'reading time'],
    path: '/tools/word-counter'
  },
  {
    id: 'text-diff',
    name: 'Text Diff Checker',
    description: 'Compare two texts and highlight the differences between them.',
    category: 'Text Tools',
    subcategory: 'Comparison',
    icon: Merge,
    popular: false,
    rating: 4.7,
    usage: '18.5K',
    keywords: ['text', 'diff', 'compare', 'difference', 'merge'],
    path: '/tools/text-diff'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regular expressions with real-time matching.',
    category: 'Text Tools',
    subcategory: 'Testing',
    icon: Search,
    popular: true,
    rating: 4.9,
    usage: '35.8K',
    keywords: ['regex', 'regular expression', 'pattern', 'match', 'test'],
    path: '/tools/regex-tester'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs and mockups.',
    category: 'Text Tools',
    subcategory: 'Generation',
    icon: FileText,
    popular: false,
    rating: 4.4,
    usage: '19.3K',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'generator'],
    path: '/tools/lorem-ipsum'
  },

  // Image Tools
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images while maintaining aspect ratio and quality.',
    category: 'Image Tools',
    subcategory: 'Editing',
    icon: Image,
    popular: true,
    rating: 4.8,
    usage: '38.9K',
    keywords: ['image', 'resize', 'scale', 'dimensions', 'aspect ratio'],
    path: '/tools/image-resizer'
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress images to reduce file size without losing quality.',
    category: 'Image Tools',
    subcategory: 'Optimization',
    icon: Download,
    popular: true,
    rating: 4.7,
    usage: '42.1K',
    keywords: ['image', 'compress', 'optimize', 'file size', 'quality'],
    path: '/tools/image-compressor'
  },
  {
    id: 'image-format-converter',
    name: 'Image Format Converter',
    description: 'Convert images between different formats: JPG, PNG, WebP, etc.',
    category: 'Image Tools',
    subcategory: 'Conversion',
    icon: RefreshCw,
    popular: false,
    rating: 4.6,
    usage: '29.7K',
    keywords: ['image', 'convert', 'format', 'jpg', 'png', 'webp'],
    path: '/tools/image-format-converter'
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    description: 'Crop images to specific dimensions or aspect ratios.',
    category: 'Image Tools',
    subcategory: 'Editing',
    icon: Layers,
    popular: false,
    rating: 4.5,
    usage: '24.6K',
    keywords: ['image', 'crop', 'trim', 'dimensions', 'aspect'],
    path: '/tools/image-cropper'
  },
  {
    id: 'image-filter',
    name: 'Image Filter',
    description: 'Apply various filters and effects to your images.',
    category: 'Image Tools',
    subcategory: 'Effects',
    icon: Filter,
    popular: false,
    rating: 4.4,
    usage: '21.8K',
    keywords: ['image', 'filter', 'effect', 'brightness', 'contrast'],
    path: '/tools/image-filter'
  },

  // CSS Tools
  {
    id: 'css-formatter',
    name: 'CSS Formatter',
    description: 'Format and beautify CSS code with proper indentation.',
    category: 'CSS Tools',
    subcategory: 'Formatting',
    icon: PaintBucket,
    popular: true,
    rating: 4.8,
    usage: '33.2K',
    keywords: ['css', 'format', 'beautify', 'minify', 'compress'],
    path: '/tools/css-formatter'
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    description: 'Minify CSS code to reduce file size for production.',
    category: 'CSS Tools',
    subcategory: 'Optimization',
    icon: Package,
    popular: false,
    rating: 4.7,
    usage: '27.5K',
    keywords: ['css', 'minify', 'compress', 'optimize', 'production'],
    path: '/tools/css-minifier'
  },
  {
    id: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    description: 'Create beautiful CSS gradients with live preview.',
    category: 'CSS Tools',
    subcategory: 'Generation',
    icon: Palette,
    popular: true,
    rating: 4.9,
    usage: '45.3K',
    keywords: ['css', 'gradient', 'linear', 'radial', 'colors'],
    path: '/tools/css-gradient-generator'
  },
  {
    id: 'css-box-shadow',
    name: 'CSS Box Shadow Generator',
    description: 'Generate CSS box shadows with interactive controls.',
    category: 'CSS Tools',
    subcategory: 'Generation',
    icon: Layers,
    popular: false,
    rating: 4.6,
    usage: '23.9K',
    keywords: ['css', 'box shadow', 'shadow', 'effect', 'generator'],
    path: '/tools/css-box-shadow'
  },
  {
    id: 'css-border-radius',
    name: 'CSS Border Radius Generator',
    description: 'Create custom border radius with visual preview.',
    category: 'CSS Tools',
    subcategory: 'Generation',
    icon: Settings,
    popular: false,
    rating: 4.5,
    usage: '19.7K',
    keywords: ['css', 'border radius', 'rounded', 'corners', 'generator'],
    path: '/tools/css-border-radius'
  },

  // Coding Tools
  {
    id: 'html-formatter',
    name: 'HTML Formatter',
    description: 'Format and beautify HTML code with proper indentation.',
    category: 'Coding Tools',
    subcategory: 'Formatting',
    icon: FileCode,
    popular: false,
    rating: 4.7,
    usage: '31.4K',
    keywords: ['html', 'format', 'beautify', 'indent', 'clean'],
    path: '/tools/html-formatter'
  },
  {
    id: 'js-formatter',
    name: 'JavaScript Formatter',
    description: 'Format and beautify JavaScript code with syntax highlighting.',
    category: 'Coding Tools',
    subcategory: 'Formatting',
    icon: Terminal,
    popular: true,
    rating: 4.8,
    usage: '39.6K',
    keywords: ['javascript', 'js', 'format', 'beautify', 'minify'],
    path: '/tools/js-formatter'
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries with proper formatting.',
    category: 'Coding Tools',
    subcategory: 'Formatting',
    icon: Database,
    popular: false,
    rating: 4.6,
    usage: '26.8K',
    keywords: ['sql', 'format', 'query', 'database', 'beautify'],
    path: '/tools/sql-formatter'
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and validate XML documents with syntax highlighting.',
    category: 'Coding Tools',
    subcategory: 'Formatting',
    icon: FileCode,
    popular: false,
    rating: 4.5,
    usage: '18.2K',
    keywords: ['xml', 'format', 'validate', 'beautify', 'syntax'],
    path: '/tools/xml-formatter'
  },
  {
    id: 'yaml-formatter',
    name: 'YAML Formatter',
    description: 'Format and validate YAML files with error detection.',
    category: 'Coding Tools',
    subcategory: 'Formatting',
    icon: FileText,
    popular: false,
    rating: 4.6,
    usage: '22.1K',
    keywords: ['yaml', 'format', 'validate', 'config', 'data'],
    path: '/tools/yaml-formatter'
  },

  // Color Tools
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and get values in different formats (HEX, RGB, HSL).',
    category: 'Color Tools',
    subcategory: 'Selection',
    icon: Palette,
    popular: true,
    rating: 4.9,
    usage: '48.7K',
    keywords: ['color', 'picker', 'hex', 'rgb', 'hsl', 'palette'],
    path: '/tools/color-picker'
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert colors between different formats and color spaces.',
    category: 'Color Tools',
    subcategory: 'Conversion',
    icon: RefreshCw,
    popular: false,
    rating: 4.7,
    usage: '34.5K',
    keywords: ['color', 'convert', 'hex', 'rgb', 'hsl', 'cmyk'],
    path: '/tools/color-converter'
  },
  {
    id: 'color-palette-generator',
    name: 'Color Palette Generator',
    description: 'Generate beautiful color palettes for your designs.',
    category: 'Color Tools',
    subcategory: 'Generation',
    icon: PaintBucket,
    popular: true,
    rating: 4.8,
    usage: '41.3K',
    keywords: ['color', 'palette', 'scheme', 'harmony', 'generator'],
    path: '/tools/color-palette-generator'
  },
  {
    id: 'contrast-checker',
    name: 'Color Contrast Checker',
    description: 'Check color contrast ratios for accessibility compliance.',
    category: 'Color Tools',
    subcategory: 'Accessibility',
    icon: Eye,
    popular: false,
    rating: 4.6,
    usage: '27.9K',
    keywords: ['color', 'contrast', 'accessibility', 'wcag', 'ratio'],
    path: '/tools/contrast-checker'
  },

  // Social Media Tools
  {
    id: 'social-media-resizer',
    name: 'Social Media Image Resizer',
    description: 'Resize images for different social media platforms.',
    category: 'Social Media Tools',
    subcategory: 'Images',
    icon: Smartphone,
    popular: true,
    rating: 4.8,
    usage: '36.4K',
    keywords: ['social media', 'resize', 'instagram', 'facebook', 'twitter'],
    path: '/tools/social-media-resizer'
  },
  {
    id: 'hashtag-generator',
    name: 'Hashtag Generator',
    description: 'Generate relevant hashtags for your social media posts.',
    category: 'Social Media Tools',
    subcategory: 'Content',
    icon: Hash,
    popular: false,
    rating: 4.5,
    usage: '23.7K',
    keywords: ['hashtag', 'social media', 'tags', 'instagram', 'twitter'],
    path: '/tools/hashtag-generator'
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for URLs, text, and contact information.',
    category: 'Social Media Tools',
    subcategory: 'Generation',
    icon: Package,
    popular: true,
    rating: 4.9,
    usage: '52.1K',
    keywords: ['qr code', 'generator', 'url', 'text', 'contact'],
    path: '/tools/qr-code-generator'
  },

  // Miscellaneous Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable options.',
    category: 'Miscellaneous Tools',
    subcategory: 'Security',
    icon: Key,
    popular: true,
    rating: 4.9,
    usage: '61.2K',
    keywords: ['password', 'generator', 'secure', 'random', 'strength'],
    path: '/tools/password-generator'
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA1, SHA256, and other hash values.',
    category: 'Miscellaneous Tools',
    subcategory: 'Security',
    icon: Shield,
    popular: false,
    rating: 4.7,
    usage: '29.8K',
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'checksum'],
    path: '/tools/hash-generator'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate unique identifiers (UUIDs) in different versions.',
    category: 'Miscellaneous Tools',
    subcategory: 'Generation',
    icon: Key,
    popular: false,
    rating: 4.6,
    usage: '25.3K',
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'generator'],
    path: '/tools/uuid-generator'
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates.',
    category: 'Miscellaneous Tools',
    subcategory: 'Conversion',
    icon: Timer,
    popular: false,
    rating: 4.8,
    usage: '33.7K',
    keywords: ['timestamp', 'unix', 'date', 'time', 'converter'],
    path: '/tools/timestamp-converter'
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    description: 'Create short URLs for easy sharing and tracking.',
    category: 'Miscellaneous Tools',
    subcategory: 'URLs',
    icon: Globe,
    popular: true,
    rating: 4.7,
    usage: '44.9K',
    keywords: ['url', 'shortener', 'link', 'short', 'redirect'],
    path: '/tools/url-shortener'
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement.',
    category: 'Miscellaneous Tools',
    subcategory: 'Conversion',
    icon: Calculator,
    popular: false,
    rating: 4.5,
    usage: '21.6K',
    keywords: ['unit', 'converter', 'measurement', 'length', 'weight'],
    path: '/tools/unit-converter'
  },
  {
    id: 'lorem-pixel',
    name: 'Lorem Pixel Generator',
    description: 'Generate placeholder images with custom dimensions.',
    category: 'Miscellaneous Tools',
    subcategory: 'Images',
    icon: FileImage,
    popular: false,
    rating: 4.4,
    usage: '18.9K',
    keywords: ['lorem', 'pixel', 'placeholder', 'image', 'generator'],
    path: '/tools/lorem-pixel'
  },

  // Additional Tools to reach 50
  {
    id: 'css-animation-generator',
    name: 'CSS Animation Generator',
    description: 'Create CSS animations with keyframes and timing functions.',
    category: 'CSS Tools',
    subcategory: 'Animation',
    icon: Zap,
    popular: false,
    rating: 4.7,
    usage: '31.2K',
    keywords: ['css', 'animation', 'keyframes', 'transition', 'transform'],
    path: '/tools/css-animation-generator'
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV Converter',
    description: 'Convert JSON data to CSV format for spreadsheet import.',
    category: 'Text Tools',
    subcategory: 'Conversion',
    icon: RefreshCw,
    popular: false,
    rating: 4.6,
    usage: '26.8K',
    keywords: ['json', 'csv', 'convert', 'data', 'spreadsheet'],
    path: '/tools/json-to-csv'
  },
  {
    id: 'svg-optimizer',
    name: 'SVG Optimizer',
    description: 'Optimize SVG files by removing unnecessary code and reducing file size.',
    category: 'Image Tools',
    subcategory: 'Optimization',
    icon: Package,
    popular: false,
    rating: 4.5,
    usage: '22.4K',
    keywords: ['svg', 'optimize', 'minify', 'compress', 'vector'],
    path: '/tools/svg-optimizer'
  },
  {
    id: 'email-validator',
    name: 'Email Validator',
    description: 'Validate email addresses for format and domain correctness.',
    category: 'Miscellaneous Tools',
    subcategory: 'Validation',
    icon: Shield,
    popular: false,
    rating: 4.6,
    usage: '29.1K',
    keywords: ['email', 'validate', 'verification', 'format', 'domain'],
    path: '/tools/email-validator'
  },
  {
    id: 'css-flexbox-generator',
    name: 'CSS Flexbox Generator',
    description: 'Generate CSS flexbox layouts with visual controls.',
    category: 'CSS Tools',
    subcategory: 'Layout',
    icon: Layers,
    popular: true,
    rating: 4.8,
    usage: '37.5K',
    keywords: ['css', 'flexbox', 'layout', 'flex', 'responsive'],
    path: '/tools/css-flexbox-generator'
  },
  {
    id: 'image-metadata-viewer',
    name: 'Image Metadata Viewer',
    description: 'View and extract metadata information from image files.',
    category: 'Image Tools',
    subcategory: 'Analysis',
    icon: Eye,
    popular: false,
    rating: 4.4,
    usage: '19.7K',
    keywords: ['image', 'metadata', 'exif', 'information', 'viewer'],
    path: '/tools/image-metadata-viewer'
  },
  {
    id: 'youtube-thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    description: 'Download YouTube video thumbnails in various resolutions.',
    category: 'Social Media Tools',
    subcategory: 'Download',
    icon: Download,
    popular: true,
    rating: 4.7,
    usage: '43.2K',
    keywords: ['youtube', 'thumbnail', 'download', 'video', 'image'],
    path: '/tools/youtube-thumbnail-downloader'
  },
  {
    id: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Generate favicons in multiple sizes and formats from images.',
    category: 'Image Tools',
    subcategory: 'Generation',
    icon: Globe,
    popular: false,
    rating: 4.5,
    usage: '24.8K',
    keywords: ['favicon', 'icon', 'generator', 'website', 'browser'],
    path: '/tools/favicon-generator'
  },
  {
    id: 'whois-lookup',
    name: 'WHOIS Lookup',
    description: 'Look up domain registration and ownership information.',
    category: 'Miscellaneous Tools',
    subcategory: 'Network',
    icon: Search,
    popular: false,
    rating: 4.3,
    usage: '17.6K',
    keywords: ['whois', 'domain', 'lookup', 'registration', 'owner'],
    path: '/tools/whois-lookup'
  },
  {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Generate SEO meta tags for better search engine optimization.',
    category: 'Coding Tools',
    subcategory: 'SEO',
    icon: Globe,
    popular: false,
    rating: 4.6,
    usage: '28.9K',
    keywords: ['meta', 'tags', 'seo', 'optimization', 'html'],
    path: '/tools/meta-tag-generator'
  },
  {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    description: 'Generate robots.txt files for search engine crawling control.',
    category: 'Coding Tools',
    subcategory: 'SEO',
    icon: Shield,
    popular: false,
    rating: 4.4,
    usage: '21.3K',
    keywords: ['robots', 'txt', 'seo', 'crawling', 'search engine'],
    path: '/tools/robots-txt-generator'
  },
  {
    id: 'sitemap-generator',
    name: 'Sitemap Generator',
    description: 'Generate XML sitemaps for better search engine indexing.',
    category: 'Coding Tools',
    subcategory: 'SEO',
    icon: Globe,
    popular: false,
    rating: 4.5,
    usage: '23.7K',
    keywords: ['sitemap', 'xml', 'seo', 'indexing', 'search engine'],
    path: '/tools/sitemap-generator'
  },
  {
    id: 'css-grid-generator',
    name: 'CSS Grid Generator',
    description: 'Create CSS grid layouts with visual grid designer.',
    category: 'CSS Tools',
    subcategory: 'Layout',
    icon: Monitor,
    popular: true,
    rating: 4.9,
    usage: '41.8K',
    keywords: ['css', 'grid', 'layout', 'responsive', 'design'],
    path: '/tools/css-grid-generator'
  },
  {
    id: 'gradient-text-generator',
    name: 'Gradient Text Generator',
    description: 'Create beautiful gradient text effects with CSS.',
    category: 'CSS Tools',
    subcategory: 'Effects',
    icon: Type,
    popular: false,
    rating: 4.6,
    usage: '27.4K',
    keywords: ['gradient', 'text', 'css', 'effect', 'typography'],
    path: '/tools/gradient-text-generator'
  },
  {
    id: 'image-placeholder',
    name: 'Image Placeholder Generator',
    description: 'Generate placeholder images with custom text and colors.',
    category: 'Image Tools',
    subcategory: 'Generation',
    icon: FileImage,
    popular: false,
    rating: 4.4,
    usage: '20.1K',
    keywords: ['placeholder', 'image', 'generator', 'mockup', 'design'],
    path: '/tools/image-placeholder'
  },
  {
    id: 'css-clip-path',
    name: 'CSS Clip Path Generator',
    description: 'Create custom shapes using CSS clip-path property.',
    category: 'CSS Tools',
    subcategory: 'Effects',
    icon: Split,
    popular: false,
    rating: 4.5,
    usage: '22.9K',
    keywords: ['css', 'clip path', 'shapes', 'polygon', 'mask'],
    path: '/tools/css-clip-path'
  }
];

export const categories = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Process, format, and manipulate text data',
    icon: Type,
    count: tools.filter(t => t.category === 'Text Tools').length,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Edit, resize, and optimize images',
    icon: Image,
    count: tools.filter(t => t.category === 'Image Tools').length,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'css',
    name: 'CSS Tools',
    description: 'Generate and format CSS code',
    icon: PaintBucket,
    count: tools.filter(t => t.category === 'CSS Tools').length,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'coding',
    name: 'Coding Tools',
    description: 'Format and validate code',
    icon: Code,
    count: tools.filter(t => t.category === 'Coding Tools').length,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'color',
    name: 'Color Tools',
    description: 'Work with colors and palettes',
    icon: Palette,
    count: tools.filter(t => t.category === 'Color Tools').length,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'social',
    name: 'Social Media Tools',
    description: 'Tools for social media content',
    icon: Share2,
    count: tools.filter(t => t.category === 'Social Media Tools').length,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'misc',
    name: 'Miscellaneous Tools',
    description: 'Utilities and converters',
    icon: Wrench,
    count: tools.filter(t => t.category === 'Miscellaneous Tools').length,
    color: 'from-gray-500 to-slate-500'
  }
];

export const getToolsByCategory = (category: string) => {
  return tools.filter(tool => tool.category.toLowerCase().includes(category.toLowerCase()));
};

export const getPopularTools = () => {
  return tools.filter(tool => tool.popular).sort((a, b) => parseFloat(b.usage) - parseFloat(a.usage));
};

export const searchTools = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};