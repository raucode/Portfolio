import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function MindsetSection() {
  const { t } = useLanguage();

  return (
    <section className="section" id="mindset">
      <Container>
        <SectionHeading
          eyebrow={t.mindset.eyebrow}
          title={t.mindset.title}
          description={t.mindset.description}
        />

        <div className="info-grid">
          {t.mindset.items.map((item) => (
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