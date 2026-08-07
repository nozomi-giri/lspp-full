import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryImages } from "../data/gallery";

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function prev() {
    setCurrent((c) => (c === 0 ? galleryImages.length - 1 : c - 1));
  }

  function next() {
    setCurrent((c) => (c === galleryImages.length - 1 ? 0 : c + 1));
  }

  function openLightbox(i: number) {
    setCurrent(i);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  return (
    <section className="bg-bg-secondary px-6 py-20">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-accent">
          Memories
        </p>
        <h2 className="mb-3 text-[clamp(22px,3vw,28px)] font-semibold text-primary">
          Pixel-Perfect Highlights
        </h2>
        <p className="text-sm text-text-muted">
          Some nostalgic memoREELs from the Student Partnership Program.
        </p>
      </div>

      <div className="relative mx-auto flex max-w-[800px] items-center gap-4">
        <button
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card-bg text-text transition-colors duration-200 hover:border-primary hover:bg-primary-light hover:text-primary"
          onClick={prev}
          aria-label="Previous image"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="relative h-[460px] flex-1 overflow-hidden rounded-card">
          {galleryImages.map((img, i) => {
            const isActive = i === current;
            const isPrev =
              i === (current - 1 + galleryImages.length) % galleryImages.length;
            const isNext = i === (current + 1) % galleryImages.length;
            return (
              <div
                key={img.src}
                className={`group absolute inset-0 cursor-pointer overflow-hidden rounded-card opacity-0 transition-[opacity,transform] duration-400 ${
                  isActive
                    ? "pointer-events-auto translate-x-0 scale-100 opacity-100"
                    : "pointer-events-none"
                } ${isPrev ? "-translate-x-[60px] scale-[0.97]" : ""} ${
                  isNext ? "translate-x-[60px] scale-[0.97]" : ""
                }`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="block h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="rounded-full border-[1.5px] border-white px-5 py-1.5 text-[15px] font-medium tracking-[0.05em] text-white">
                    View
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card-bg text-text transition-colors duration-200 hover:border-primary hover:bg-primary-light hover:text-primary"
          onClick={next}
          aria-label="Next image"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {galleryImages.map((img, i) => (
          <button
            key={img.src}
            className={`h-2 w-2 rounded-full transition-[background-color,transform] duration-200 ${
              i === current ? "scale-[1.3] bg-accent" : "bg-border"
            }`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/92"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-white/30 text-white transition-colors duration-200 hover:border-white"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/30 text-white transition-colors duration-200 hover:border-white"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>

          <div
            className="max-h-[80vh] max-w-[85vw] overflow-hidden rounded-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[current].src}
              alt={galleryImages[current].alt}
              className="block h-full max-h-[80vh] w-full object-contain"
            />
          </div>

          <button
            className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white/30 text-white transition-colors duration-200 hover:border-white"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                className={`h-2 w-2 rounded-full transition-[background-color,transform] duration-200 ${
                  i === current ? "scale-[1.3] bg-accent" : "bg-border"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
