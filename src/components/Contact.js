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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please include a message.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'efbbba57-d18f-424b-9d2f-a66aa61808db',
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
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
            {contactData.heading}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {contactData.subheading}
          </p>
          <div className="section-divider w-20 mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Column — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-medium text-zinc-100 mb-2">
                {contactData.leftHeading}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {contactData.leftBody}
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-zinc-400 hover:text-zinc-200 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center group-hover:border-zinc-500 transition-colors">
                  <FaEnvelope className="text-zinc-300" size={14} />
                </div>
                <span className="text-sm">{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-3 text-zinc-400">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center">
                  <FaPhone className="text-zinc-300" size={13} />
                </div>
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center">
                  <FaLocationDot className="text-zinc-300" size={14} />
                </div>
                <span className="text-sm">{personalInfo.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2.5 pt-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || FaGithub;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-lg surface-card flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} noValidate className="surface-card rounded-xl p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full px-3.5 py-2.5 bg-zinc-950/60 border rounded-lg text-sm text-zinc-100 placeholder-zinc-600 transition-all ${
                    errors.name
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-zinc-800 focus:border-zinc-500'
                  }`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-3.5 py-2.5 bg-zinc-950/60 border rounded-lg text-sm text-zinc-100 placeholder-zinc-600 transition-all ${
                    errors.email
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-zinc-800 focus:border-zinc-500'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  className={`w-full px-3.5 py-2.5 bg-zinc-950/60 border rounded-lg text-sm text-zinc-100 placeholder-zinc-600 transition-all resize-none ${
                    errors.message
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-zinc-800 focus:border-zinc-500'
                  }`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full px-5 py-3 rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white font-medium text-sm transition-all disabled:opacity-50"
              >
                {status === 'idle' && 'Send Message'}
                {status === 'submitting' && 'Sending...'}
                {status === 'success' && '✓ Message Sent'}
                {status === 'error' && 'Failed to Send (Please Try Again)'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
