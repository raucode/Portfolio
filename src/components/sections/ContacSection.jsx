import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="section" id="contact">
      <Container>
        <div className="contact-box">
          <SectionHeading
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.description}
          />

          <div className="hero__actions">
            <Button href="mailto:youremail@example.com" variant="primary">
              {t.contact.primaryCta}
            </Button>

            <Button href="https://github.com/" variant="secondary">
              {t.contact.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}