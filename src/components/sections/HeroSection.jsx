import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="hero section" id="top">
      <Container>
        <div className="hero__content">
          <div className="hero__left">
            <div className="hero-profile">
              <div className="hero-profile__avatar" aria-hidden="true">
                <span>👤</span>
              </div>

              <div className="hero-profile__meta">
                <span className="hero-profile__eyebrow">{t.hero.profileName}</span>
                <p className="hero-profile__role">{t.hero.profileRole}</p>
              </div>
            </div>

            <p className="hero__quote">{t.hero.quote}</p>

            <h1 className="hero__title hero__title--compact">
              {t.hero.compactTitle}
            </h1>

            <p className="hero__description">{t.hero.description}</p>

            <div className="hero__actions">
              <Button href="#projects" variant="primary">
                {t.hero.primaryCta}
              </Button>

              <Button href="#contact" variant="secondary">
                {t.hero.secondaryCta}
              </Button>
            </div>

            <div className="hero__tags">
              <Tag>Rust</Tag>
              <Tag>Actix Web</Tag>
              <Tag>React</Tag>
              <Tag>Redux Toolkit</Tag>
              <Tag>Linux</Tag>
            </div>
          </div>

          <div className="hero__right">
            <div className="hero-panel">
              <div className="hero-panel__topbar">
                <div className="hero-panel__dots">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="hero-panel__status">
                  <span className="hero-panel__status-line" />
                </div>
              </div>

              <div className="hero-panel__content">
                <p className="hero-panel__label">{t.hero.panel.label}</p>

                <div className="hero-panel__main">
                  <h3>{t.hero.panel.title}</h3>
                  <p>{t.hero.panel.description}</p>
                </div>

                <div className="hero-panel__grid">
                  {t.hero.panel.items.map((item) => (
                    <div key={`${item.label}-${item.title}`} className="hero-panel__item">
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}