document.addEventListener("DOMContentLoaded", () => {
  const navLinks = Array.from(document.querySelectorAll(".section-nav a"));
  const sections = Array.from(document.querySelectorAll(".section[id]"));
  const reveals = Array.from(document.querySelectorAll(".reveal"));
  const topButton = document.querySelector(".top-button");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const setActiveNav = () => {
    const currentY = window.scrollY + 180;
    let currentId = "";

    sections.forEach((section) => {
      if (currentY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  const toggleTopButton = () => {
    if (!topButton) return;
    topButton.classList.toggle("show", window.scrollY > 360);
  };

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("visible"));
  }

  window.addEventListener("scroll", () => {
    setActiveNav();
    toggleTopButton();
  });

  setActiveNav();
  toggleTopButton();
});
