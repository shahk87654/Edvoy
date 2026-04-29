const navItems = [
  ["about.html", "About"],
  ["services.html", "Services"],
  ["studydestinations.html", "Destinations"],
  ["scholarships.html", "Scholarships"],
  ["contact.html", "Contact"],
];

function injectLayout() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  const path = window.location.pathname.split("/").pop() || "index.html";
  const isCountry = window.location.pathname.includes("/allcountries/");
  const root = isCountry ? "../" : "";
  if (header) {
    header.className = "main-header";
    header.innerHTML = `
      <div class="container navbar">
        <a class="nav-brand" href="${root}index.html">
          <i class="fa-solid fa-graduation-cap"></i>
          Enrollio
        </a>
        <button class="menu-toggle" aria-label="Open navigation">
          <i class="fa-solid fa-bars-staggered"></i>
        </button>
        <nav class="nav-links">
          ${navItems
            .map(
              ([href, label]) =>
                `<a href="${root}${href}" class="${path === href ? "active" : ""}">${label}</a>`
            )
            .join("")}
          <a href="${root}applynow.html" class="btn btn-primary">Apply Now</a>
        </nav>
      </div>
    `;
  }
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="footer-brand">
              <i class="fa-solid fa-graduation-cap"></i>
              Enrollio
            </div>
            <p class="footer-description">Empowering students worldwide to achieve their academic and career aspirations through expert guidance in admissions and visa processing.</p>
            <div class="footer-social">
              <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <div class="footer-links">
              <a href="${root}about.html">About Us</a>
              <a href="${root}services.html">Our Services</a>
              <a href="${root}studydestinations.html">Study Destinations</a>
              <a href="${root}scholarships.html">Scholarships</a>
              <a href="${root}contact.html">Contact</a>
              <a href="${root}applynow.html">Apply Now</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Study Destinations</h4>
            <div class="footer-links">
              <a href="${root}allcountries/france.html">France</a>
              <a href="${root}allcountries/usa.html">United States</a>
              <a href="${root}allcountries/uk.html">United Kingdom</a>
              <a href="${root}allcountries/canada.html">Canada</a>
              <a href="${root}allcountries/australia.html">Australia</a>
              <a href="${root}allcountries/ireland.html">Ireland</a>
              <a href="${root}allcountries/wales.html">Wales</a>
              <a href="${root}allcountries/europe.html">Europe</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Contact Us</h4>
            <div class="footer-contact-item">
              <i class="fa-solid fa-phone"></i>
              <span>+92-300-4074318</span>
            </div>
            <div class="footer-contact-item">
              <i class="fa-solid fa-envelope"></i>
              <span>info@Enrollio.com</span>
            </div>
            <div class="footer-contact-item">
              <i class="fa-solid fa-paper-plane"></i>
              <span>admissions@Enrollio.com</span>
            </div>
            <div class="footer-contact-item">
              <i class="fa-solid fa-location-dot"></i>
              <span>Lahore, Pakistan</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2025 Enrollio. All rights reserved.</span>
          <span>
            <a href="${root}privacypolicy.html">Privacy Policy</a> · <a href="${root}termsofservice.html">Terms of Service</a>
          </span>
        </div>
      </div>
    `;
  }
}

function initNav() {
  const header = document.querySelector(".main-header");
  const nav = document.querySelector(".nav-links");
  const toggle = document.querySelector(".menu-toggle");
  if (!header || !nav || !toggle) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 80);
  onScroll();
  window.addEventListener("scroll", onScroll);
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.counter || 0);
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const dur = 1500;
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.floor(target * p).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.35 }
  );
  counters.forEach((c) => obs.observe(c));
}

function initFaq() {
  document.querySelectorAll(".faq-item .faq-q").forEach((q) => {
    q.addEventListener("click", () => q.parentElement.classList.toggle("open"));
  });
}

function initTimelines() {
  const items = document.querySelectorAll(".timeline");
  if (!items.length) return;
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("animate")),
    { threshold: 0.3 }
  );
  items.forEach((t) => obs.observe(t));
}

function initExpenseBars() {
  const fills = document.querySelectorAll(".expense-fill");
  if (!fills.length) return;
  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      }),
    { threshold: 0.45 }
  );
  fills.forEach((f) => obs.observe(f));
}

function initScholarshipsFilter() {
  const filters = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-region]");
  if (!filters.length) return;
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("btn-primary"));
      btn.classList.add("btn-primary");
      const region = btn.dataset.filter;
      cards.forEach((card) => {
        const show = region === "all" || card.dataset.region.includes(region);
        card.style.opacity = show ? "1" : "0";
        card.style.transform = show ? "scale(1)" : "scale(0.96)";
        card.style.pointerEvents = show ? "auto" : "none";
        card.style.position = show ? "relative" : "absolute";
      });
    })
  );
}

function initCostCalculator() {
  const form = document.getElementById("cost-calculator");
  if (!form) return;
  console.log("Cost calculator initialized");
  const country = document.getElementById("country");
  const tuition = document.getElementById("tuition");
  const living = document.getElementById("living");
  const months = document.getElementById("months");
  const monthsVal = document.getElementById("months-val");
  const output = document.getElementById("cost-output");
  const preset = {
    Canada: [3500000, 180000],
    USA: [4500000, 200000],
    UK: [3800000, 160000],
    Australia: [3200000, 170000],
    Europe: [500000, 130000],
    France: [800000, 140000],
    Ireland: [2800000, 155000],
    Wales: [2600000, 145000],
  };
  country.addEventListener("change", () => {
    const [t, l] = preset[country.value];
    tuition.value = t;
    living.value = l;
  });
  months.addEventListener("input", () => (monthsVal.textContent = months.value));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted, calculating...");
    const total = Number(tuition.value) + Number(living.value) * Number(months.value);
    console.log("Total:", total);
    let n = 0;
    const step = total / 30;
    const timer = setInterval(() => {
      n += step;
      if (n >= total) {
        n = total;
        clearInterval(timer);
      }
      output.textContent = `Estimated Total Cost: PKR ${Math.round(n).toLocaleString()}`;
    }, 45);
  });
}

function initApplyForm() {
  const form = document.getElementById("apply-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.innerHTML = `
      <div style="text-align:center;padding:30px 10px;">
        <div style="font-size:56px;color:var(--secondary);">✅</div>
        <h3>Application Submitted Successfully</h3>
        <p>Our admissions advisors will contact you within 24 hours to guide your next steps.</p>
      </div>
    `;
  });
}

function initUniversitySlider() {
  const wrappers = document.querySelectorAll(".university-slider-wrapper");
  wrappers.forEach((wrapper) => {
    const scroll = wrapper.querySelector(".university-scroll");
    const prevBtn = wrapper.querySelector(".slider-btn.prev");
    const nextBtn = wrapper.querySelector(".slider-btn.next");
    if (!scroll || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 320;
    
    prevBtn.addEventListener("click", () => {
      scroll.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    
    nextBtn.addEventListener("click", () => {
      scroll.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
    
    // Hide/show buttons based on scroll position
    const updateButtons = () => {
      prevBtn.style.opacity = scroll.scrollLeft <= 0 ? "0.4" : "1";
      prevBtn.style.pointerEvents = scroll.scrollLeft <= 0 ? "none" : "auto";
      nextBtn.style.opacity = scroll.scrollLeft >= scroll.scrollWidth - scroll.clientWidth - 1 ? "0.4" : "1";
      nextBtn.style.pointerEvents = scroll.scrollLeft >= scroll.scrollWidth - scroll.clientWidth - 1 ? "none" : "auto";
    };
    
    scroll.addEventListener("scroll", updateButtons);
    updateButtons();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  injectLayout();
  initNav();
  initCounters();
  initFaq();
  initTimelines();
  initExpenseBars();
  initScholarshipsFilter();
  initCostCalculator();
  initApplyForm();
  initUniversitySlider();
  if (window.AOS) AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
});
