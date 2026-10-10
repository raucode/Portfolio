import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import Container from "../components/ui/Container";
import CvDocument from "../components/cv/CvDocument";
import { useCvData } from "../lib/content/useContent";
import { exportCvToPdf } from "../lib/cv/pdf";

import { useLanguage } from "../context/LanguageContext";
import { portfolioCopy } from "../locales/portfolio";

export default function ResumePage() {
  const { language, setLanguage } = useLanguage();
  const t = portfolioCopy[language];
  const cv = useCvData();

  if (!cv) return null;

  return (
    <section className="section cv-preview-page">
      <Container>
        <div className="cv-preview-actions no-print">
          <Link to="/" className="button">
            <ArrowLeft size={16} aria-hidden="true" />
            {t.back}
          </Link>

          <div className="cv-preview-meta">
            <span>{cv.meta.title}</span>
            <label className="sr-only" htmlFor="resume-language">{t.language}</label>
            <select id="resume-language" className="language" value={language} onChange={event => setLanguage(event.target.value)}>
              <option value="es">ES</option><option value="en">EN</option><option value="pt">PT</option>
            </select>
          </div>

          <button
            type="button"
            className="button primary"
            onClick={exportCvToPdf}
          >
            <Download size={16} aria-hidden="true" />
            {t.print}
          </button>
        </div>

        <div className="cv-preview-shell">
          <CvDocument cv={cv} />
        </div>
      </Container>
    </section>
  );
}