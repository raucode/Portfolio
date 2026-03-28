import { useLanguage } from "../../context/LanguageContext";
import { useProjects } from "../../lib/content/useContent";
import ProjectShowcaseCard from "../ui/ProjectShowcaseCard";
import "../../styles/sections/projects.css";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const projects = useProjects();

  const visibleProjects = projects
    ?.filter((project) => project.visible)
    ?.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  if (!visibleProjects?.length) return null;

  return (
    <section className="section projects-showcase" id="projects">
      <div className="container projects-showcase__container">
        <div className="projects-showcase__intro">
          <p className="projects-showcase__eyebrow">{t.projects.eyebrow}</p>
          <h2 className="projects-showcase__title">{t.projects.title}</h2>
          <p className="projects-showcase__description">
            {t.projects.description}
          </p>
        </div>

        <div className="projects-showcase__grid">
          {visibleProjects.map((project) => (
            <ProjectShowcaseCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}