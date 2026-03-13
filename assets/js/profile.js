document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".menu a");
  const revealEls = document.querySelectorAll(".reveal");
  const topButton = document.getElementById("topButton");
  const paperGroups = document.querySelectorAll(".paper-group");

  const setActiveNav = () => {
    let currentId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140 && rect.bottom >= 140) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
    });
  };

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealEls.forEach((el) => {
    if (!el.classList.contains("visible")) {
      revealObserver.observe(el);
    }
  });

  paperGroups.forEach((group) => {
    const header = group.querySelector(".paper-group-year");
    if (!header) return;

    const toggleGroup = () => {
      const collapsed = group.classList.toggle("collapsed");
      header.setAttribute("aria-expanded", String(!collapsed));
    };

    header.addEventListener("click", toggleGroup);

    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleGroup();
      }
    });
  });

  const toggleTopButton = () => {
    if (!topButton) return;

    if (window.scrollY > 320) {
      topButton.classList.add("show");
    } else {
      topButton.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggleTopButton, { passive: true });
  toggleTopButton();

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});