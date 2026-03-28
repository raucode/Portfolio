export const SUPPORTED_LANGUAGES = ["es", "en", "pt"];
export const DEFAULT_LANGUAGE = "en";

export function normalizeLanguage(value) {
  if (!value || typeof value !== "string") return DEFAULT_LANGUAGE;

  const lower = value.toLowerCase();

  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("pt")) return "pt";
  if (lower.startsWith("en")) return "en";

  return DEFAULT_LANGUAGE;
}

export function detectBrowserLanguage() {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  return normalizeLanguage(navigator.language);
}2