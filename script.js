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
setYear();
setupNav();
setupSmoothScroll();
setupToasts();