import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import gsap from "gsap";
import "bootstrap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

if (window.innerWidth > 768) {
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
  });
}

const words = ["Открывай.", "Создавай.", "Достигай."];

let overlayTl = gsap.timeline();
const splitText = gsap.utils.toArray(".split");
const wordElement = document.getElementById("hero-word");
const scrollUpBtn = document.querySelector(".scroll-up-btn");

document.body.style.overflow = "hidden";

words.forEach((word) => {
  overlayTl.to(wordElement, {
    duration: 0.3,
    opacity: 0,
    scale: 0.7,
    ease: "power2.in",
    onComplete: () => (wordElement.textContent = word),
  });

  overlayTl.fromTo(
    wordElement,
    { opacity: 0, scale: 1.1 },
    {
      duration: 0.35,
      opacity: 1,
      scale: 1,
      ease: "power2.out",
    }
  );

  overlayTl.to(wordElement, { duration: 0.6 });
});

overlayTl.to("#loader-overlay", {
  opacity: 0,
  duration: 0.3,
  ease: "power1.out",
  onComplete: () => {
    document.getElementById("loader-overlay").remove();
    document.body.style.overflow = "";
    gsap.fromTo(".root", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
    gsap.fromTo(
      ".content",
      { opacity: 0, y: 70 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    document.fonts.ready.then(() => {
      let split = SplitText.create(splitText, {
        type: "words,lines",
        mask: "words",
      });

      gsap.from(split.words, {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        stagger: 0.05,
      });
    });
  },
});

window.addEventListener("load", () => {
  const strength = 15;

  const magnets = document.querySelectorAll(".magnet");
  const header = document.querySelector("header");
  const dates = document.querySelectorAll(".date");
  const dot = document.querySelector(".dot");
  const slogan = document.querySelector(".slogan h2");
  const AdvantagesListIcon = document.querySelector(".advantages__list-icons");
  const infoBlockBg = gsap.utils.toArray(".info-block__bg");
  const stars = gsap.utils.toArray(".slogan .star");
  const advantages = gsap.utils.toArray(".advantages__icon");

  infoBlockBg.forEach((el) => {
    gsap.fromTo(
      el,
      { rotate: 2 },
      {
        rotate: -2,
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: AdvantagesListIcon,
      start: "20% center",
      toggleActions: "play none none reset",
    },
  });

  advantages.forEach((card) => {
    tl.fromTo(
      card,
      { scale: 1 },
      {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        yoyoEase: true,
      }
    );
  });

  gsap.to(slogan, {
    backgroundPosition: "100% 0%",
    duration: 1,
    ease: "linear",
    repeat: -1,
    yoyo: true,
  });

  gsap.fromTo(
    stars,
    {
      y: 9,
    },
    {
      y: -9,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    }
  );

  gsap.fromTo(
    scrollUpBtn,
    { y: 200 },
    {
      y: 0,
      scrollTrigger: {
        trigger: header,
        start: "center top",
        end: "bottom top",
        scrub: 0.5,
      },
    }
  );

  dates.forEach((date) => {
    ScrollTrigger.create({
      trigger: date,
      start: "top center",
      end: "bottom center",
      onEnter: () => moveDotTo(date),
      onEnterBack: () => moveDotTo(date),
    });
  });

  function moveDotTo(target) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    const offset = target.getBoundingClientRect().top;
    const containerOffset = document.querySelector(".timeline").getBoundingClientRect().top;
    const relativeTop = (offset - containerOffset + 0.4375 * rootFontSize) / rootFontSize;

    gsap.to(dot, {
      duration: 0.3,
      top: `${relativeTop}rem`,
      ease: "power2.out",
    });
  }

  magnets.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const bounding = el.getBoundingClientRect();
      const relX = e.clientX - bounding.left;
      const relY = e.clientY - bounding.top;

      const centerX = bounding.width / 2;
      const centerY = bounding.height / 2;

      const deltaX = (relX - centerX) / centerX;
      const deltaY = (relY - centerY) / centerY;

      gsap.to(el, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.5,
        ease: "power3.out",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power4.out",
      });
    });
  });
});

scrollUpBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.querySelectorAll(".accordion-collapse").forEach((collapseEl) => {
  collapseEl.addEventListener("shown.bs.collapse", () => {
    ScrollTrigger.refresh();
  });

  collapseEl.addEventListener("hidden.bs.collapse", () => {
    ScrollTrigger.refresh();
  });
});

document.querySelectorAll(".address__link").forEach((link) => {
  const build = document.querySelector(`.build[data-target="${link.id}"] .build__body`);

  link.addEventListener("mouseenter", () => build?.classList.add("highlight"));
  link.addEventListener("mouseleave", () => build?.classList.remove("highlight"));

  link.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelectorAll(".build__body").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".address__link").forEach((l) => l.classList.remove("active"));

    build?.classList.add("active");
    link.classList.add("active");
  });
});

document.addEventListener("click", (e) => {
  const link = e.target.closest(".address__link");
  const build = e.target.closest(".build");

  if (!link && !build) {
    document.querySelectorAll(".build__body").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".address__link").forEach((l) => l.classList.remove("active"));
  }
});
