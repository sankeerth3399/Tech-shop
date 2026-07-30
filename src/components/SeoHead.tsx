import React, { useEffect } from 'react';
import { businessInfo } from '../data/storeData';

interface SeoProps {
  title?: string;
  description?: string;
}

export const SeoHead: React.FC<SeoProps> = ({
  title = `${businessInfo.name} | Best Stationery & Online Digital Services in Dammaiguda, Hyderabad`,
  description = `${businessInfo.name} offers high quality stationery, notebooks, xerox, color printing, document scanning, lamination, spiral binding, passport photos, Aadhar/PAN card assistance, and online form filling in Dammaiguda, Hyderabad. Call +91 9866094840.`,
}) => {
  useEffect(() => {
    document.title = title;

    // Update meta tags dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // JSON-LD LocalBusiness Schema
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': businessInfo.name,
      'image': 'https://srisairama.pages.dev/og-image.jpg',
      'telephone': businessInfo.phoneFormatted,
      'email': businessInfo.email,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Plot No.1, Ayyappa Colony, Dammaiguda',
        'addressLocality': 'Hyderabad',
        'addressRegion': 'Telangana',
        'postalCode': '500083',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 17.4938,
        'longitude': 78.5835
      },
      'url': 'https://wa.me/919866094840',
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '08:00',
          'closes': '21:30'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Sunday',
          'opens': '09:00',
          'closes': '14:00'
        }
      ],
      'priceRange': '₹'
    };

    let scriptTag = document.getElementById('json-ld-localbusiness');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-localbusiness';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [title, description]);

  return null;
};
