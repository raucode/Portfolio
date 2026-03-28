import React, { useState, useEffect } from "react";
import { ExternalLink, ImageIcon } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getTechIcon } from "../../lib/content/techIcons";
import { useLanguage } from "../../context/LanguageContext";

export default function ProjectShowcaseCard({ project }) {
  const { language } = useLanguage();
  const [imgStatus, setImgStatus] = useState("loading"); // loading, loaded, error

  // Resetear estado si cambia el proyecto
  useEffect(() => {
    setImgStatus("loading");
  }, [project?.slug]);

  const content = project?.content?.[language] || project?.content?.en || {};
  const category = project?.category?.[language] || project?.category?.en || "Project";
  const alt = project?.media?.alt?.[language] || project?.media?.alt?.en || "Project preview";

  // Fix de ruta: asegura el slash inicial para archivos en /public
  const coverSrc = project?.media?.cover 
    ? (project.media.cover.startsWith('http') || project.media.cover.startsWith('/') 
        ? project.media.cover 
        : `/${project.media.cover}`)
    : null;

  return (
    <article className="projects-showcase__card">
      <div className="projects-showcase__card-glow"></div>

      <div className="projects-showcase__card-shell">
        <div className="projects-showcase__card-topbar">
          <div className="projects-showcase__card-dots">
            <span className="dot-red"></span>
            <span className="dot-amber"></span>
            <span className="dot-green"></span>
          </div>
          <div className="projects-showcase__card-pill"></div>
        </div>

        <div className="projects-showcase__media">
          {/* Skeleton/Loader mientras carga Drive */}
          {imgStatus !== "loaded" && (
            <div className={`projects-showcase__skeleton ${imgStatus === "error" ? "is-error" : "is-loading"}`}>
              {imgStatus === "error" ? (
                <div className="error-placeholder">
                  <ImageIcon size={20} />
                  <span>Imagen no encontrada</span>
                </div>
              ) : (
                <div className="shimmer-effect"></div>
              )}
            </div>
          )}

          {coverSrc && (
            <img
              src={coverSrc}
              alt={alt}
              className={`projects-showcase__image ${imgStatus === 'loaded' ? 'is-visible' : 'is-hidden'}`}
              onLoad={() => setImgStatus("loaded")}
              onError={() => setImgStatus("error")}
              loading="lazy"
            />
          )}
          <div className="projects-showcase__media-overlay"></div>
        </div>

        <div className="projects-showcase__card-content">
          <div className="projects-showcase__card-header">
            <span className="projects-showcase__badge">{category}</span>
            <div className="projects-showcase__actions">
              {project?.links?.github && (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="projects-showcase__icon-btn">
                  <SiGithub size={15} />
                </a>
              )}
              {project?.links?.demo && (
                <a href={project.links.demo} target="_blank" rel="noreferrer" className="projects-showcase__icon-btn">
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          <h3 className="projects-showcase__card-title">
            {content?.title || project?.slug}
          </h3>

          <p className="projects-showcase__card-description">
            {content?.summary}
          </p>

          {project?.stack && (
            <div className="projects-showcase__stack">
              {project.stack.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <div key={tech} className="projects-showcase__stack-item">
                    <span className="projects-showcase__stack-icon"><Icon size={12} /></span>
                    <span className="projects-showcase__stack-name">{tech}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}