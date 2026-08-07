/** Scrolls smoothly to the section with the given id (without the "#"). */
export function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
}

/** Scrolls smoothly back to the top of the page. */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
