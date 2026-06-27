import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required.';
    } else if (formData.name.length < 2) {
      tempErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required.';
    } else if (formData.message.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const toastId = toast.loading('Sending your message...');

    // Read API URL from env, falling back to localhost
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || 'Message sent successfully!', { id: toastId });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorMsg = data.detail || 'Failed to submit contact form.';
        toast.error(errorMsg, { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error('Could not connect to the backend server. Please verify the API is running.', { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white dark:text-white light:text-slate-900 mb-4">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric to-cyan mx-auto rounded-full" />
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-lg mx-auto mt-4 text-sm md:text-base">
            Have a project in mind, a job opportunity, or just want to say hello? Drop me a line below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:space-y-0">
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-semibold text-white dark:text-white light:text-slate-900">
                Contact Information
              </h3>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed text-sm md:text-base">
                Feel free to reach out via email, phone, or schedule a chat. I am usually responsive within 24 hours.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-electric/10 text-electric flex items-center justify-center border border-electric/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Email Me</p>
                  <a href="mailto:karthigaramesh510@gmail.com" className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-cyan transition-colors">
                    karthigaramesh510@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan/10 text-cyan flex items-center justify-center border border-cyan/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Call Me</p>
                  <a href="tel:8825466744" className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 hover:text-cyan transition-colors">
                    8825466744
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">India</p>
                  <p className="text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">
                   Tamil Nadu, Villupuram.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 dark:border-slate-800 light:border-slate-200 pt-6 text-xs text-slate-500 font-mono">
              * Secure communication enabled // rate limited
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="glass p-8 rounded-2xl border border-slate-700/40 shadow-2xl relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`px-4 py-3 bg-navy-dark/60 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-slate-500 text-sm transition-all ${
                      errors.name 
                        ? 'border-red-500 focus:ring-red-500/30' 
                        : 'border-slate-700 hover:border-slate-600 focus:border-cyan focus:ring-cyan/30'
                    }`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 mt-1.5 font-mono">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`px-4 py-3 bg-navy-dark/60 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-slate-500 text-sm transition-all ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500/30' 
                        : 'border-slate-700 hover:border-slate-600 focus:border-cyan focus:ring-cyan/30'
                    }`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 mt-1.5 font-mono">{errors.email}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-xs font-mono font-semibold tracking-wider text-slate-400 uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`px-4 py-3 bg-navy-dark/60 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-slate-500 text-sm transition-all resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500/30' 
                        : 'border-slate-700 hover:border-slate-600 focus:border-cyan focus:ring-cyan/30'
                    }`}
                    placeholder="Tell me about your project..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 mt-1.5 font-mono">{errors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-cyan hover:bg-cyan/90 disabled:bg-slate-800 text-navy font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan/15 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-navy" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-navy group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
