document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-fade");

  // Scroll animation on viewport entry
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  scrollElements.forEach((el) => observer.observe(el));

  // Mobile Navigation Toggle
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  const form = document.getElementById("footprint-form");
  const result = document.getElementById("result");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const product = document.getElementById("product").value;
      const frequency = parseFloat(document.getElementById("frequency").value);
      const duration = parseFloat(document.getElementById("duration").value);

      if (
        !product ||
        !frequency ||
        !duration ||
        frequency <= 0 ||
        duration <= 0
      ) {
        result.innerHTML = `<p style="color: red;">Please enter valid input in all fields.</p>`;
        return;
      }

      // Eco product emissions (g CO₂ per use)
      const emissionsPerUse = {
        toothbrush: 9,
        bag: 4,
        straws: 1.5,
        compost: 12,
        beeswax: 3,
        shampoo: 5,
        notebook: 2.5,
        bowl: 7,
      };

      // Disposable/plastic product equivalents (g CO₂ per use)
      const disposableEmissions = {
        toothbrush: 24, // Plastic toothbrush
        bag: 20, // Plastic bag
        straws: 5, // Disposable plastic straw
        compost: 30, // Plastic food bin or landfill bag
        beeswax: 8, // Plastic wrap
        shampoo: 25, // Plastic shampoo bottle
        notebook: 8, // Standard virgin paper notebook
        bowl: 20, // Disposable plastic bowl
      };

      const totalUses = frequency * 4 * duration;
      const ecoTotal = totalUses * (emissionsPerUse[product] || 0);
      const disposableTotal = totalUses * (disposableEmissions[product] || 0);
      const saved = disposableTotal - ecoTotal;
      const percentSaved = ((saved / disposableTotal) * 100).toFixed(1);

      result.classList.add("show");

      result.innerHTML = `
          <h3>Result</h3>
    
          <p><strong>Your Carbon Footprint:</strong> ${(
            ecoTotal / 1000
          ).toFixed(2)} kg CO₂</p>
          <p><strong>If you used a plastic alternative:</strong> ${(
            disposableTotal / 1000
          ).toFixed(2)} kg CO₂</p>
          <p style="color: #2e7d32; font-weight: bold;">🎉 You've reduced emissions by <strong>${(
            saved / 1000
          ).toFixed(
            2
          )} kg CO₂</strong>, or <strong>${percentSaved}%</strong> compared to a disposable product!</p>
          <p style="font-size: 0.9rem; color: #333;">Keep choosing eco-friendly products — small choices add up to big changes for the planet.</p>
        `;
    });
  }

  // Contact form submission handler
  const contactForm = document.getElementById("contact-form");
  const statusBox = document.getElementById("form-status");

  if (contactForm && statusBox) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validate fields
      if (!name || !email || !subject || !message) {
        statusBox.textContent = "Please fill in all fields.";
        statusBox.className = "status-message error";
        statusBox.style.display = "block";
        return;
      }

      // Simulate success response
      statusBox.textContent =
        "Thank you! Your message has been sent successfully.";
      statusBox.className = "status-message success";
      statusBox.style.display = "block";

      // Reset the form
      contactForm.reset();

      // Hide status message after 5 seconds
      setTimeout(() => {
        statusBox.style.display = "none";
      }, 5000);
    });
  }
});
