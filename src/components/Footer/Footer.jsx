import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../index';

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 text-slate-400">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Logo width="100px" />
            <p className="text-sm mt-4 text-slate-500">
              © {new Date().getFullYear()} MyBlog. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-slate-200 font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-indigo-400 transition" to="/">Features</Link></li>
              <li><Link className="hover:text-indigo-400 transition" to="/">Pricing</Link></li>
              <li><Link className="hover:text-indigo-400 transition" to="/">Affiliate Program</Link></li>
              <li><Link className="hover:text-indigo-400 transition" to="/">Press Kit</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-200 font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-indigo-400 transition" to="/">Account</Link></li>
              <li><Link className="hover:text-indigo-400 transition" to="/">Help</Link></li>
              <li><Link className="hover:text-indigo-400 transition" to="/">Contact Us</Link></li>
              <li><Link className="hover:text-indigo-400 transition" to="/">Customer Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-200 font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-indigo-400 transition" to="/">Terms & Conditions</Link></li>
              <li><Link className="hover:text-indigo-400 transition" to="/">Privacy Policy</Link></li>
              <li><Link className="hover:text-indigo-400 transition" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
