import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Audio Visuals', href: '/#avs' },
        { name: 'Get Involved', href: '/#support' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Updates', href: '/updates' },
        { name: 'Contact', href: '/contact' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'http://www.facebook.com/pitachoraforest', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
   
  ];

  return (
    <footer className="bg-white text-gray-700 pt-16 pb-8 border-t border-gray-100 font-geograph">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#0a2e1f]">Pittachhara Trust</h3>
            <p className="text-gray-600">
            Pittachhara Trust undertakes native tree enrichment, stream restoration, and habitat protection to rebuild ecological connectivity.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0a2e1f]">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-[#f6b417] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0a2e1f]">
              Newsletter
            </h4>
            <p className="mt-4 text-gray-600">Subscribe to our newsletter for the latest updates.</p>
            
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} Pittachhara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
