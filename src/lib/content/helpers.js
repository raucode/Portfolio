export function getLocalizedValue(record, language, fallbackOrder = ["en", "es", "pt"]) {
  if (!record || typeof record !== "object") return null;

  if (record[language] != null) return record[language];

  for (const fallback of fallbackOrder) {
    if (record[fallback] != null) return record[fallback];
  }

  return null;
}

export function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

export function isVisible(item) {
  return item?.visible !== false;
}

export function sortByOrder(items = []) {
  return [...items].sort((a, b) => {
    const aOrder = typeof a?.order === "number" ? a.order : 9999;
    const bOrder = typeof b?.order === "number" ? b.order : 9999;
    return aOrder - bOrder;
  });
}