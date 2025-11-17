import React, { useState, useEffect } from "react";
import { ExternalLink, Award, Calendar, Play } from "lucide-react";

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

  // Hover slider
  useEffect(() => {
    if (!hovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [hovered, images]);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("watch?v=")) return `https://www.youtube.com/embed/${url.split("v=")[1]}`;
    if (url.includes("youtu.be/")) return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  const CATEGORY_UI = {
    Hackathons: { badge: "text-blue-300", glow: "shadow-blue-500/20" },
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
      <div
        className={`relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-2 ${ui.glow}`}
      >
        {featured && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400"></div>
        )}
        <div className="w-full flex justify-center">
          <div
            className={`px-4 py-1 mt-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20 backdrop-blur-xl ${ui.badge}`}
          >
            {category}
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div
          className="h-52 relative rounded-xl overflow-hidden cursor-pointer bg-white/10 backdrop-blur-lg mt-5"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setCurrentIndex(0);
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

        

 {/* title and issuer and award        */}
  <div className="flex justify-between items-start mt-5">
  <div className="text-left">
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="text-sm text-gray-300 mt-1">{issuer}</p>
  </div>
  {award && (
    <div className="flex items-center gap-2 p-2.5 bg-amber-500/10 border border-amber-400/20 rounded-lg backdrop-blur whitespace-nowrap">
      <Award size={16} className="text-amber-400" />
      <span className="text-sm text-amber-300 font-semibold">
        {award}
      </span>
    </div>
  )}

</div>


        

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-300 mt-4 leading-relaxed text-left line-clamp-3">
          {description}
        </p>

        {/* VIDEO PREVIEW */}
        {videoUrl && (
          <div
            className="relative h-36 rounded-xl overflow-hidden cursor-pointer mt-5 group"
            onClick={() => setShowVideoModal(true)}
          >
            <iframe
              src={embedUrl}
              className="w-full h-full opacity-60 pointer-events-none group-hover:opacity-100 transition"
            ></iframe>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 p-4 rounded-full backdrop-blur-md group-hover:bg-black/80 transition">
                <Play size={30} className="text-yellow-400" />
              </div>
            </div>
          </div>
        )}


        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="flex flex-wrap justify-left gap-2 mt-4">
            {skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded backdrop-blur"
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
        <div className="flex items-center justify-between mt-6">
          {/* DATE */}
          <div className="flex items-center gap-1.5 text-xs text-gray-300">
            <Calendar size={14} />
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            {images.length > 0 && (
              <button
                onClick={() => setShowImageModal(true)}
                className="px-4 py-1.5 text-xs text-white bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg backdrop-blur transition"
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

      {/* IMAGE MODAL */}
{showImageModal && (
  <div
    className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-6"
    onClick={() => setShowImageModal(false)}
  >
    <div
      className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl max-w-4xl w-full p-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* LEFT ARROW */}
      {images.length > 1 && (
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
        >
          ‹
        </button>
      )}

      {/* IMAGE */}
      <img
        src={images[currentIndex]}
        className="w-full max-h-[75vh] object-contain rounded-xl transition-all duration-500"
      />

      {/* RIGHT ARROW */}
      {images.length > 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
        >
          ›
        </button>
      )}

      <button
        onClick={() => setShowImageModal(false)}
        className="w-full mt-4 py-3 bg-yellow-500 text-black font-semibold rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-6"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-black rounded-xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              className="w-full h-[70vh]"
              allowFullScreen
            ></iframe>

            <button
              className="w-full py-3 bg-yellow-500 text-black font-semibold"
              onClick={() => setShowVideoModal(false)}
            >
              Close Video
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AchievementCard;
