import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function ExpertiseSection() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow={t.expertise.eyebrow}
          title={t.expertise.title}
          description={t.expertise.description}
        />

        <div className="info-grid info-grid--expertise">
          {t.expertise.items.map((item) => (
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