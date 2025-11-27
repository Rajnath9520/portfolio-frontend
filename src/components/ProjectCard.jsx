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
        className=" relative group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setCurrentIndex(0); 
        }}
      >

        {/* IMAGE SLIDER */}
        <div className="h-48 relative rounded-xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-transparent mb-6">
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

        {/* VIDEO PREVIEW */}
        {videoUrl && (
          <div
            onClick={() => setShowVideoModal(true)}
            className="relative h-32 rounded-lg overflow-hidden cursor-pointer mb-4 group/video"
          >
            <iframe
              src={embedUrl}
              title="Video preview"
              className="w-full h-full pointer-events-none opacity-60 group-hover/video:opacity-100 transition"
            ></iframe>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 p-4 rounded-full backdrop-blur-md group-hover/video:bg-black/80 transition">
                <Play size={30} className="text-yellow-400" />
              </div>
            </div>
          </div>
        )}

        {/* INFO */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
  <h3 className="text-xl font-bold">{project.title}</h3>

  {project.category && (
    <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs border border-yellow-400/20 whitespace-nowrap">
      {project.category}
    </span>
  )}
</div>


          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-700">
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
            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm"
              >
                <ExternalLink size={18} />
                Demo
              </a>
            )}
          </div>

          {project.status && (
            <div className="absolute bottom-4 right-4 z-20">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  project.status === 'completed'
                    ? 'bg-green-500/10 text-green-400'
                    : project.status === 'in-progress'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {project.status}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[999] flex items-center justify-center p-6"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-black rounded-xl max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              className="w-full h-[70vh]"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            <button
              onClick={() => setShowVideoModal(false)}
              className="w-full py-3 bg-yellow-500 text-black font-semibold"
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
