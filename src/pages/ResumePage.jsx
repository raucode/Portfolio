import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import CvDocument from "../components/cv/CvDocument";
import { useCvData } from "../lib/content/useContent";
import { exportCvToPdf } from "../lib/cv/pdf";

export default function ResumePage() {
  const cv = useCvData();

  if (!cv) return null;

  return (
    <section className="section cv-preview-page">
      <Container>
        <div className="cv-preview-actions no-print">
          <Button href="/" variant="secondary">
            Back
          </Button>

          <button
            type="button"
            className="button button--primary"
            onClick={exportCvToPdf}
          >
            Download PDF
          </button>
        </div>

        <div className="cv-preview-shell">
          <CvDocument cv={cv} />
        </div>
      </Container>
    </section>
  );
}