import { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  getAbout,
  getContact,
  getCvData,
  getFeaturedProjects,
  getMindset,
  getProfile,
  getProjects,
  getStack,
} from "./selectors";

export function useProfile() {
  const { language } = useLanguage();
  return useMemo(() => getProfile(language), [language]);
}

export function useAbout() {
  const { language } = useLanguage();
  return useMemo(() => getAbout(language), [language]);
}

export function useMindset() {
  const { language } = useLanguage();
  return useMemo(() => getMindset(language), [language]);
}

export function useStack() {
  const { language } = useLanguage();
  return useMemo(() => getStack(language), [language]);
}

export function useContactContent() {
  const { language } = useLanguage();
  return useMemo(() => getContact(language), [language]);
}

export function useProjects() {
  const { language } = useLanguage();
  return useMemo(() => getProjects(language), [language]);
}

export function useFeaturedProjects() {
  const { language } = useLanguage();
  return useMemo(() => getFeaturedProjects(language), [language]);
}

export function useCvData() {
  const { language } = useLanguage();
  return useMemo(() => getCvData(language), [language]);
}