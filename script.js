const $ = (sel, root = document) => root.querySelector(sel);
function setYear() {
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}
function toast(message) {
  const el = $(".toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-visible");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => el.classList.remove("is-visible"), 1800);
}
function setupNav() {
  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  if (!toggle || !nav) return;
  const setExpanded = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", isOpen);
  };
  setExpanded(false);
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    setExpanded(!isOpen);
  });
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    setExpanded(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setExpanded(false);
  });
  document.addEventListener("click", (e) => {
    const isOpen = nav.classList.contains("is-open");
    if (!isOpen) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    setExpanded(false);
  });
}
function setupSmoothScroll() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", href);
  });
}
function setupToasts() {
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-toast]");
    if (!el) return;
    e.preventDefault();
    toast(el.getAttribute("data-toast") || "Coming soon");
  });
}
function setupDropdowns() {
  const dropdownWrappers = Array.from(document.querySelectorAll('[data-dropdown]'));
  if (!dropdownWrappers.length) return;
  const supportsHover = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches;

  dropdownWrappers.forEach((wrap) => {
    const btn = wrap.querySelector('.nav-item-toggle');
    const menu = wrap.querySelector('.dropdown');
    if (!btn || !menu) return;

    const setOpen = (isOpen) => {
      wrap.classList.toggle('nav-item--open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-hidden', String(!isOpen));
    };

    // initialize
    setOpen(false);

    if (supportsHover) {
      // Hover-capable devices: open via CSS :hover and :focus-within.
      // Add focus handlers so keyboard users get correct aria states.
      wrap.addEventListener('focusin', () => setOpen(true));
      wrap.addEventListener('focusout', (e) => {
        if (!wrap.contains(e.relatedTarget)) setOpen(false);
      });
    } else {
      // Touch / no-hover devices: toggle via click
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const isOpen = wrap.classList.contains('nav-item--open');
        setOpen(!isOpen);
      });
      // close with Escape when focused inside
      wrap.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') setOpen(false);
      });
    }
  });

  // click outside to close all
  document.addEventListener('click', (e) => {
    dropdownWrappers.forEach((wrap) => {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('nav-item--open');
        const btn = wrap.querySelector('.nav-item-toggle');
        const menu = wrap.querySelector('.dropdown');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (menu) menu.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // global Escape to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownWrappers.forEach((wrap) => {
        wrap.classList.remove('nav-item--open');
        const btn = wrap.querySelector('.nav-item-toggle');
        const menu = wrap.querySelector('.dropdown');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (menu) menu.setAttribute('aria-hidden', 'true');
      });
    }
  });
}
setYear();
setupNav();
setupSmoothScroll();
setupToasts();
setupDropdowns();