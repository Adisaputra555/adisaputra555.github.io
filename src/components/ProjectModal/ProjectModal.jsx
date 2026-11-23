import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiX, FiGithub } from 'react-icons/fi'; // Install react-icons jika belum: npm install react-icons

const ProjectModal = ({ isOpen, onClose, project, backLabel = "Back to projects" }) => {
  // State untuk mengontrol animasi penutupan
  const [isClosing, setIsClosing] = useState(false);

  // Fungsi untuk menangani penutupan dengan animasi
  const handleClose = () => {
    setIsClosing(true);
    // Tunggu animasi selesai (300ms) sebelum memanggil onClose dari props
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset state untuk pembukaan berikutnya
    }, 300);
  };

  // Mencegah scroll di background saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const mediaItems = project.media?.length
    ? project.media
    : [{ type: "image", src: project.image, alt: project.title }];

  return (
    // Overlay
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
        className={`bg-[#11121b] border border-white/10 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#11121b]/95 p-4 backdrop-blur">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <FiArrowLeft aria-hidden="true" />
            {backLabel}
          </button>
          <button
            onClick={handleClose}
            aria-label="Close project details"
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 pb-0">
          {mediaItems.map((media, index) => (
            media.type === "video" ? (
              <video
                key={`${media.src}-${index}`}
                src={media.src}
                poster={media.thumbnail}
                controls
                playsInline
                preload="metadata"
                aria-label={media.alt || project.title}
                className="h-auto w-auto max-h-[60vh] max-w-full self-center rounded-xl bg-[#171526] object-contain"
              />
            ) : (
              <img
                key={`${media.src}-${index}`}
                src={media.src}
                alt={media.alt || project.title}
                loading="lazy"
                className="h-auto w-auto max-h-[60vh] max-w-full self-center rounded-xl object-contain"
              />
            )
          ))}
        </div>

        <div className="p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>

            {/* --- DESKRIPSI LENGKAP --- */}
            {project.fullDescription && (
              <p className="text-zinc-300 text-base leading-relaxed">
                {project.fullDescription}
              </p>
            )}

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-violet-300 to-cyan-200 text-zinc-950 p-3 px-5 rounded-full w-full cursor-pointer border border-transparent hover:brightness-110 transition-colors"
              >
                <FiGithub />
                <span>Source Code</span>
              </a>
            )}
        </div>
      </div>
       {/* CSS untuk animasi */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
