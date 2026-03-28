import Container from "../ui/Container";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import { useContactContent } from "../../lib/content/useContent";

export default function ContactSection() {
  const contact = useContactContent();

  if (!contact) return null;

  return (
    <section className="section" id="contact">
      <Container>
        <div className="contact-box">
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />

          <div className="hero__actions">
            <Button href={`mailto:${contact.email}`} variant="primary">
              {contact.primaryCta}
            </Button>

            <Button href={contact.github} variant="secondary">
              {contact.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}