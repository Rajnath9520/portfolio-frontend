import React, { useState, useEffect, useRef } from "react";
import { Award, Calendar, Play } from "lucide-react";
import ImageModal from "./ImageModal"; 
import VideoModal from "./VideoModal"; 

const AchievementCard = ({ achievement }) => {
  const {
    title,
    description,
    category,
    issuer,
    date,
    credentialUrl,
    images = [],
    skills = [],
    award,
    featured,
    videoUrl,
  } = achievement;

  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  // Detect if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for mobile auto-slide
  useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } 
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isMobile]);

  useEffect(() => {
  if (showImageModal || showVideoModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showImageModal, showVideoModal]);


  // Slider logic: hover for desktop, visibility for mobile
  useEffect(() => {
    if (images.length <= 1) return;

    const shouldSlide = isMobile ? isVisible : hovered;
    
    if (!shouldSlide) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [hovered, isVisible, isMobile, images.length]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("watch?v=")) return `https://www.youtube.com/embed/${url.split("v=")[1]}`;
    if (url.includes("youtu.be/")) return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  const CATEGORY_UI = {
    Hackathons: { badge: "text-blue-300", glow: "shadow-yellow-500/20" },
    Competitions: { badge: "text-orange-300", glow: "shadow-orange-500/20" },
    "Courses & Certifications": { badge: "text-purple-300", glow: "shadow-purple-500/20" },
    "Academic Achievements": { badge: "text-indigo-300", glow: "shadow-indigo-500/20" },
    "Extracurricular Activities": { badge: "text-emerald-300", glow: "shadow-emerald-500/20" },
  };

  const ui = CATEGORY_UI[category] || CATEGORY_UI["Courses & Certifications"];

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {!showImageModal && !showVideoModal && (
        <div
          ref={cardRef}
          className={`relative w-full max-w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-yellow-400/30
          p-6  shadow-lg transition-transform transition-colors duration-300 hover:-translate-y-1 ${ui.glow} overflow-hidden`}
        >
          {featured && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 rounded-t-2xl"></div>
          )}
          <div className="w-full flex justify-center">
            <div
              className={`px-4 py-1 mt-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20  ${ui.badge}`}
            >
              {category}
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div
            className="h-30 w-30 relative rounded-xl overflow-hidden cursor-pointer   mt-5"
            onMouseEnter={() => !isMobile && setHovered(true)}
            onMouseLeave={() => {
              if (!isMobile) {
                setHovered(false);
                setCurrentIndex(0);
              }
            }}
            onClick={() => setShowImageModal(true)}
          >
            {images.length ? (
              images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    idx === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300">
                No Image
              </div>
            )}

            {/* SLIDER DOTS */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      currentIndex === idx ? "bg-yellow-400" : "bg-gray-600"
                    }`}
                  ></span>
                ))}
              </div>
            )}
          </div>

          {/* title and issuer and award */}
          <div className="flex justify-between items-start mt-5 gap-3">
            <div className="text-left flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white break-words">
                {title}
              </h3>
              <p className="text-sm text-gray-300 mt-1 break-words">{issuer}</p>
            </div>
            {award && (
              <div className="flex items-center gap-2 p-2.5 bg-amber-500/10 border border-amber-400/20 rounded-lg  shrink-0">
                <Award size={16} className="text-amber-400" />
                <span className="text-sm text-amber-300 font-semibold whitespace-nowrap">
                  {award}
                </span>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-300 mt-4 leading-relaxed text-left line-clamp-3 break-words">
            {description}
          </p>

          {/* VIDEO PREVIEW */}
          {videoUrl && (
            <div
              className="relative w-full h-36 rounded-xl overflow-hidden cursor-pointer mt-5 group"
              onClick={() => setShowVideoModal(true)}
            >
              <iframe
                src={embedUrl}
                className="w-full h-full opacity-60 pointer-events-none group-hover:opacity-100 transition"
                title="Video preview"
              ></iframe>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/60 p-4 rounded-full  group-hover:bg-black/80 transition">
                  <Play size={30} className="text-yellow-400" />
                </div>
              </div>
            </div>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded  break-words"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded">
                  +{skills.length - 4}
                </span>
              )}
            </div>
          )}

          {/* FOOTER */}
          <div className="flex items-center justify-between mt-6 gap-3 flex-wrap">
            {/* DATE */}
            <div className="flex items-center gap-1.5 text-xs text-gray-300 shrink-0">
              <Calendar size={14} />
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 flex-wrap">
              {images.length > 0 && (
                <button
                  onClick={() => setShowImageModal(true)}
                  className="px-4 py-1.5 text-xs text-white bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg  transition"
                >
                  View
                </button>
              )}

              {credentialUrl && (
                <a
                  href={credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 text-xs text-black bg-yellow-400/80 hover:bg-yellow-400 rounded-lg transition font-semibold"
                >
                  Verify
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Image Modal */}
      {showImageModal && (
        <ImageModal
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setShowImageModal(false)}
        />
      )}

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <VideoModal
          embedUrl={embedUrl}
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </>
  );
};

export default AchievementCard;