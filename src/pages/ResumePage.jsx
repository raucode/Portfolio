import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import CvDocument from "../components/cv/CvDocument";
import { useCvData } from "../lib/content/useContent";
import { exportCvToPdf } from "../lib/cv/pdf";

import { useLanguage } from "../context/LanguageContext";
import { portfolioCopy } from "../locales/portfolio";

export default function ResumePage() {
  const { language } = useLanguage();
  const t = portfolioCopy[language];
  const cv = useCvData();

  if (!cv) return null;

  return (
    <section className="section cv-preview-page">
      <Container>
        <div className="cv-preview-actions no-print">
          <Link to="/" className="button">
            {t.back}
          </Link>

          <button
            type="button"
            className="button button--primary"
            onClick={exportCvToPdf}
          >
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