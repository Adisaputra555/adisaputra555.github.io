import { FiPlay } from "react-icons/fi";
import "./ChromaGrid.css";

export const ChromaGrid = ({ items = [], onItemClick, className = "" }) => {
  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div className={`chroma-grid ${className}`}>
      {items.map((item) => {
        const videoMedia = item.media?.find((media) => media.type === "video");

        return (
          <article
            key={item.id}
            className="chroma-card"
            role="button"
            tabIndex={0}
            aria-label={`View ${item.title} details`}
            onMouseMove={handleCardMove}
            onClick={() => onItemClick(item)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onItemClick(item);
              }
            }}
            style={{ "--card-border": item.borderColor || "#a78bfa" }}
          >
            <div className="chroma-img-wrapper">
              <img
                src={videoMedia?.thumbnail || item.image}
                alt={item.title}
                loading="lazy"
              />
              {videoMedia && (
                <span className="video-badge">
                  <FiPlay aria-hidden="true" />
                  <span>Video</span>
                </span>
              )}
            </div>
            <footer className="chroma-info">
              <h3 className="name">{item.title}</h3>
              {item.handle && <span className="handle">{item.handle}</span>}
              <p className="role">{item.subtitle}</p>
              {item.location && <span className="location">{item.location}</span>}
            </footer>
          </article>
        );
      })}
    </div>
  );
};

export default ChromaGrid;
