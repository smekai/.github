(() => {
  "use strict";

  const slides = [...document.querySelectorAll(".slide")];
  const currentLabel = document.querySelector("[data-current]");
  const progress = document.querySelector("[data-progress]");
  const previousButton = document.querySelector('[data-action="previous"]');
  const nextButton = document.querySelector('[data-action="next"]');
  const fullscreenButton = document.querySelector('[data-action="fullscreen"]');
  let current = 0;
  let touchStartX = null;

  const clamp = (value) => Math.max(0, Math.min(slides.length - 1, value));
  const number = (value) => String(value + 1).padStart(2, "0");

  function indexFromHash() {
    const match = location.hash.match(/^#slide-(\d+)$/);
    return match ? clamp(Number(match[1]) - 1) : 0;
  }

  function render(index, updateHash = true) {
    current = clamp(index);
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === current);
      slide.classList.toggle("is-before", slideIndex < current);
      slide.hidden = slideIndex !== current;
      slide.setAttribute("aria-hidden", String(slideIndex !== current));
    });
    currentLabel.textContent = number(current);
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    previousButton.disabled = current === 0;
    nextButton.disabled = current === slides.length - 1;
    document.title = `${number(current)} · Isotopy — ${slides[current].querySelector("h1,h2")?.textContent.trim() ?? "Presentation"}`;
    if (updateHash) history.replaceState(null, "", `#slide-${current + 1}`);
  }

  function move(delta) { render(current + delta); }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  }

  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  fullscreenButton.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", () => {
    const active = Boolean(document.fullscreenElement);
    fullscreenButton.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
    fullscreenButton.textContent = active ? "×" : "⛶";
  });

  document.addEventListener("keydown", (event) => {
    if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); move(1); }
    if (["ArrowLeft", "PageUp"].includes(event.key)) { event.preventDefault(); move(-1); }
    if (event.key === "Home") { event.preventDefault(); render(0); }
    if (event.key === "End") { event.preventDefault(); render(slides.length - 1); }
    if (event.key.toLowerCase() === "f") { event.preventDefault(); void toggleFullscreen(); }
  });

  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });
  document.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 48) move(distance < 0 ? 1 : -1);
  }, { passive: true });

  window.addEventListener("hashchange", () => render(indexFromHash(), false));
  render(indexFromHash(), false);
})();
