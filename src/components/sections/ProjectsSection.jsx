import { useLanguage } from "../../context/LanguageContext";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import projects from "../../data/projects.json";

export default function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section className="section" id="projects">
      <Container>
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              labels={t.projects.labels}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}