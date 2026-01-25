import React,{useEffect} from "react";

const ImageModal = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  if (!images || images.length === 0) return null;

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
useEffect(() => {
  if (!images || images.length <= 1) return;

  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, 2000);

  return () => clearInterval(interval);
}, [images.length, setCurrentIndex]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-black rounded-xl max-w-5xl w-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 1 && (
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white text-2xl p-3 rounded-full"
          >
            ‹
          </button>
        )}

        <div className="flex justify-center items-center">
          <img
            src={images[currentIndex]}
            alt="preview"
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white text-2xl p-3 rounded-full"
          >
            ›
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
