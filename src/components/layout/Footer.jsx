import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <Container>
        <div className="footer__inner">
          <p>
            © {new Date().getFullYear()} Raúl Figuera. {t.footer.text}
          </p>
        </div>
      </Container>
    </footer>
  );
}