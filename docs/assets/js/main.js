/* ==========================================================================
   Osama Arafa — Portfolio interactions
   ========================================================================== */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Header state + scroll progress ---------- */
  const header = document.querySelector(".site-header");
  const progress = document.getElementById("progress");
  const backToTop = document.getElementById("back-to-top");

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 12);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }

    if (backToTop) {
      backToTop.classList.toggle("is-visible", y > 600);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  const body = document.body;

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    body.classList.toggle("nav-open", open);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
  }

  menu &&
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) setMenu(false);
  });

  /* ---------- Active section in navigation ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = navLinks
    .map(function (link) {
      const id = link.getAttribute("href");
      const section = id && id.startsWith("#") && document.querySelector(id);
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (l) {
            l.classList.remove("is-active");
          });
          const match = sections.find(function (s) {
            return s.section === entry.target;
          });
          if (match) match.link.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (s) {
      navObserver.observe(s.section);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Typewriter ---------- */
  const typed = document.getElementById("typed");
  const words = [
    "Laravel applications",
    "REST APIs",
    "MySQL databases",
    "clean architecture",
  ];

  if (typed) {
    if (prefersReducedMotion) {
      typed.textContent = words[0];
    } else {
      let wordIndex = 0;
      let charIndex = words[0].length;
      let deleting = true;

      typed.textContent = words[0];

      (function tick() {
        const word = words[wordIndex];
        typed.textContent = word.slice(0, charIndex);

        let delay = deleting ? 40 : 75;

        if (!deleting && charIndex === word.length) {
          deleting = true;
          delay = 1900;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 320;
        } else {
          charIndex += deleting ? -1 : 1;
        }

        window.setTimeout(tick, delay);
      })();
    }
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target + suffix;
    }

    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      el.textContent = "0" + (el.getAttribute("data-suffix") || "");
      counterObserver.observe(el);
    });
  }

  /* ---------- Project filters ---------- */
  const filters = Array.from(document.querySelectorAll(".filter"));
  const projects = Array.from(document.querySelectorAll(".project"));

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.getAttribute("data-filter");

      filters.forEach(function (b) {
        const active = b === button;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      projects.forEach(function (project) {
        const match =
          filter === "all" || project.getAttribute("data-cat") === filter;
        project.classList.toggle("is-hidden", !match);
        if (match) project.classList.add("is-visible");
      });
    });
  });

  /* ---------- Contact form (mailto) ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        if (status) {
          status.style.color = "#ff9b9b";
          status.textContent = "Please fill in your name, a valid email and a message.";
        }
        return;
      }

      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const subject = (data.get("subject") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      const mailSubject =
        subject || "Project inquiry from " + (name || "your portfolio");
      const bodyText =
        message +
        "\n\n—\n" +
        name +
        "\n" +
        email;

      const mailto =
        "mailto:osamaarafa15@gmail.com" +
        "?subject=" +
        encodeURIComponent(mailSubject) +
        "&body=" +
        encodeURIComponent(bodyText);

      if (status) {
        status.style.color = "#7ee7c7";
        status.textContent =
          "Opening your email app… If nothing happens, email osamaarafa15@gmail.com directly.";
      }

      window.location.href = mailto;

      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
