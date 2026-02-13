import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-serif text-xl mb-3">IV</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Connecting startups with investors through data-driven insights and transparent company profiles.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Privacy & Cookies Policy
                </Link>
              </li>
              <li>
                <Link to="/copyright" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Copyright Dispute Policy
                </Link>
              </li>
              <li>
                <Link to="/dpa" className="text-neutral-400 hover:text-white text-sm transition-colors">
                  Data Processing Addendum
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="mailto:williamp2904@gmail.com" className="hover:text-white transition-colors">
                  williamp2904@gmail.com
                </a>
              </li>
              <li>3243 44TH APT 1F</li>
              <li>ASTORIA, NY 11103-2339</li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://instagram.com/IVinsights" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/ivholdings/about/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-neutral-800 text-center">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} IV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
