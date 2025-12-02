"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMaskSettings } from "@/hooks/use-responsive";
import { ScrollTrigger } from "gsap/all";
import ComingSoon from "./coming-soon";
import Navbar from "./navbar";
import { flushSync } from "react-dom";

import { useLogoContext } from "./logo-context";

const Hero = () => {
  const { logoInNav, setLogoInNav } = useLogoContext();

  const { initialMaskPos, initialMaskSize, maskPos, maskSize } =
    useMaskSettings();

  useGSAP(() => {
    gsap.set(".mask-wrapper-2", {
      maskPosition: initialMaskPos,
      maskSize: initialMaskSize,
    });

    gsap.set(".mask-logo", { marginTop: "-100vh", opacity: 0 });

    gsap.set(".entrance-message", {
      marginTop: "0vh",
      maskImage:
        "radial-gradient(circle at 50% 176.126%, rgb(0, 0, 0) 15.9159%, rgba(0, 0, 0, 0) 57.958%)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        scrub: 2.5,
        end: "+=200%",
        pin: true,
      },
    });

    tl.to(".fade-out", { opacity: 0, ease: "power1.inOut" }, "<")
      .to(
        ".scale-out",
        {
          scale: 1,
          duration: 6,
          ease: "power1.inOut",
          backgroundColor: "red",
        },
        "<"
      )
      .to(
        ".mask-wrapper-2",
        { maskSize, duration: 6, ease: "power1.inOut" },
        "<"
      )
      .to(
        ".scale-out",
        {
          filter:
            "brightness(0) saturate(100%) invert(10%) sepia(77%) saturate(7481%) hue-rotate(12deg) brightness(96%) contrast(111%)",
          duration: 0.2,
        },
        "-=0.2"
      )
      .to(".mask-wrapper-2", { opacity: 0, duration: 8 })

      .to(
        ".gradient-title",
        {
          backgroundImage:
            "radial-gradient(circle at 50% 92.5vh, rgb(255, 211, 127) 0vh, rgb(232, 66, 121) 50vh, rgb(113, 30, 101) 90vh, rgba(32, 31, 66, 0) 115.972vh)",
          duration: 2,
        },
        "<"
      )
      .to(
        ".overlay-logo",
        {
          opacity: 1,
        },
        "<"
      )

      .to(".entrance-message", {
        maskImage:
          "radial-gradient(circle at 50% 89.6396%, rgb(0, 0, 0) 73.5736%, rgba(0, 0, 0, 0) 86.7868%)",
        opacity: 100,
        duration: 3,
        ease: "power1.inOut",
      })
      .to(".gradient-title", {
        duration: 5,
        delay: 1,
        onStart: () => {
          console.log(document.startViewTransition);
          if (document.startViewTransition) {
            console.log("transition forward");
            document.startViewTransition(() => {
              flushSync(() => {
                setLogoInNav(true);
              });
            });
          }
        },
        onReverseComplete: () => {
          console.log(document.startViewTransition);
          if (document.startViewTransition) {
            console.log("transition backward");
            document.startViewTransition(() => {
              flushSync(() => {
                setLogoInNav(false);
              });
            });
          }
        },
      })
      .to(
        ".overlay-logo",
        {
          opacity: 0,
        },
        "<"
      )
      .to(".entrance-message", {
        opacity: 0,
        marginTop: "-100vh",
        duration: 1,
        ease: "power1.inOut",
      });
  });

  return (
    <>
      <Navbar />
      <section className="hero-section w-dvw h-dvh relative overflow-hidden">
        <div className="w-full h-full mask-wrapper-2">
          <div className="w-full h-full bg-[#0e1216] flex justify-center">
            <img
              src="/images/bg.jpeg"
              alt="background"
              className="scale-out object-cover w-full h-full   md:scale-125   "
            />
          </div>

          <img
            src="/images/watch-trailer.png"
            alt="trailer"
            className="trailer-logo fade-out"
          />
          <div className="play-img fade-out">
            <img src="/images/play.png" alt="play" className="w-7 ml-1" />
          </div>
        </div>

        <div>
          <img
            src="/images/text-logo.png"
            alt="logo"
            className="w-full h-full object-cover mask-logo"
          />
        </div>

        <div className="fake-logo-wrapper absolute  z-40 top-[124px] 2xl:top-[156px] 3xl:top-[160px] left-1/2 -translate-x-1/2">
          <img
            src="/images/text-logo.png"
            className="overlay-logo w-full h-full w-68   opacity-0 object-cover opacity-0 w-60 md:w-60 2xl:w-72 3xl:w-80 "
          />
        </div>
        <ComingSoon />
      </section>
    </>
  );
};

export default Hero;
