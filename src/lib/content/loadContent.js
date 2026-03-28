import profile from "../../content/site/profile.json";
import about from "../../content/site/about.json";
import stack from "../../content/site/stack.json";
import contact from "../../content/site/contact.json";
import cv from "../../content/site/cv.json";

const projectModules = import.meta.glob("../../content/projects/*.json", {
  eager: true,
  import: "default",
});

const projects = Object.values(projectModules);

export function loadProjects() {
  return projects;
}

export function loadSiteContent() {
  return {
    profile,
    about,
    stack,
    contact,
    cv,
    projects,
  };
}