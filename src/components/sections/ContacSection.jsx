import Container from "../ui/Container";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import { useContactContent } from "../../lib/content/useContent";
import { trackEvent } from "../../lib/analytics";

export default function ContactSection() {
  const contact = useContactContent();

  if (!contact) return null;

  const handleClick = (type, href) => {
    trackEvent("contact_cta_click", {
      section: "contact",
      cta_type: type,
      cta_href: href,
    });
  };

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
            <Button
              href={`mailto:${contact.email}`}
              variant="primary"
              onClick={() => handleClick("email", `mailto:${contact.email}`)}
            >
              {contact.primaryCta}
            </Button>

            <Button
              href={contact.github}
              variant="secondary"
              onClick={() => handleClick("github", contact.github)}
            >
              {contact.secondaryCta}
            </Button>

            <Button
              href="/resume"
              variant="secondary"
              onClick={() => handleClick("resume", "/resume")}
            >
              CV Export
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}