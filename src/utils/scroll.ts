// Utility function for smooth scrolling with proper offset
export const smoothScrollTo = (elementId: string, offset: number = -80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

// Utility function for smooth scrolling to any element
export const smoothScrollToElement = (element: Element, offset: number = -80) => {
  const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};
