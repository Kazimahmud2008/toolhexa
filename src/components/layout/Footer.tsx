import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Tools: [
      { name: 'JSON Formatter', href: '/tools/json-formatter' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
      { name: 'URL Encoder', href: '/tools/url-encoder' },
      { name: 'Hash Generator', href: '/tools/hash-generator' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Products', href: '/products' },
    ],
    Resources: [
      { name: 'All Tools', href: '/tools' },
      { name: 'Categories', href: '/categories' },
      { name: 'Support', href: '/contact' },
      { name: 'Documentation', href: '/about' },
    ],
  };

  return (
    <footer className="bg-gradient-card border-t border-border/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <span className="text-3xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                ToolVibe
              </span>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-md leading-relaxed font-medium">
              The ultimate collection of free online developer tools. 
              Built with care for the developer community worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@toolvibe.dev"
                className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-display font-semibold text-foreground mb-6">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-muted-foreground font-medium">
              <span>&copy; {currentYear} ToolVibe. Made with</span>
              <Heart className="h-4 w-4 text-primary mx-2" />
              <span>for developers.</span>
            </div>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;