import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Download, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../utils/constants';



const SLIDES = [
  { 
    image: './rajnath2.webp', 
    title: "I Code", 
  },
  { 
    image: './play.jpg ', 
    title: "I Play",  
  },
  { 
    image: './rajnath.jpg', 
    title: "I Evolve",  
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoPlay || isHovering) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [autoPlay, isHovering]);



  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div className="space-y-6 animate-fade-in-left">
          <div className="text-gray-400 text-lg">Hello,</div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            I'm <span className="text-yellow-400">{PERSONAL_INFO.name}</span>
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-300">
            {PERSONAL_INFO.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex gap-4 pt-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-lg shadow-yellow-400/50"
            >
              <Mail size={20} />
              Hire Me
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
              const Icon = link.icon === 'Github'
                ? Github
                : link.icon === 'Linkedin'
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

        {/* Image Slideshow  */}
          <motion.div 
            className="flex flex-col items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Carousel Container */}
            <div 
              className="relative w-full max-w-sm h-96 sm:h-[480px]"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.img
                      src={SLIDES[index].image}
                      alt={SLIDES[index].title}
                      className="w-64 sm:w-80 h-80 sm:h-96 rounded-3xl object-cover shadow-2xl"
                      style={{
                        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(250, 204, 21, 0.15)",
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`caption-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-10 sm:mt-12 text-center"
              >
                <h3 className="text-2xl sm:text-4xl font-bold text-white mb-1">
                  {SLIDES[index].title}
                </h3>
              </motion.div>
            </AnimatePresence>
          </motion.div>
      </div>
    </section>
  );
};

export default Hero;

