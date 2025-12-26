import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Code, Play } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const images = project.images || [];
  const videoUrl = project.videoUrl || '';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Auto-slide only on hover
  useEffect(() => {
    if (!hovered || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 1800);

    return () => clearInterval(interval);
  }, [hovered, images]);

  // Extract YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <>
      {/* CARD */}
      <div
        className="relative w-full group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setCurrentIndex(0);
        }}
      >

        {/* IMAGE SLIDER */}
        <div className="h-48 w-full relative rounded-xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-transparent mb-6">
          {images.length > 0 ? (
            images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <Code size={60} className="text-yellow-400" />
            </div>
          )}

          {/* SLIDER DOTS */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-yellow-400' : 'bg-gray-500'
                  }`}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold break-words flex-1 min-w-0">{project.title}</h3>

            {project.category && (
              <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs border border-yellow-400/20 whitespace-nowrap shrink-0">
                {project.category}
              </span>
            )}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 break-words">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs break-words">
                {tech}
              </span>
            ))}
          </div>

          {/* BUTTONS: CODE | DEMO | WATCH VIDEO */}
          <div className="flex gap-4 pt-4 border-t border-gray-700 flex-wrap">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm"
              >
                <Github size={18} />
                Code
              </a>
            )}

            {project.demoUrl && project.demoUrl !== '' && project.demoUrl !== '#' ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm"
              >
                <ExternalLink size={18} />
                Demo
              </a>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 text-gray-600 cursor-not-allowed text-sm"
              >
                <ExternalLink size={18} />
                Demo
              </button>
            )}

            {/* WATCH VIDEO BUTTON */}
            {videoUrl ? (
              <button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm"
              >
                <Play size={18} />
                Video
              </button>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 text-gray-600 cursor-not-allowed text-sm"
              >
                <Play size={18} />
                Video
              </button>
            )}
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[999] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-black rounded-xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              className="w-full h-[50vh] sm:h-[70vh]"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Project video"
            ></iframe>

            <button
              onClick={() => setShowVideoModal(false)}
              className="w-full py-3 bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
            >
              Close Video
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;