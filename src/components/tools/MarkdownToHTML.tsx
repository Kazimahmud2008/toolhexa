import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eye, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MarkdownToHTML = () => {
  const [markdown, setMarkdown] = useState(`# Sample Markdown

## Introduction
This is a **sample** markdown text with:

- *Italic text*
- **Bold text**
- [Links](https://example.com)
- \`Code snippets\`

### Code Block
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> This is a blockquote

| Table | Example |
|-------|---------|
| Cell 1| Cell 2  |
| Cell 3| Cell 4  |`);
  
  const [html, setHtml] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const convertToHTML = () => {
    // Simple markdown to HTML converter
    let htmlOutput = markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/`([^`]*)`/gim, '<code>$1</code>')
      .replace(/```([^`]*)```/gims, '<pre><code>$1</code></pre>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/(\n<li>.*<\/li>\n)/gims, '<ul>$1</ul>')
      .replace(/\n/g, '<br />');

    // Basic table support
    const tableRegex = /\|(.*?)\|/g;
    htmlOutput = htmlOutput.replace(/(\|.*?\|(?:\n\|.*?\|)*)/g, (match) => {
      const rows = match.trim().split('\n');
      if (rows.length < 2) return match;
      
      const headerRow = rows[0].split('|').filter(cell => cell.trim()).map(cell => `<th>${cell.trim()}</th>`).join('');
      const bodyRows = rows.slice(2).map(row => {
        const cells = row.split('|').filter(cell => cell.trim()).map(cell => `<td>${cell.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      
      return `<table border="1"><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table>`;
    });

    setHtml(htmlOutput);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    toast({
      title: "Copied!",
      description: "HTML has been copied to clipboard",
    });
  };

  const clearAll = () => {
    setMarkdown('');
    setHtml('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Markdown to HTML Converter</h1>
        <p className="text-muted-foreground">
          Convert Markdown text to HTML with live preview
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Markdown Input
            </CardTitle>
            <CardDescription>
              Enter your Markdown text here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Enter Markdown text..."
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={convertToHTML} className="flex-1">
                Convert to HTML
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              HTML Output
            </CardTitle>
            <CardDescription>
              Generated HTML code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={html}
              readOnly
              placeholder="HTML output will appear here..."
              className="min-h-[400px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} disabled={!html} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy HTML
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowPreview(!showPreview)}
                disabled={!html}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      {showPreview && html && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              HTML Preview
            </CardTitle>
            <CardDescription>
              Live preview of the generated HTML
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none border rounded-lg p-4 bg-muted/30"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarkdownToHTML;