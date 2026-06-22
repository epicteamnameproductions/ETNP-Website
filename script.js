const projectSlider = document.querySelector("#projectSlider");
const projectButtons = document.querySelectorAll("[data-project-scroll]");

function getProjectStep() {
  const card = projectSlider?.querySelector(".project-card");
  if (!card) return 0;

  const sliderStyles = getComputedStyle(projectSlider.querySelector(".project-grid"));
  const gap = Number.parseFloat(sliderStyles.columnGap || sliderStyles.gap || 0);
  return card.getBoundingClientRect().width + gap;
}

function updateProjectButtons() {
  if (!projectSlider) return;

  const maxScroll = projectSlider.scrollWidth - projectSlider.clientWidth - 2;
  const hasOverflow = maxScroll > 2;

  projectButtons.forEach((button) => {
    const direction = Number(button.dataset.projectScroll);
    button.hidden = !hasOverflow;
    button.disabled = direction < 0 ? projectSlider.scrollLeft <= 2 : projectSlider.scrollLeft >= maxScroll;
  });
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    projectSlider.scrollBy({
      left: getProjectStep() * Number(button.dataset.projectScroll),
      behavior: "smooth",
    });
  });
});

projectSlider?.addEventListener("scroll", updateProjectButtons);
window.addEventListener("resize", updateProjectButtons);
updateProjectButtons();
document.querySelectorAll("[data-local-href]").forEach((link) => {
  if (window.location.protocol === "file:") {
    link.href = link.dataset.localHref;
  }
});