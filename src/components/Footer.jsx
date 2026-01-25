import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO, NAV_ITEMS, SOCIAL_LINKS } from '../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-gray-800 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-3xl font-bold">
              <span className="text-yellow-400">R</span>
              <span className="text-white">.</span>
            </div>
            <p className="text-gray-400 text-sm">
              Building fast, reliable and 
              <span> user-friendly web experiences.</span>
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon === 'Github' ? Github : link.icon === 'Linkedin' ? Linkedin : Mail;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
            {NAV_ITEMS
            .map((item) => (
            <li key={item.name}>
            <Link
            to={item.path}
            className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
            >
            {item.name}
          </Link>
        </li>
      ))}
  </ul>
</div>


          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Full Stack Development</li>
              <li>Backend APIs</li>
              <li>Frontend Development</li>
              <li>Cloud Deployment</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </li>
              <li>Bilaspur, Chhattisgarh, India</li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-block px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart size={16} className="text-red-500" fill="currentColor" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;