import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";

export default function HeroSection() {
  const { t } = useLanguage();

  const chips = ["Rust", "React", "Linux"];
  const traits = ["Backend-first", "Product-minded", "ES · EN · PT"];

  return (
    <section className="hero section" id="top">
      <Container>
        <div className="hero__content hero__content--minimal">
          <div className="hero__left hero__left--stacked">
            <div className="hero-photo">
              <img
                src="https://raw.githubusercontent.com/raucode/Portfolio/refs/heads/master/media/removebg1.png"
                alt="Raúl Figuera"
              />
            </div>

            <div className="hero-profile hero-profile--card">
              <div className="hero-profile__meta">
                <span className="hero-profile__eyebrow">
                  {t.hero.profileName}
                </span>
                <p className="hero-profile__role">
                  {t.hero.profileRole}
                </p>
              </div>
            </div>

            <div className="hero-mini-info">
              <div className="hero-mini-info__row hero-mini-info__row--primary">
                {traits.map((item) => (
                  <span key={item} className="hero-mini-info__pill hero-mini-info__pill--soft">
                    {item}
                  </span>
                ))}
              </div>

              <div className="hero-mini-info__row">
                {chips.map((item) => (
                  <span key={item} className="hero-mini-info__pill">
                    {item}
                  </span>
                ))}
              </div>
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
                    <div
                      key={`${item.label}-${item.title}`}
                      className="hero-panel__item"
                    >
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