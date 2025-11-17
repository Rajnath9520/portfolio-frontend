import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, MapPin, Phone, Github, Linkedin, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/constants';

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="text-yellow-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out.
            I'm always open to discussing new projects and opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          
          {/* Contact Info Cards */}
          <div className="space-y-6 animate-fade-in-left">

            {/* Email Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-400/10 rounded-lg">
                  <Mail className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 select-text">{PERSONAL_INFO.email}</span>
                    <button
                      onClick={copyEmail}
                      className="p-2 rounded-lg bg-gray-700 hover:bg-yellow-400 hover:text-black transition-all"
                    >
                      {copied ? (
                        <CheckCircle className="text-green-400" size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-400/10 rounded-lg">
                  <MapPin className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Location</h3>
                  <p className="text-gray-400">Bilaspur, Chhattisgarh, India</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-400/10 rounded-lg">
                  <Phone className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <p className="text-gray-400">Available on request</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
              <div className="flex gap-4">

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                >
                  <Github size={24} />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-700 rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                >
                  <Linkedin size={24} />
                </a>

                <button
                  onClick={copyEmail}
                  className="p-3 bg-gray-700 rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                >
                  <Mail size={24} />
                </button>

              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in-right">
            <ContactForm />
          </div>
        </div>

        {/* Additional CTA */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-400/20 rounded-2xl p-8 text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Looking for My Resume?</h2>
          <p className="text-gray-400 mb-6">
            Download my complete resume with detailed information about my
            experience, education, and skills.
          </p>
          <a
            href={PERSONAL_INFO.resume}
            download
            className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-all"
          >
            <Mail size={20} />
            Download Resume
          </a>
        </div>

      </div>
    </div>
  );
};

export default Contact;
