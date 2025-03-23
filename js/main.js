// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Particles.js
  initParticles();

  // Mobile menu toggle
  initMobileMenu();

  // Smooth scrolling for nav links
  initSmoothScroll();

  // Animate skill bars on scroll
  initSkillBars();

  // Initialize testimonial slider
  initTestimonialSlider();

  // Form submission
  initContactForm();

  // Initialize navigation active state
  initNavActive();
});

// Initialize particles.js
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#3b82f6",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.2,
          random: false,
          anim: {
            enable: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#3b82f6",
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking on a nav link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

// Smooth scrolling for nav links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only apply to links pointing to an ID on the same page
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset for fixed header
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Animate skill bars on scroll
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");

  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Function to animate skill bars
  function animateSkillBars() {
    skillBars.forEach((skillBar) => {
      if (isInViewport(skillBar) && !skillBar.classList.contains("animated")) {
        const percent = skillBar.getAttribute("data-percent");
        const percentElement = skillBar.querySelector(".skill-percent");

        skillBar.classList.add("animated");
        setTimeout(() => {
          if (percentElement) {
            percentElement.style.width = `${percent}%`;
          }
        }, 100);
      }
    });
  }

  // Run on page load
  animateSkillBars();

  // Run on scroll
  window.addEventListener("scroll", animateSkillBars);
}

// Initialize testimonial slider
function initTestimonialSlider() {
  const testimonialContainer = document.querySelector(".testimonial-container");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialDots = document.querySelectorAll(".testimonial-dot");
  let currentSlide = 0;

  if (
    testimonialContainer &&
    testimonialCards.length > 0 &&
    testimonialDots.length > 0
  ) {
    // Set up click events for the dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        goToSlide(index);
      });
    });

    // Function to go to a specific slide
    function goToSlide(slideIndex) {
      if (slideIndex < 0) slideIndex = testimonialCards.length - 1;
      if (slideIndex >= testimonialCards.length) slideIndex = 0;

      testimonialContainer.style.transform = `translateX(-${
        slideIndex * 100
      }%)`;

      // Update the active dot
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === slideIndex);
      });

      currentSlide = slideIndex;
    }

    // Automatic slider timer
    let sliderInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);

    // Pause slider on hover
    testimonialContainer.addEventListener("mouseenter", () => {
      clearInterval(sliderInterval);
    });

    testimonialContainer.addEventListener("mouseleave", () => {
      sliderInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    });
  }
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Disable form elements
      const formElements = contactForm.elements;
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
      }

      // Change button text
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";

      // Send data to Formspree
      fetch("https://formspree.io/f/mblgoqny", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Show success message
          contactForm.innerHTML = `
            <div class="p-6 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg">
              <h3 class="text-xl font-bold mb-2 text-green-400">Message Sent!</h3>
              <p>Thank you for reaching out, ${name}! I'll get back to you as soon as possible.</p>
            </div>
          `;
        })
        .catch((error) => {
          // Show error message
          contactForm.innerHTML = `
            <div class="p-6 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
              <h3 class="text-xl font-bold mb-2 text-red-400">Error!</h3>
              <p>Something went wrong. Please try again later.</p>
            </div>
          `;
        });
    });
  }
}

// Set active nav link based on scroll position
function initNavActive() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);

  // Set active link on page load
  setActiveLink();
}
