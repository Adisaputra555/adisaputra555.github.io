import "./AchievementMarquee.css";

const AchievementMarquee = ({ items = [], onItemClick }) => {
  if (items.length === 0) return null;

  const uniqueItems = items.filter(
    (item, index) =>
      items.findIndex((candidate) => candidate.image === item.image) === index,
  );
  const midpoint = Math.ceil(uniqueItems.length / 2);
  const rows = [
    uniqueItems.slice(0, midpoint),
    uniqueItems.slice(midpoint),
  ].filter((row) => row.length > 0);

  return (
    <div
      className="achievement-marquee"
      tabIndex={0}
      aria-label="Certificates and achievements"
    >
      {rows.map((row, rowIndex) => (
        <div className="achievement-track" key={rowIndex}>
          {Array.from({ length: 4 }, (_, group) => (
            <div
              className="achievement-group"
              key={group}
              aria-hidden={group > 0 ? "true" : undefined}
            >
              {row.map((item) => {
                const itemIndex = uniqueItems.indexOf(item);

                return (
                  <button
                    type="button"
                    className="achievement-card"
                    key={`${group}-${item.id}`}
                    tabIndex={group > 0 ? -1 : undefined}
                    aria-label={group === 0 ? `Open ${item.title}` : undefined}
                    onClick={() => onItemClick(item)}
                  >
                    <div className="achievement-image-frame">
                      <img
                        src={item.image}
                        alt={group === 0 ? item.title : ""}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="achievement-card-caption">
                      <span className="achievement-number">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="achievement-title">{item.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AchievementMarquee;
