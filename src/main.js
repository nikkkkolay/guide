import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import gsap from "gsap";
import "bootstrap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const scrollUpBtn = document.querySelector(".scroll-up-btn");

if (window.innerWidth > 768) {
  ScrollSmoother.create({
    smooth: 1,
    effects: true,
  });
}

window.addEventListener("load", () => {
  const strength = 15;
  const words = ["Открывай.", "Создавай.", "Достигай."];

  const magnets = document.querySelectorAll(".magnet");
  const wordElement = document.getElementById("hero-word");
  const smileIcon = document.querySelector(".smile");
  const header = document.querySelector("header");
  const dates = document.querySelectorAll(".date");
  const dot = document.querySelector(".dot");
  const slogan = document.querySelector(".slogan h3");
  const infoBlockBg = document.querySelector(".info-block__bg");
  const infoBlockBgSecond = document.querySelector(".info-block__bg_second");

  const stars = gsap.utils.toArray(".slogan .star");
  const splitText = gsap.utils.toArray(".split");

  let overlayTl = gsap.timeline();

  gsap.fromTo(
    infoBlockBgSecond,
    { rotate: 2 },
    {
      rotate: -2,
      scrollTrigger: {
        trigger: infoBlockBgSecond,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    infoBlockBg,
    { rotate: 2 },
    {
      rotate: -2,
      scrollTrigger: {
        trigger: infoBlockBg,
        start: "top center",
        end: "bottom center",
        scrub: true,
        onLeave: () => startAdvantagesAnimation(),
      },
    }
  );

  function startAdvantagesAnimation() {
    const advantages = gsap.utils.toArray(".advantages img");

    advantages.forEach((card, i) => {
      gsap.fromTo(
        card,
        { scale: 1, filter: "drop-shadow(0 0 8px rgba(0, 130, 241, 0.0))" },
        {
          scale: 1.1,
          filter: "drop-shadow(0 0 8px rgba(0, 130, 241, 0.9))",
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          delay: i * 0.3,
        }
      );
    });
  }

  gsap.to(slogan, {
    backgroundPosition: "100% 0%",
    duration: 5,
    ease: "linear",
    repeat: -1,
    yoyo: true,
  });

  gsap.fromTo(
    stars,
    {
      y: 10,
    },
    {
      y: -10,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    }
  );

  gsap.to(smileIcon, {
    rotate: 360,
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
    },
  });

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

  // let split = SplitText.create(splitText, {
  //   type: "words,lines",
  //   mask: "words",
  // });

  // document.body.style.overflow = "hidden";

  // words.forEach((word) => {
  //   overlayTl.to(wordElement, {
  //     duration: 0.3,
  //     opacity: 0,
  //     scale: 0.7,
  //     ease: "power2.in",
  //     onComplete: () => (wordElement.textContent = word),
  //   });

  //   overlayTl.fromTo(
  //     wordElement,
  //     { opacity: 0, scale: 1.1 },
  //     {
  //       duration: 0.35,
  //       opacity: 1,
  //       scale: 1,
  //       ease: "power2.out",
  //     }
  //   );

  //   overlayTl.to(wordElement, { duration: 0.6 });
  // });

  // overlayTl.to("#loader-overlay", {
  //   opacity: 0,
  //   duration: 0.3,
  //   ease: "power1.out",
  //   onComplete: () => {
  //     document.getElementById("loader-overlay").remove();
  //     document.body.style.overflow = "";
  //     gsap.fromTo(".root", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
  //     gsap.fromTo(
  //       ".content",
  //       { opacity: 0, y: 70 },
  //       { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  //     );
  //     gsap.from(split.words, {
  //       duration: 1,
  //       y: 100,
  //       autoAlpha: 0,
  //       stagger: 0.05,
  //     });
  //   },
  // });
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
