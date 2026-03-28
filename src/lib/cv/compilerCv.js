import { getAbout, getProfile, getStack, getProjects, getCv } from "../content/selectors";

export function compileCv(language = "en") {
  const profile = getProfile(language);
  const about = getAbout(language);
  const stack = getStack(language);
  const projects = getProjects(language);
  const cv = getCv(language);

  const settings = cv?.settings || {};
  const localizedContent = cv?.content || {};

  const selectedProjectSlugs = Array.isArray(settings.selectedProjectSlugs)
    ? settings.selectedProjectSlugs
    : [];

  let selectedProjects = Array.isArray(projects) ? [...projects] : [];

  if (selectedProjectSlugs.length > 0) {
    selectedProjects = selectedProjects.filter((project) =>
      selectedProjectSlugs.includes(project.slug || project.id)
    );
  }

  if (typeof settings.maxProjects === "number") {
    selectedProjects = selectedProjects.slice(0, settings.maxProjects);
  }

  const summary =
    settings.includeAboutSummary
      ? about?.summary || localizedContent.summary
      : localizedContent.summary;

  return {
    meta: {
      language,
      title: localizedContent.title || "Resume"
    },
    basics: {
      name: profile?.name || "",
      role: profile?.role || "",
      email: profile?.email || "",
      website: profile?.website || "",
      github: profile?.github || "",
      linkedin: profile?.linkedin || "",
      location: profile?.location || ""
    },
    sections: localizedContent.sections || {},
    summary: summary || "",
    projects: selectedProjects,
    stack: settings.includeStack ? stack?.items || [] : [],
    settings
  };
}