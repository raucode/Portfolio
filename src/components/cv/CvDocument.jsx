function renderLink(label, href) {
  if (!href) return null;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

function formatPeriod(period) {
  if (!period) return "";

  if (typeof period === "string") return period;

  if (typeof period === "object") {
    const start = period.start || "";
    const end = period.current ? "Present" : period.end || "";
    return [start, end].filter(Boolean).join(" - ");
  }

  return "";
}

export default function CvDocument({ cv }) {
  if (!cv) return null;

  const { basics, summary, projects, stack, sections } = cv;

  return (
    <article className="cv-document" id="cv-document">
      <header className="cv-document__hero">
        <div className="cv-document__identity">
          <p className="cv-document__eyebrow">{cv?.meta?.title || "Resume"}</p>
          <h1 className="cv-document__name">{basics?.name || ""}</h1>

          {basics?.role ? (
            <p className="cv-document__role">{basics.role}</p>
          ) : null}
        </div>

        <div className="cv-document__contact-card">
          {basics?.email ? (
            <p>
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </p>
          ) : null}

          {basics?.website ? (
            <p>{renderLink("Website", basics.website)}</p>
          ) : null}

          {basics?.github ? (
            <p>{renderLink("GitHub", basics.github)}</p>
          ) : null}

          {basics?.linkedin ? (
            <p>{renderLink("LinkedIn", basics.linkedin)}</p>
          ) : null}

          {basics?.location ? <p>{basics.location}</p> : null}
        </div>
      </header>

      {summary ? (
        <section className="cv-document__section">
          <div className="cv-document__section-heading">
            <span className="cv-document__section-line" />
            <h2>{sections?.summary || "Summary"}</h2>
          </div>

          <div className="cv-document__panel">
            <p className="cv-document__summary">{summary}</p>
          </div>
        </section>
      ) : null}

      {Array.isArray(projects) && projects.length > 0 ? (
        <section className="cv-document__section">
          <div className="cv-document__section-heading">
            <span className="cv-document__section-line" />
            <h2>{sections?.projects || "Projects"}</h2>
          </div>

          <div className="cv-document__project-list">
            {projects.map((project) => {
              const formattedPeriod = formatPeriod(project.period);

              return (
                <article
                  key={project.slug || project.title}
                  className="cv-document__project-card"
                >
                  <div className="cv-document__project-top">
                    <div>
                      <h3>{project.title || ""}</h3>
                      {project.description ? <p>{project.description}</p> : null}
                    </div>

                    {formattedPeriod ? (
                      <span className="cv-document__period">
                        {formattedPeriod}
                      </span>
                    ) : null}
                  </div>

                  {Array.isArray(project.stack) && project.stack.length > 0 ? (
                    <div className="cv-document__tags">
                      {project.stack.map((item) => (
                        <span key={item} className="cv-document__tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {project.links ? (
                    <div className="cv-document__links">
                      {project.links.demo
                        ? renderLink("Demo", project.links.demo)
                        : null}
                      {project.links.github
                        ? renderLink("GitHub", project.links.github)
                        : null}
                      {project.links.repo
                        ? renderLink("Repository", project.links.repo)
                        : null}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {Array.isArray(stack) && stack.length > 0 ? (
        <section className="cv-document__section">
          <div className="cv-document__section-heading">
            <span className="cv-document__section-line" />
            <h2>{sections?.stack || "Stack"}</h2>
          </div>

          <div className="cv-document__stack-list">
            {stack.map((item, index) => (
              <article
                key={`${item.title || "stack-item"}-${index}`}
                className="cv-document__stack-card"
              >
                <h3>{item.title || ""}</h3>

                {Array.isArray(item.tech) && item.tech.length > 0 ? (
                  <p>{item.tech.join(" • ")}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}