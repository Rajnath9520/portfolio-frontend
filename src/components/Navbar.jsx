import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';
import { NAV_ITEMS } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const portfolioTab = NAV_ITEMS.find((i) => i.name === "Projects");
  const otherItems = NAV_ITEMS.filter((i) => i.name !== "Admin");

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-gray-800'
          : 'bg-transparent'
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          <Link to="/" className="text-3xl font-bold">
            <span className="text-yellow-400">R</span>
            <span className="text-white">.</span>
          </Link>
          <div className="md:hidden absolute left-1/2 -translate-x-1/2">
  <div className="relative flex items-center gap-2">
    
    <motion.div
      className="text-yellow-400 text-xl font-bold"
      animate={{ x: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 1.8 }}
    >
      →
    </motion.div>

    <Link
      to={portfolioTab.path}
      className="text-lg font-semibold text-yellow-400"
    >
      {portfolioTab.name}
    </Link>

  </div>
</div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.filter((i) => i.name !== "Admin").map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(item.path)
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400"></div>
                )}
              </Link>
            ))}

            <Link
              to="/contact"
              className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-yellow-400 transition-colors flex items-center gap-2"
            >
              <Mail size={16} />
              Contact Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition-all z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              key={isMobileMenuOpen ? "close" : "open"}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.div>
          </button>
        </div>
        
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-black/80 backdrop-blur-xl rounded-2xl p-6 mt-4 border border-gray-800 shadow-lg relative z-50"
              >
                {otherItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 text-lg font-medium mb-2 rounded-md transition-all ${
                        isActive(item.path)
                          ? "text-yellow-400"
                          : "text-gray-300 hover:text-yellow-400"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.25 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-4 block text-center px-6 py-2 bg-yellow-400 text-black rounded-full font-medium hover:bg-yellow-300 transition-colors"
                  >
                    <Mail size={16} className="inline-block mr-2" />
                    Contact Me
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
