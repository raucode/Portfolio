import {
  SiRust,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiPython,
  SiC,
  SiCplusplus,
  SiSharp,
  SiDotnet,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiDocker,
  SiGithub,
  SiGit,
  SiStripe,
  SiNextdotjs,
  SiVite,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiLinux,
} from "react-icons/si";

import {
  FaCss3Alt,
  FaAws,
} from "react-icons/fa";

import { Code2 } from "lucide-react";

export const techIcons = {
  rust: SiRust,
  react: SiReact,
  javascript: SiJavascript,
  typescript: SiTypescript,
  html: SiHtml5,

  css: FaCss3Alt,
  css3: FaCss3Alt,

  python: SiPython,
  c: SiC,
  "c++": SiCplusplus,
  "c#": SiSharp,
  ".net": SiDotnet,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  redis: SiRedis,
  docker: SiDocker,
  github: SiGithub,
  git: SiGit,
  stripe: SiStripe,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  vite: SiVite,
  nodejs: SiNodedotjs,
  "node.js": SiNodedotjs,
  mongodb: SiMongodb,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  linux: SiLinux,

  aws: FaAws,
  "amazon web services": FaAws,

  "actix web": Code2,
  actix: Code2,
  sqlx: Code2,
};

export function normalizeTechName(name = "") {
  return name.trim().toLowerCase();
}

export function getTechIcon(name) {
  const key = normalizeTechName(name);
  return techIcons[key] || Code2;
}