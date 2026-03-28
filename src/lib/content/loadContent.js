import profile from "../../content/site/profile.json";
import about from "../../content/site/about.json";
import mindset from "../../content/site/mindset.json";
import stack from "../../content/site/stack.json";
import contact from "../../content/site/contact.json";
import cv from "../../content/site/cv.json";

const projectModules = import.meta.glob("../../content/projects/*.json", {
  eager: true,
  import: "default",
});

export function loadProjects() {
  return Object.values(projectModules);
}

export function loadSiteContent() {
  return {
    profile,
    about,
    mindset,
    stack,
    contact,
    cv,
    projects: loadProjects(),
  };
}