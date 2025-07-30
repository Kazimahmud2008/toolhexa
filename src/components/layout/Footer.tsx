import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Tools: [
      { name: 'Text Tools', href: '/categories/text' },
      { name: 'Image Tools', href: '/categories/image' },
      { name: 'CSS Tools', href: '/categories/css' },
      { name: 'JSON Tools', href: '/categories/coding' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    Resources: [
      { name: 'All Tools', href: '/tools' },
      { name: 'Categories', href: '/categories' },
      { name: 'Popular Tools', href: '/popular' },
      { name: 'API Docs', href: '/api' },
    ],
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-neon">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold neon-text">ToolVibe</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              The ultimate collection of free online developer tools. 
              Build, format, convert, and optimize your code with our 
              lightning-fast utilities.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="mailto:hello@toolvibe.dev"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
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
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} ToolVibe. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/sitemap"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;