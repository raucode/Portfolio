import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function StackSection() {
  const { t } = useLanguage();

  return (
    <section className="section" id="stack">
      <Container>
        <SectionHeading
          eyebrow={t.stack.eyebrow}
          title={t.stack.title}
          description={t.stack.description}
        />

        <div className="stack-grid">
          {t.stack.items.map((item) => (
            <article key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}