import { loadSiteContent } from "./loadContent";
import { getLocalizedValue, isVisible, safeArray, sortByOrder } from "./helpers";

export function getProfile(language) {
  const { profile } = loadSiteContent();

  return {
    name: profile.name,
    firstName: profile.firstName,
    lastName: profile.lastName,
    role: getLocalizedValue(profile.role, language),
    hero: getLocalizedValue(profile.hero, language),
  };
}

export function getAbout(language) {
  const { about } = loadSiteContent();
  const localized = getLocalizedValue(about.content, language);

  return {
    ...about.public,
    ...localized,
  };
}

export function getMindset(language) {
  const { mindset } = loadSiteContent();
  return getLocalizedValue(mindset.content, language);
}

export function getStack(language) {
  const { stack } = loadSiteContent();
  return getLocalizedValue(stack.content, language);
}

export function getContact(language) {
  const { contact } = loadSiteContent();
  const localized = getLocalizedValue(contact.content, language);

  return {
    email: contact.email,
    github: contact.github,
    linkedin: contact.linkedin,
    ...localized,
  };
}

export function getProjects(language) {
  const { projects } = loadSiteContent();

  return sortByOrder(projects)
    .filter(isVisible)
    .map((project) => {
      const localized = getLocalizedValue(project.content, language);

      return {
        slug: project.slug,
        featured: !!project.featured,
        visible: project.visible !== false,
        includeInCv: !!project.includeInCv,
        order: project.order,
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
  const { cv } = loadSiteContent();
  const profile = getProfile(language);
  const about = getAbout(language);
  const localizedCv = getLocalizedValue(cv.content, language);

  const projects = getProjects(language)
    .filter((project) => project.includeInCv)
    .slice(0, cv.settings?.maxProjects || 4);

  return {
    title: localizedCv?.title || "CV",
    basics: {
      name: profile.name,
      role: profile.role,
      email: cv.basics?.email || "",
      website: cv.basics?.website || "",
      github: cv.basics?.github || "",
      linkedin: cv.basics?.linkedin || "",
      location: cv.basics?.location || "",
    },
    summary: localizedCv?.summary || about.description || "",
    projects,
  };
}