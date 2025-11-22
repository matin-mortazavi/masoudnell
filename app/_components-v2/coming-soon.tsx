"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLogoContext } from "./logo-context";

gsap.registerPlugin(ScrollTrigger);

const ComingSoon = () => {
  const { logoInNav, setLogoInNav } = useLogoContext();

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".entrance-message",
      start: "bottom top",
    });
  }, [setLogoInNav]);

  return (
    <section className="entrance-message absolute inset-0 w-full h-dvh overflow-hidden z-20 opacity-0">
      <div className="h-full flex items-center flex-col justify-center gap-10">
        {!logoInNav && (
          <img
            src="/images/nell.png"
            alt="logo"
            className="entrance-logo  navbar 2xl:w-109  3xl:w-96 md:w-60 w-48 absolute xs:top-[9.5rem] sm:top-[12.8rem] md:top-[8.5rem] 2xl:top-21 3xl:top-48 left-[calc(50%-14px)] -translate-x-1/2"
          />
        )}

        <div className="text-wrapper mt-40 md:mt-60 2xl:mt-60 3xl:top-48">
          <h3 className="gradient-title md:text-[8rem] text-[5rem] font-round-bold !font-extrabold uppercase md:leading-[7rem] leading-[4.5rem] text-center bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
            parkour COACH <br /> ADVENTURE <br /> IRAN
          </h3>
        </div>

        <div className="flex justify-center items-center gap-10">
          <img src="/images/ps-logo.svg" className="md:w-32 w-20" />
          <img src="/images/x-logo.svg" className="md:w-52 w-40" />
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
