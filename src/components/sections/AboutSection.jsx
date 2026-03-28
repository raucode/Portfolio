import { Network } from "lucide-react";
import Container from "../ui/Container";
import { useAbout } from "../../lib/content/useContent";

export default function AboutSection() {
  const aboutContent = useAbout() || {};

  const highlights = Array.isArray(aboutContent.highlights)
    ? aboutContent.highlights
    : [];

  const coreWords = Array.isArray(aboutContent.coreWords)
    ? aboutContent.coreWords
    : [];

  if (
    !aboutContent.eyebrow &&
    !aboutContent.title &&
    !aboutContent.paragraph &&
    !aboutContent.quote &&
    highlights.length === 0 &&
    coreWords.length === 0
  ) {
    return null;
  }

  return (
    <section className="section about-section" id="about">
      <Container>
        <div className="about-layout">
          <div className="about-content">
            <span className="about-eyebrow">{aboutContent.eyebrow}</span>

            <h2 className="about-title">{aboutContent.title}</h2>

            <p className="about-paragraph">{aboutContent.paragraph}</p>

            <div className="about-highlights">
              {highlights.map((item, index) => (
                <span key={`${item}-${index}`} className="about-chip">
                  {item}
                </span>
              ))}
            </div>

            {aboutContent.quote && (
              <blockquote className="about-quote">
                {aboutContent.quote}
              </blockquote>
            )}
          </div>

          <div className="about-visual" aria-hidden="true">
            <div className="about-visual-glow" />
            <div className="about-visual-card">
              <div className="about-node-icon">
                <Network size={42} strokeWidth={1.8} />
              </div>

              <div className="about-visual-lines">
                <span />
                <span />
                <span />
              </div>

              <div className="about-visual-badges">
                {coreWords.map((word, index) => (
                  <span key={`${word}-${index}`}>{word}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}