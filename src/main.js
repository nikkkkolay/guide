import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import gsap from "gsap";
import "bootstrap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const scrollBtn = document.querySelector(".scroll-up-btn");

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("load", () => {
  // let tl = gsap.timeline();
  // let split = SplitText.create(".split", {
  //     type: "words,lines",
  //     mask: "words",
  // });
  const strength = 15;
  // const words = ["Открывай.", "Создавай.", "Достигай."];

  const magnets = document.querySelectorAll(".magnet");
  // const wordElement = document.getElementById("hero-word");
  const smileIcon = document.querySelector(".smile");
  const header = document.querySelector("header");
  const dates = document.querySelectorAll(".date");
  const dot = document.querySelector(".dot");

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
    scrollBtn,
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
    const offset = target.getBoundingClientRect().top;
    const containerOffset = document.querySelector(".timeline").getBoundingClientRect().top;
    const relativeTop = offset - containerOffset + 7;

    gsap.to(dot, {
      duration: 0.3,
      top: relativeTop,
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

  // words.forEach((word) => {
  //     tl.to(wordElement, {
  //         duration: 0.3,
  //         opacity: 0,
  //         scale: 0.7,
  //         ease: "power2.in",
  //         onComplete: () => (wordElement.textContent = word),
  //     });

  //     tl.fromTo(
  //         wordElement,
  //         { opacity: 0, scale: 1.1 },
  //         {
  //             duration: 0.35,
  //             opacity: 1,
  //             scale: 1,
  //             ease: "power2.out",
  //         }
  //     );

  //     tl.to(wordElement, { duration: 0.6 });
  // });

  // tl.to("#loader-overlay", {
  //     opacity: 0,
  //     duration: 0.3,
  //     ease: "power1.out",
  //     onComplete: () => {
  //         document.getElementById("loader-overlay").remove();

  //         gsap.fromTo(".root", { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
  //         gsap.from(split.words, {
  //             duration: 1,
  //             y: 100,
  //             autoAlpha: 0,
  //             stagger: 0.05,
  //         });
  //     },
  // });
});
