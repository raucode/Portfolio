import { loadSiteContent } from "./loadContent";
import { getLocalizedValue, isVisible, safeArray, sortByOrder } from "./helpers";

export function getProfile(language) {
  const { profile = {} } = loadSiteContent();

  return {
    name: profile.name || "",
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    role: getLocalizedValue(profile.role, language) || "",
    hero: getLocalizedValue(profile.hero, language) || "",
  };
}

export function getAbout(language) {
  const { about = {} } = loadSiteContent();
  const localized = getLocalizedValue(about.content, language) || {};

  return {
    ...(about.public || {}),
    ...localized,
  };
}

export function getStack(language) {
  const { stack = {} } = loadSiteContent();
  return getLocalizedValue(stack.content, language) || {};
}

export function getContact(language) {
  const { contact = {} } = loadSiteContent();
  const localized = getLocalizedValue(contact.content, language) || {};

  return {
    email: contact.email || "",
    github: contact.github || "",
    linkedin: contact.linkedin || "",
    ...localized,
  };
}

export function getProjects(language) {
  const { projects = [] } = loadSiteContent();

  return sortByOrder(safeArray(projects))
    .filter(isVisible)
    .map((project = {}) => {
      const localized = getLocalizedValue(project.content, language) || {};

      return {
        slug: project.slug || "",
        featured: !!project.featured,
        visible: project.visible !== false,
        includeInCv: !!project.includeInCv,
        order: typeof project.order === "number" ? project.order : 9999,
        stack: safeArray(project.stack),
        period: project.period || null,
        links: project.links || {},
        media: project.media || null,
        ...localized,
      };
    });
}

export function getFeaturedProjects(language) {
  return getProjects(language).filter((project) => project.featured);
}

export function getCvData(language) {
  const { cv = {} } = loadSiteContent();

  const profile = getProfile(language);
  const about = getAbout(language);
  const contact = getContact(language);
  const stack = getStack(language);

  const localizedCv = getLocalizedValue(cv.content, language) || {};
  const settings = cv.settings || {};
  const sections = localizedCv.sections || {};

  const maxProjects =
    typeof settings.maxProjects === "number" ? settings.maxProjects : 4;

  const includeAboutSummary = settings.includeAboutSummary !== false;
  const includeStack = settings.includeStack !== false;
  const includeContact = settings.includeContact !== false;

  const projects = getProjects(language)
    .filter((project) => project.includeInCv)
    .slice(0, maxProjects);

  const summaryCandidates = [
    localizedCv.summary,
    includeAboutSummary ? about.summary : "",
    includeAboutSummary ? about.description : "",
    includeAboutSummary ? about.paragraph : "",
    includeAboutSummary ? about.text : "",
  ];

  const summary = summaryCandidates.find(
    (value) => typeof value === "string" && value.trim().length > 0
  ) || "";

  return {
    meta: {
      language,
      title: localizedCv.title || "CV",
    },
    settings: {
      maxProjects,
      includeAboutSummary,
      includeStack,
      includeContact,
      ...settings,
    },
    sections: {
      summary: sections.summary || "Summary",
      projects: sections.projects || "Projects",
      stack: sections.stack || "Stack",
      contact: sections.contact || "Contact",
      ...sections,
    },
    basics: {
      name: profile.name || "",
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      role: profile.role || "",
      email: cv.basics?.email || contact.email || "",
      website: cv.basics?.website || "",
      github: cv.basics?.github || contact.github || "",
      linkedin: cv.basics?.linkedin || contact.linkedin || "",
      location: cv.basics?.location || "",
    },
    summary,
    projects,
    stack: includeStack ? safeArray(stack.items) : [],
    contact: includeContact
      ? {
          email: cv.basics?.email || contact.email || "",
          github: cv.basics?.github || contact.github || "",
          linkedin: cv.basics?.linkedin || contact.linkedin || "",
          website: cv.basics?.website || "",
          location: cv.basics?.location || "",
        }
      : null,
  };
}