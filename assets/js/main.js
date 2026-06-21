document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  // Hero carousel: appears on index.html
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      currentSlide = index;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlideFn() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    function startCarousel() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetCarousel() {
      clearInterval(slideInterval);
      startCarousel();
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetCarousel();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlideFn();
        resetCarousel();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.slide);
        showSlide(index);
        resetCarousel();
      });
    });

    showSlide(0);
    startCarousel();
  }

  // Gallery carousel: appears on gallery.html
  const gallerySlides = document.querySelectorAll(".gallery-slide");
  const galleryDots = document.querySelectorAll(".gallery-dot");
  const galleryPrevBtn = document.getElementById("galleryPrevSlide");
  const galleryNextBtn = document.getElementById("galleryNextSlide");

  if (gallerySlides.length > 0) {
    let currentGallerySlide = 0;
    let galleryInterval;

    function showGallerySlide(index) {
      gallerySlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      galleryDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      currentGallerySlide = index;
    }

    function nextGallerySlide() {
      currentGallerySlide = (currentGallerySlide + 1) % gallerySlides.length;
      showGallerySlide(currentGallerySlide);
    }

    function prevGallerySlideFn() {
      currentGallerySlide = (currentGallerySlide - 1 + gallerySlides.length) % gallerySlides.length;
      showGallerySlide(currentGallerySlide);
    }

    function startGalleryCarousel() {
      galleryInterval = setInterval(nextGallerySlide, 6000);
    }

    function resetGalleryCarousel() {
      clearInterval(galleryInterval);
      startGalleryCarousel();
    }

    if (galleryNextBtn) {
      galleryNextBtn.addEventListener("click", () => {
        nextGallerySlide();
        resetGalleryCarousel();
      });
    }

    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener("click", () => {
        prevGallerySlideFn();
        resetGalleryCarousel();
      });
    }

    galleryDots.forEach(dot => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.slide);
        showGallerySlide(index);
        resetGalleryCarousel();
      });
    });

    showGallerySlide(0);
    startGalleryCarousel();
  }

  // Speaker abstract modal: appears on speakers.html
  const abstractButtons = document.querySelectorAll(".speaker-name-button");
  const abstractTriggers = document.querySelectorAll(".speaker-card--interactive");
  const abstractItems = document.querySelectorAll(".abstract-item[data-abstract-id]");
  const abstractModal = document.getElementById("abstractModal");
  const abstractModalSpeaker = document.getElementById("abstractModalSpeaker");
  const abstractModalTitle = document.getElementById("abstractModalTitle");
  const abstractModalBody = document.getElementById("abstractModalBody");
  const abstractCloseControls = document.querySelectorAll("[data-abstract-close]");

  if (abstractModal && abstractItems.length > 0) {
    const abstractLookup = new Map(
      Array.from(abstractItems).map(item => [
        item.dataset.abstractId,
        {
          speaker: item.querySelector("h3")?.textContent ?? "",
          title: item.querySelector("h4")?.textContent ?? "",
          body: item.querySelector("p")?.innerHTML ?? ""
        }
      ])
    );

    function openAbstractModal(abstractId) {
      const abstract = abstractLookup.get(abstractId);

      if (!abstract) {
        return;
      }

      abstractModalSpeaker.textContent = abstract.speaker;
      abstractModalTitle.textContent = abstract.title;
      abstractModalBody.innerHTML = `<p>${abstract.body}</p>`;
      abstractModal.classList.add("is-open");
      abstractModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }

    function closeAbstractModal() {
      abstractModal.classList.remove("is-open");
      abstractModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    function triggerAbstractOpen(target) {
      const abstractId = target?.dataset.abstractTarget;

      if (!abstractId) {
        return;
      }

      openAbstractModal(abstractId);
    }

    abstractButtons.forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        triggerAbstractOpen(button);
      });
    });

    abstractTriggers.forEach(card => {
      card.addEventListener("click", () => {
        triggerAbstractOpen(card);
      });

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          triggerAbstractOpen(card);
        }
      });
    });

    abstractCloseControls.forEach(control => {
      control.addEventListener("click", closeAbstractModal);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && abstractModal.classList.contains("is-open")) {
        closeAbstractModal();
      }
    });
  }
});
