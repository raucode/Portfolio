import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { useStack } from "../../lib/content/useContent";

export default function StackSection() {
  const stackContent = useStack() || {};

  const items = Array.isArray(stackContent.items) ? stackContent.items : [];

  if (!stackContent.title && !stackContent.eyebrow && !stackContent.description && items.length === 0) {
    return null;
  }

  return (
    <section className="section" id="stack">
      <Container>
        <SectionHeading
          eyebrow={stackContent.eyebrow}
          title={stackContent.title}
          description={stackContent.description}
        />

        <div className="stack-grid">
          {items.map((item, index) => (
            <article key={`${item.title || "stack-item"}-${index}`} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}