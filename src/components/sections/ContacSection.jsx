import Container from "../ui/Container";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import { useContactContent } from "../../lib/content/useContent";

export default function ContactSection() {
  const contact = useContactContent();

  if (!contact) return null;

  const trackClick = (ctaType, href) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "contact_cta_click", {
        section: "contact",
        cta_type: ctaType,
        cta_href: href,
      });
    }
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
              onClick={() => trackClick("email", `mailto:${contact.email}`)}
            >
              {contact.primaryCta}
            </Button>

            <Button
              href={contact.github}
              variant="secondary"
              onClick={() => trackClick("github", contact.github)}
            >
              {contact.secondaryCta}
            </Button>

            <Button
              href="/resume"
              variant="secondary"
              onClick={() => trackClick("resume", "/resume")}
            >
              CV Export
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}