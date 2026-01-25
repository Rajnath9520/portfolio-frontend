import React, { useEffect } from "react";

const VideoModal = ({ embedUrl, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!embedUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-xl w-full max-w-4xl mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            title="Video"
          ></iframe>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
        >
          Close Video
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
