import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { useStack } from "../../lib/content/useContent";
import { getTechIcon } from "../../lib/content/techIcons";

export default function StackSection() {
  const stackContent = useStack() || {};
  const items = Array.isArray(stackContent.items) ? stackContent.items : [];

  const hasContent = Boolean(
    stackContent.title ||
      stackContent.eyebrow ||
      stackContent.description ||
      items.length
  );

  if (!hasContent) return null;

  return (
    <section className="stack-section section" id="stack">
      <Container>
        <div className="stack-section__heading">
          <SectionHeading
            eyebrow={stackContent.eyebrow}
            title={stackContent.title}
            description={stackContent.description}
          />
        </div>

        <div className="stack-section__grid">
          {items.map((item, index) => {
            const techList = Array.isArray(item.tech) ? item.tech : [];
            const itemTitle = item.title || `Stack item ${index + 1}`;

            return (
              <article
                key={`${itemTitle}-${index}`}
                className="stack-card"
              >
                {item.icon && (
                  <div className="stack-card__icon-wrap" aria-hidden="true">
                    <img
                      src={item.icon}
                      alt=""
                      className="stack-card__icon"
                    />
                  </div>
                )}

                <div className="stack-card__content">
                  {item.title && (
                    <h3 className="stack-card__title">{item.title}</h3>
                  )}

                  {item.description && (
                    <p className="stack-card__description">
                      {item.description}
                    </p>
                  )}

                  {techList.length > 0 && (
                    <ul
                      className="stack-card__tech-list"
                      aria-label={`Technologies used in ${itemTitle}`}
                    >
                      {techList.map((tech, techIndex) => {
                        const TechIcon = getTechIcon(tech);

                        return (
                          <li
                            key={`${itemTitle}-${tech}-${techIndex}`}
                            className="stack-card__tech-item"
                          >
                            <span className="stack-card__tech-label">
                              <TechIcon className="stack-card__tech-icon" />
                              <span className="stack-card__tech-text">
                                {tech}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}