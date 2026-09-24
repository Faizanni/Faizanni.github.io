// Fill in footer's "last updated" date automatically.
const lastUpdated = document.getElementById("last-updated");
if (lastUpdated) {
  const today = new Date();
  lastUpdated.textContent = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    // day: "numeric",
  });
}

// 2. Highlight the active nav link based on scroll position.
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav nav a");

function highlightNav() {
  const scrollPos = window.scrollY + 120; // offset for sticky nav height

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav nav a[href="#${id}"]`);

    if (!link) return;

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((l) => l.style.color = "");
      link.style.color = "var(--accent)";
    }
  });
}

window.addEventListener("scroll", highlightNav);
highlightNav();

// For smooth scroll instead of teleporting (when clicking links at the top).
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

