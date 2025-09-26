import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
}

const SEOHead = ({ 
  title, 
  description, 
  canonicalUrl, 
  ogImage = 'https://toolhexa.vercel.app/og-image.jpg',
  ogType = 'website',
  keywords = [],
  noIndex = false
}: SEOHeadProps) => {
  const siteUrl = 'https://toolhexa.vercel.app';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  // Truncate title and description for optimal SEO
  const truncatedTitle = title.length > 58 ? title.substring(0, 55) + '...' : title;
  const truncatedDescription = description.length > 158 ? description.substring(0, 155) + '...' : description;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{truncatedTitle}</title>
      <meta name="title" content={truncatedTitle} />
      <meta name="description" content={truncatedDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={truncatedTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${truncatedTitle} - Toolhexa`} />
      <meta property="og:site_name" content="Toolhexa" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={truncatedTitle} />
      <meta property="twitter:description" content={truncatedDescription} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:image:alt" content={`${truncatedTitle} - Toolhexa`} />
      <meta property="twitter:site" content="@toolhexa" />
      <meta property="twitter:creator" content="@toolhexa" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="author" content="Toolhexa" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Toolhexa",
          "url": siteUrl,
          "description": "Professional developer tools for modern workflows. Fast, secure, and always free.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/tools?search={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      {/* Article structured data for blog posts */}
      {ogType === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": truncatedTitle,
            "description": truncatedDescription,
            "image": ogImage,
            "url": fullCanonicalUrl,
            "datePublished": new Date().toISOString(),
            "dateModified": new Date().toISOString(),
            "author": {
              "@type": "Organization",
              "name": "Toolhexa"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Toolhexa",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
              }
            }
          })}
        </script>
      )}
      
      {/* Tool structured data */}
      {canonicalUrl && canonicalUrl.startsWith('/tools/') && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": truncatedTitle,
            "description": truncatedDescription,
            "url": fullCanonicalUrl,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Organization",
              "name": "Toolhexa"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;