import { useLanguage } from "../../context/LanguageContext";
import { getAbout } from "../../lib/content/selectors";

export default function AboutSection() {
  const { language } = useLanguage();
  const about = getAbout(language);

  return (
    <section id="about">
      <h2>{about.title}</h2>
      <p>{about.description}</p>
      <p>{about.extra}</p>
    </section>
  );
}