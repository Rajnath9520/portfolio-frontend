import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { contactAPI } from '../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setStatus({ loading: true, success: false, error: null });

    try {
      await contactAPI.send(formData);

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });


      setTimeout(() => {
        setStatus({ loading: false, success: false, error: null });
      }, 5000);

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error:
          error.response?.data?.error ||
          'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">

        {/* Success Message */}
        {status.success && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 flex items-center gap-3 text-green-400 animate-fade-in">
            <CheckCircle size={24} />
            <span>Your message has been sent! I’ll get back to you soon.</span>
          </div>
        )}

        {/* Error Message */}
        {status.error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center gap-3 text-red-400 animate-fade-in">
            <AlertCircle size={24} />
            <span>{status.error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-yellow-400 outline-none transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-yellow-400 outline-none transition"
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-yellow-400 outline-none transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:border-yellow-400 outline-none resize-none transition"
          ></textarea>

          <button
            type="submit"
            disabled={status.loading}
            className={`w-full px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
              ${status.loading
                ? 'bg-yellow-400 opacity-50 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500 text-black'}
            `}
          >
            {status.loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ContactForm;
