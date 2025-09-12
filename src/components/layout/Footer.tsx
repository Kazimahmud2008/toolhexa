import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Popular Tools': [
      { name: 'JSON Formatter', href: '/tools/json-formatter' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
      { name: 'Color Picker', href: '/tools/color-picker' },
      { name: 'Password Generator', href: '/tools/password-generator' },
    ],
    'Categories': [
      { name: 'Text Tools', href: '/categories/text' },
      { name: 'Image Tools', href: '/categories/image' },
      { name: 'CSS Tools', href: '/categories/css' },
      { name: 'Color Tools', href: '/categories/color' },
    ],
    'Resources': [
      { name: 'Home', href: '/' },
      { name: 'All Tools', href: '/tools' },
      { name: 'Browse Categories', href: '/categories' },
      { name: 'Products', href: '/products' },
      { name: 'Blog', href: '/blog' },
    ],
  } as const;

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-display font-bold text-primary">
                Toolhexa
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Professional developer tools for modern workflows. Fast, secure, and always free.
            </p>
            <div className="flex space-x-3">
              <a
                href="mailto:hello@toolhexa.dev"
                className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
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
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center text-muted-foreground">
              <span>&copy; {currentYear} Toolhexa. Made with</span>
              <Heart className="h-3 w-3 text-primary mx-1 fill-current" />
              <span>for developers</span>
            </div>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <span className="text-muted-foreground">Privacy Policy</span>
              <span className="text-muted-foreground">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;