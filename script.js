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

// Render reusable caution tape that spans the entire current viewport.
class WipBanner extends HTMLElement {
  connectedCallback() {
    this.render();
    this.resizeObserver = new ResizeObserver(() => this.render());
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  render() {
    const style = getComputedStyle(this);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

    const patterns = [
      ">",
      "WORK IN PROGRESS --⚠︎-- ",
      "<",
    ];
    const repeats = Math.ceil(this.clientWidth / context.measureText(patterns[0]).width) + 1;

    this.replaceChildren(
      ...patterns.map((pattern) => {
        const line = document.createElement("div");
        line.textContent = pattern.repeat(repeats);
        return line;
      }),
    );
  }
}

customElements.define("wip-banner", WipBanner);
