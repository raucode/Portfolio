export function exportCvToPdf() {
  window.scrollTo({ top: 0, behavior: "instant" });
  setTimeout(() => {
    window.print();
  }, 120);
}