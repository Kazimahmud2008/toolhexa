import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from '@/components/SEOHead';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found (404) - Toolhexa"
        description="The page you’re looking for doesn’t exist. Explore our developer tools, categories, and blog to find what you need."
        canonicalUrl={location.pathname}
        noIndex={true}
        keywords={["404", "not found", "toolhexa", "developer tools"]}
      />
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-2xl text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn’t find the page you requested. This may happen if the URL was
            mistyped, the content was moved, or the page never existed. You can use
            the links below to continue browsing. Toolhexa offers 55+ fast, secure,
            browser-based utilities for formatting data, generating CSS, optimizing images,
            and more — all free and privacy-friendly. Start from our main directories
            or jump straight into popular tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link to="/" className="text-primary hover:underline">Home</Link>
            <span className="hidden sm:block">•</span>
            <Link to="/tools" className="text-primary hover:underline">All Tools</Link>
            <span className="hidden sm:block">•</span>
            <Link to="/categories" className="text-primary hover:underline">Browse Categories</Link>
            <span className="hidden sm:block">•</span>
            <Link to="/blog" className="text-primary hover:underline">Developer Blog</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please try refreshing the page or
            return to the homepage and navigate using the menu.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
