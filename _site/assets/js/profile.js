document.addEventListener("DOMContentLoaded", () => {
  const topButton = document.querySelector(".top-button");
  const reveals = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("main section[id]");
  const publicationGroups = document.querySelectorAll(".publication-group");
  const topbar = document.querySelector(".topbar");

  let lastScrollY = window.scrollY;

  function openPublication(group) {
    const button = group.querySelector(".publication-year");
    const items = group.querySelector(".publication-items");
    if (!button || !items) return;

    group.classList.remove("collapsed");
    button.setAttribute("aria-expanded", "true");

    items.style.maxHeight = items.scrollHeight + "px";
    items.style.opacity = "1";
    items.style.marginTop = "8px";
  }

  function closePublication(group) {
    const button = group.querySelector(".publication-year");
    const items = group.querySelector(".publication-items");
    if (!button || !items) return;

    button.setAttribute("aria-expanded", "false");
    items.style.maxHeight = items.scrollHeight + "px";

    requestAnimationFrame(() => {
      group.classList.add("collapsed");
      items.style.maxHeight = "0px";
      items.style.opacity = "0";
      items.style.marginTop = "0px";
    });
  }

  function syncInitialPublicationState() {
    publicationGroups.forEach((group) => {
      const button = group.querySelector(".publication-year");
      const items = group.querySelector(".publication-items");
      if (!button || !items) return;

      const expanded = button.getAttribute("aria-expanded") === "true";

      if (expanded) {
        group.classList.remove("collapsed");
        items.style.maxHeight = items.scrollHeight + "px";
        items.style.opacity = "1";
        items.style.marginTop = "8px";
      } else {
        group.classList.add("collapsed");
        items.style.maxHeight = "0px";
        items.style.opacity = "0";
        items.style.marginTop = "0px";
      }
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".publication-year");
    if (!button) return;

    const group = button.closest(".publication-group");
    const items = group?.querySelector(".publication-items");
    if (!group || !items) return;

    const expanded = button.getAttribute("aria-expanded") === "true";

    if (expanded) {
      closePublication(group);
    } else {
      openPublication(group);
    }
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((item) => revealObserver.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("visible"));
  }

  function activateNav() {
    const scrollY = window.scrollY + 140;
    let currentId = "";

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  }

  function toggleTopButton() {
    if (!topButton) return;
    topButton.classList.toggle("show", window.scrollY > 320);
  }

  function updateTopbarState() {
    if (!topbar) return;

    const currentScrollY = window.scrollY;
    const isScrolled = currentScrollY > 24;
    const isGoingDown = currentScrollY > lastScrollY;
    const isNearTop = currentScrollY < 80;

    topbar.classList.toggle("scrolled", isScrolled);

    if (isNearTop) {
      topbar.classList.remove("hide");
    } else if (isGoingDown) {
      topbar.classList.add("hide");
    } else {
      topbar.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
  }

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("resize", () => {
    publicationGroups.forEach((group) => {
      const button = group.querySelector(".publication-year");
      const items = group.querySelector(".publication-items");
      if (!button || !items) return;

      const expanded = button.getAttribute("aria-expanded") === "true";
      if (expanded) {
        items.style.maxHeight = items.scrollHeight + "px";
      }
    });
  });

  window.addEventListener("scroll", () => {
    activateNav();
    toggleTopButton();
    updateTopbarState();
  });

  syncInitialPublicationState();
  activateNav();
  toggleTopButton();
  updateTopbarState();
});