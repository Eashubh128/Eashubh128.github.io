'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaXTwitter, FaInstagram,
  FaEnvelope, FaPhone,
} from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { personalInfo, socialLinks, contactData } from '@/lib/data';

const iconMap = {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaEnvelope,
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    window.dispatchEvent(
      new CustomEvent('trigger-curve-swipe', {
        detail: {
          callback: async () => {
            try {
              const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify({
                  access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'bb35ad4a-81a1-4351-a9f8-5a48559196b2', // Fallback key or default
                  name: formData.name,
                  email: formData.email,
                  message: formData.message,
                  subject: `New Portfolio Message from ${formData.name}`,
                  from_name: 'Eashubh Portfolio',
                }),
              });
              const result = await response.json();
              if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 4000);
              } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 4000);
              }
            } catch {
              setStatus('error');
              setTimeout(() => setStatus('idle'), 4000);
            }
          },
        },
      })
    );
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] radial-glow pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{contactData.heading}</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {contactData.subheading}
          </p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left — Contact info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{contactData.leftHeading}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {contactData.leftBody}
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                  <FaEnvelope className="text-neon-purple" size={16} />
                </div>
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <FaPhone className="text-neon-blue" size={14} />
                </div>
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <FaLocationDot className="text-neon-cyan" size={16} />
                </div>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || FaGithub;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-white/5 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-white/5 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-dark-bg/50 border border-white/5 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status !== 'idle'}
                className="curve-swipe-btn border border-white/10 bg-white/5 w-full px-6 py-3.5 rounded-xl text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all disabled:opacity-50"
              >
                {status === 'idle' && 'Send Message'}
                {status === 'submitting' && 'Sending...'}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error' && '❌ Sending Failed (Try Again)'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
