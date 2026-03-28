import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { useMindset } from "../../lib/content/useContent";

export default function MindsetSection() {
  const mindset = useMindset() || {};

  const items = Array.isArray(mindset.items) ? mindset.items : [];
  const showIntro = Boolean(mindset.statementLabel || mindset.statement);

  return (
    <section className="section" id="mindset">
      <Container>
        <SectionHeading
          eyebrow={mindset.eyebrow}
          title={mindset.title}
          description={mindset.description}
        />

        {showIntro && (
          <div className="mindset-intro">
            {mindset.statementLabel && (
              <span className="mindset-intro__label">
                {mindset.statementLabel}
              </span>
            )}

            {mindset.statement && (
              <p className="mindset-intro__statement">
                {mindset.statement}
              </p>
            )}
          </div>
        )}

        <div className="info-grid mindset-grid">
          {items.map((item, index) => (
            <article
              key={`${item.title || "item"}-${index}`}
              className="info-card mindset-card"
            >
              <div className="mindset-card__top">
                <span className="mindset-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}