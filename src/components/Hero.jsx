import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Download, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../utils/constants';
import img1 from '../assets/rajnath.webp';
import Reveal from './Reveal';


const Hero = () => {


  return (
    <section className="md:min-h-screen flex items-center pt-20 px-6 md:">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in-left">
          <div className="text-gray-400 text-lg">Hello,</div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            I'm
            <span className="text-yellow-400">{PERSONAL_INFO.name}</span>
          </h1>
          <Reveal direction="right" delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-300">
              {PERSONAL_INFO.title}
            </h2>
          </Reveal>
          <p className="text-gray-400 text-lg max-w-xl">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex gap-4 pt-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-lg shadow-yellow-400/50"
            >
              <Mail size={20} />
              Let’s Build
            </Link>

            <a
              href="/Resume.pdf"
              download="Rajnath_Singh_Tomar_Resume.pdf"
              className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-all flex items-center gap-2"
            >
              <Download size={20} />
              Resume
            </a>
          </div>

          <div className="flex gap-6 pt-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon =
                link.icon === "Github"
                  ? Github
                  : link.icon === "Linkedin"
                    ? Linkedin
                    : Mail;

              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Icon size={28} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[320px] h-[360px] overflow-hidden">
            <img
              src={img1}
              className="absolute inset-0 w-full h-full rounded-3xl object-cover shadow-2xl"
              style={{
                boxShadow:
                  "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(250, 204, 21, 0.15)",
              }}
              whileHover={{ scale: 1.02 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

