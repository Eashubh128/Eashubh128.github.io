'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { personalInfo, navLinks, socialLinks } from '@/lib/data';
import {
  FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaEnvelope,
} from 'react-icons/fa6';
import VisitorCounter from './VisitorCounter';
import AdminPanel from './admin/AdminPanel';

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaEnvelope,
};

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (clickCount > 0 && clickCount < 10) {
      const timer = setTimeout(() => setClickCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleCopyrightClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 10) {
        setShowAdmin(true);
        return 0;
      }
      return newCount;
    });
  };

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative border-t border-zinc-900 py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-1.5">
              <span className="text-sm font-semibold tracking-tight text-zinc-200 font-mono">
                &lt;{personalInfo.firstName} /&gt;
              </span>
              <p
                className="text-xs text-zinc-500 cursor-default select-none"
                onClick={handleCopyrightClick}
              >
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
              <VisitorCounter />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || FaGithub;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-lg surface-card flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              aria-label="Back to top"
              className="fixed bottom-6 right-6 w-10 h-10 rounded-lg surface-card text-zinc-400 hover:text-zinc-100 flex items-center justify-center shadow-lg transition-colors z-40"
            >
              <FaArrowUp size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </footer>
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </>
  );
}
