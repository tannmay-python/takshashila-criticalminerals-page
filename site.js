document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (!track || !previous || !next) return;

  const scrollDistance = () => {
    const card = track.querySelector(".cm-content-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  };

  const updateControls = () => {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScroll - 2;
  };

  previous.addEventListener("click", () => {
    track.scrollBy({ left: -scrollDistance(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: scrollDistance(), behavior: "smooth" });
  });

  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls, { passive: true });
  updateControls();
});
