import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="section" id="about">
      <Container>
        <div className="about-box">
          <SectionHeading
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            description={t.about.description}
          />
          <p className="about-box__extra">{t.about.extra}</p>
        </div>
      </Container>
    </section>
  );
}