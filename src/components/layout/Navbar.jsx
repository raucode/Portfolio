import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import navLinks from "../../data/navLinks";
import Container from "../ui/Container";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="navbar">
      <Container>
        <div className="navbar__inner navbar__inner--refined">
          <div className="navbar__left">
            <a href="#top" className="navbar__brand">
              <span className="navbar__brand-mark">RF</span>
              <span className="navbar__brand-text">Raúl Figuera</span>
            </a>
          </div>

          <nav className="navbar__nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.key} href={link.href} className="navbar__link">
                {t.nav[link.key]}
              </a>
            ))}
          </nav>

          <div className="navbar__actions">
            <div className="lang-dropdown">
              <button
                type="button"
                className="lang-dropdown__trigger lang-dropdown__trigger--minimal"
                onClick={() => setIsLangOpen((prev) => !prev)}
                aria-expanded={isLangOpen}
              >
                {language.toUpperCase()}
                <span className="lang-dropdown__caret">▾</span>
              </button>

              {isLangOpen && (
                <div className="lang-dropdown__menu">
                  <button
                    type="button"
                    className="lang-dropdown__item"
                    onClick={() => {
                      setLanguage("en");
                      setIsLangOpen(false);
                    }}
                  >
                    English
                  </button>

                  <button
                    type="button"
                    className="lang-dropdown__item"
                    onClick={() => {
                      setLanguage("es");
                      setIsLangOpen(false);
                    }}
                  >
                    Español
                  </button>

                  <button
                    type="button"
                    className="lang-dropdown__item"
                    onClick={() => {
                      setLanguage("pt");
                      setIsLangOpen(false);
                    }}
                  >
                    Português
                  </button>
                </div>
              )}
            </div>

            <a href="#contact" className="navbar__cta navbar__cta--compact">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}