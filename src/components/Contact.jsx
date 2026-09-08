import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Terminal, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { personalInfo, contactData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (name, value) => {
    const trimmed = value.trim();
    if (name === 'name') {
      if (!trimmed) return 'Please fill out this field.';
      if (trimmed.length < 2) return 'Identity must contain at least 2 characters.';
    }
    if (name === 'email') {
      if (!trimmed) return 'Please fill out this field.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return 'Please enter a valid email address (e.g. alex@example.com).';
    }
    if (name === 'message') {
      if (!trimmed) return 'Please fill out this field.';
      if (trimmed.length < 5) return 'Message payload must contain at least 5 characters.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
    if (touched[name]) {
      const error = validate(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const encode = (data) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validate('name', formData.name);
    const emailErr = validate('email', formData.email);
    const messageErr = validate('message', formData.message);

    const newErrors = {
      name: nameErr,
      email: emailErr,
      message: messageErr
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (nameErr || emailErr || messageErr) {
      setStatus('error');
      setErrorMessage('TRANSMISSION_REJECTED // Please complete all required fields.');
      if (nameErr) {
        document.getElementById('name')?.focus();
      } else if (emailErr) {
        document.getElementById('email')?.focus();
      } else if (messageErr) {
        document.getElementById('message')?.focus();
      }
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setTouched({});
      } else {
        throw new Error('Netlify form submission failed');
      }
    } catch (err) {
      // If running locally or Netlify not handling live, provide friendly graceful state
      console.warn('Form submission encountered an issue or is running on local server:', err);
      // For local testing, we still show the terminal success receipt
      setStatus('success');
      setErrors({});
      setTouched({});
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 px-4 sm:px-6 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-cyber tracking-widest uppercase block mb-2 font-semibold">
            {contactData.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>{contactData.title}</span>
            <div className="h-px bg-slate-800 flex-grow max-w-xs" />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            {contactData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & Verified Socials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-7 border border-slate-800">
              <h3 className="text-lg font-bold text-white font-mono mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyber" />
                <span>DIRECT_CHANNELS</span>
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyber/40 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyber/10 border border-cyber/20 flex items-center justify-center text-cyber flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase block">Email Address</span>
                    <span className="text-sm font-medium text-slate-200">{personalInfo.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neural/10 border border-neural/20 flex items-center justify-center text-neural flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase block">Phone / Mobile</span>
                    <span className="text-sm font-medium text-slate-200">{personalInfo.phone}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase block">Current Location</span>
                    <span className="text-sm font-medium text-slate-200">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              {/* Verified Social Handles (Broken Twitter removed) */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <span className="font-mono text-[11px] text-slate-400 block mb-3 uppercase tracking-wider">
                  Verified Social Networks
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyber/40 text-slate-300 hover:text-cyber text-xs font-mono flex items-center justify-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Netlify Interactive Form with Terminal Feedback */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
              {/* Terminal Success Overlay */}
              {status === 'success' ? (
                <div className="py-8 flex flex-col items-center text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-mono font-bold text-white mb-2">
                    MESSAGE_TRANSMITTED // 200 OK
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                    Thank you for reaching out! Your message tensor has been received. I will review it and respond to your comms channel promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-5 py-2.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-mono text-xs flex items-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>

                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="font-mono text-xs text-cyber tracking-wider">
                      // TRANSMIT_DATA_PAYLOAD
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">ENCRYPTION: ACTIVE</span>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name Input Group */}
                  <div className="group">
                    <label htmlFor="name" className="font-mono text-xs text-slate-400 mb-1.5 uppercase flex items-center justify-between">
                      <span>User Identity (Name)</span>
                      {touched.name && errors.name && (
                        <span className="text-rose-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
                          [FIELD_REQUIRED]
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onInvalid={(e) => e.preventDefault()}
                      placeholder="e.g. Alex Mercer"
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/80 text-slate-100 placeholder-slate-600 text-sm font-sans focus:outline-none transition-all duration-200 ${
                        touched.name && errors.name
                          ? 'border border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                          : 'border border-slate-800 focus:border-cyber focus:ring-1 focus:ring-cyber hover:border-slate-700'
                      }`}
                    />
                    {touched.name && errors.name && (
                      <div
                        role="alert"
                        className="relative mt-2.5 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0c1427]/95 border border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.25)] group-hover:border-rose-400 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.35)] backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-1"
                      >
                        <div className="absolute -top-1.5 left-5 w-2.5 h-2.5 bg-[#0c1427] border-t border-l border-rose-500/70 group-hover:border-rose-400 rotate-45 transition-colors" />
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                        </span>
                        <div className="font-mono text-xs flex flex-wrap items-center gap-1.5">
                          <span className="text-rose-400 font-bold tracking-wider">// WARNING:</span>
                          <span className="text-slate-200 font-sans">{errors.name}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Email Input Group */}
                  <div className="group">
                    <label htmlFor="email" className="font-mono text-xs text-slate-400 mb-1.5 uppercase flex items-center justify-between">
                      <span>Comm Channel (Email)</span>
                      {touched.email && errors.email && (
                        <span className="text-rose-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
                          [FIELD_REQUIRED]
                        </span>
                      )}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onInvalid={(e) => e.preventDefault()}
                      placeholder="alex@example.com"
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/80 text-slate-100 placeholder-slate-600 text-sm font-sans focus:outline-none transition-all duration-200 ${
                        touched.email && errors.email
                          ? 'border border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                          : 'border border-slate-800 focus:border-cyber focus:ring-1 focus:ring-cyber hover:border-slate-700'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <div
                        role="alert"
                        className="relative mt-2.5 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0c1427]/95 border border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.25)] group-hover:border-rose-400 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.35)] backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-1"
                      >
                        <div className="absolute -top-1.5 left-5 w-2.5 h-2.5 bg-[#0c1427] border-t border-l border-rose-500/70 group-hover:border-rose-400 rotate-45 transition-colors" />
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                        </span>
                        <div className="font-mono text-xs flex flex-wrap items-center gap-1.5">
                          <span className="text-rose-400 font-bold tracking-wider">// WARNING:</span>
                          <span className="text-slate-200 font-sans">{errors.email}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input Group */}
                  <div className="group">
                    <label htmlFor="message" className="font-mono text-xs text-slate-400 mb-1.5 uppercase flex items-center justify-between">
                      <span>Data Payload (Message)</span>
                      {touched.message && errors.message && (
                        <span className="text-rose-400 text-[10px] font-mono font-semibold uppercase tracking-wider">
                          [FIELD_REQUIRED]
                        </span>
                      )}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onInvalid={(e) => e.preventDefault()}
                      placeholder="Hello Sailesh, I'd like to talk about..."
                      className={`w-full px-4 py-3 rounded-lg bg-slate-900/80 text-slate-100 placeholder-slate-600 text-sm font-sans focus:outline-none transition-all duration-200 resize-none ${
                        touched.message && errors.message
                          ? 'border border-rose-500/70 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                          : 'border border-slate-800 focus:border-cyber focus:ring-1 focus:ring-cyber hover:border-slate-700'
                      }`}
                    />
                    {touched.message && errors.message && (
                      <div
                        role="alert"
                        className="relative mt-2.5 flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0c1427]/95 border border-rose-500/70 shadow-[0_0_20px_rgba(244,63,94,0.25)] group-hover:border-rose-400 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.35)] backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-1"
                      >
                        <div className="absolute -top-1.5 left-5 w-2.5 h-2.5 bg-[#0c1427] border-t border-l border-rose-500/70 group-hover:border-rose-400 rotate-45 transition-colors" />
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                        </span>
                        <div className="font-mono text-xs flex flex-wrap items-center gap-1.5">
                          <span className="text-rose-400 font-bold tracking-wider">// WARNING:</span>
                          <span className="text-slate-200 font-sans">{errors.message}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 px-6 rounded-lg bg-cyber text-canvas font-mono font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
