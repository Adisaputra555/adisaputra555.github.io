import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import "./EditingGallery.css";

const VideoThumbnail = ({ src, thumbnailSrc, objectPosition = "center" }) => {
  const videoRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(thumbnailSrc || null);

  useEffect(() => {
    if (thumbnailSrc) return undefined;

    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;
    let sampleIndex = 0;
    let bestScore = -1;
    let bestThumbnail = null;
    const samplePoints = [0.12, 0.3, 0.5, 0.7, 0.88];
    const scoreCanvas = document.createElement("canvas");
    scoreCanvas.width = 40;
    scoreCanvas.height = 24;
    const scoreContext = scoreCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    const seekToSample = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const sampleTime = Math.min(
        video.duration * samplePoints[sampleIndex],
        Math.max(0, video.duration - 0.05)
      );
      video.currentTime = sampleTime;
    };

    const captureSample = () => {
      if (cancelled || !scoreContext || !video.videoWidth || !video.videoHeight) {
        return;
      }

      scoreContext.drawImage(video, 0, 0, scoreCanvas.width, scoreCanvas.height);
      const pixels = scoreContext.getImageData(
        0,
        0,
        scoreCanvas.width,
        scoreCanvas.height
      ).data;
      let luminanceSum = 0;
      let luminanceSquaredSum = 0;
      let visiblePixels = 0;
      const pixelCount = pixels.length / 4;

      for (let pixel = 0; pixel < pixels.length; pixel += 4) {
        const luminance =
          pixels[pixel] * 0.2126 +
          pixels[pixel + 1] * 0.7152 +
          pixels[pixel + 2] * 0.0722;
        luminanceSum += luminance;
        luminanceSquaredSum += luminance * luminance;
        if (luminance > 24) visiblePixels += 1;
      }

      const average = luminanceSum / pixelCount;
      const variance = luminanceSquaredSum / pixelCount - average * average;
      const score =
        (visiblePixels / pixelCount) * 100 +
        average * 0.2 +
        Math.sqrt(Math.max(variance, 0)) * 0.4;

      if (score > bestScore) {
        bestScore = score;
        const scale = Math.min(
          1,
          640 / video.videoWidth,
          360 / video.videoHeight
        );
        const thumbnailCanvas = document.createElement("canvas");
        thumbnailCanvas.width = Math.round(video.videoWidth * scale);
        thumbnailCanvas.height = Math.round(video.videoHeight * scale);
        const thumbnailContext = thumbnailCanvas.getContext("2d");
        if (thumbnailContext) {
          thumbnailContext.drawImage(
            video,
            0,
            0,
            thumbnailCanvas.width,
            thumbnailCanvas.height
          );
          bestThumbnail = thumbnailCanvas.toDataURL("image/jpeg", 0.82);
        }
      }

      sampleIndex += 1;
      if (sampleIndex < samplePoints.length) {
        seekToSample();
      } else if (bestThumbnail && !cancelled) {
        setThumbnail(bestThumbnail);
      }
    };

    const handleError = () => {
      if (video.error) {
        console.error(`Unable to load video thumbnail: ${src}`, video.error);
      }
    };

    video.addEventListener("loadedmetadata", seekToSample);
    video.addEventListener("seeked", captureSample);
    video.addEventListener("error", handleError);
    video.load();

    return () => {
      cancelled = true;
      video.pause();
      video.removeEventListener("loadedmetadata", seekToSample);
      video.removeEventListener("seeked", captureSample);
      video.removeEventListener("error", handleError);
      video.removeAttribute("src");
      video.load();
    };
  }, [src, thumbnailSrc]);

  return (
    <div className="editing-video-preview" aria-hidden="true">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt=""
          style={{ objectPosition }}
        />
      ) : (
        <span className="editing-video-fallback">Video preview</span>
      )}
      {!thumbnailSrc && (
        <video
          ref={videoRef}
          className="editing-video-source"
          src={src}
          muted
          playsInline
          preload="metadata"
        />
      )}
    </div>
  );
};

const EditingGallery = ({ items = [], onItemClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const currentIndex = activeIndex % items.length;
  const activeItem = items[currentIndex];
  const previousIndex = (currentIndex - 1 + items.length) % items.length;
  const nextIndex = (currentIndex + 1) % items.length;
  const activeMedia = activeItem.media?.[0] || {
    type: "image",
    src: activeItem.image,
    alt: activeItem.title,
  };

  return (
    <div className="editing-gallery" data-aos="fade-up" data-aos-duration="700">
      <header className="editing-gallery-header">
        <div className="section-heading">
          <p className="eyebrow">Selected work · 02</p>
          <h2 className="section-title" id="editing-title">Work Gallery</h2>
          <p className="section-description">
            A collection of photo edits and video stories, crafted with care.
          </p>
        </div>
        <button
          type="button"
          className="editing-gallery-more"
          onClick={() => setActiveIndex(nextIndex)}
        >
          View More Projects <FiArrowRight aria-hidden="true" />
        </button>
      </header>

      <div className="editing-gallery-carousel">
        {items.map((item, index) => {
          const position =
            index === currentIndex
              ? "active"
              : items.length > 2 && index === previousIndex
                ? "previous"
                : items.length > 1 && index === nextIndex
                  ? "next"
                  : "hidden";
          const media = item.media?.[0] || {
            type: "image",
            src: item.image,
            alt: item.title,
          };

          return (
            <button
              key={item.id}
              type="button"
              className={`editing-slide editing-slide-${position}`}
              onClick={() =>
                position === "active"
                  ? onItemClick(item)
                  : setActiveIndex(index)
              }
              aria-label={
                position === "active"
                  ? `Open ${item.title}`
                  : `Show ${item.title}`
              }
              aria-current={position === "active" ? "true" : undefined}
              aria-hidden={position === "hidden" ? "true" : undefined}
              tabIndex={position === "hidden" ? -1 : undefined}
              style={{
                "--slide-accent": item.borderColor || "#a78bfa",
                "--thumbnail-position": item.thumbnailPosition || "center",
              }}
            >
              {media.type === "video" ? (
                position === "hidden" ? (
                  <div className="editing-video-fallback" aria-hidden="true" />
                ) : (
                  <VideoThumbnail
                    key={media.src}
                    src={media.src}
                    thumbnailSrc={media.thumbnail}
                    objectPosition={item.thumbnailPosition}
                  />
                )
              ) : (
                <img
                  src={media.thumbnail || media.src}
                  alt={media.alt || item.title}
                  loading={position === "active" ? "eager" : "lazy"}
                  decoding="async"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="editing-gallery-caption" aria-live="polite">
        <p className="editing-gallery-category">
          {activeMedia.type === "video" ? "Video editing" : "Photo editing"}
        </p>
        <h3>{activeItem.title}</h3>
        <p className="editing-gallery-description">{activeItem.subtitle}</p>
        <button
          type="button"
          className="editing-gallery-link"
          onClick={() => onItemClick(activeItem)}
        >
          View Project <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      {items.length > 1 && (
        <nav className="editing-gallery-pagination" aria-label="Gallery slides">
          <span>
            {String(currentIndex + 1).padStart(2, "0")}{" "}
            <span aria-hidden="true">/</span>{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <div className="editing-gallery-dots">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`editing-gallery-dot${index === currentIndex ? " is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.title}`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default EditingGallery;
