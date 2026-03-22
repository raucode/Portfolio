import Tag from "./Tag";
import Button from "./Button";

export default function ProjectCard({ project, labels }) {
  const { category, title, description, highlights, stack, links } = project;

  return (
    <article className="project-card">
      <div className="project-card__top">
        <span className="project-card__category">{category}</span>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
      </div>

      <div className="project-card__block">
        <h4 className="project-card__subtitle">{labels.highlights}</h4>
        <ul className="project-card__list">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="project-card__block">
        <h4 className="project-card__subtitle">{labels.stack}</h4>
        <div className="project-card__tags">
          {stack.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>

      <div className="project-card__actions">
        {links.demo ? (
          <Button href={links.demo} variant="primary">
            {labels.demo}
          </Button>
        ) : null}

        {links.github ? (
          <Button href={links.github} variant="secondary">
            {labels.github}
          </Button>
        ) : null}
      </div>
    </article>
  );
}