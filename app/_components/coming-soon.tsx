"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ComingSoon = () => {
  return (
    <section className="entrance-message absolute inset-0 w-full h-dvh overflow-hidden z-20 opacity-0">
      <div className="h-full flex items-center flex-col justify-center gap-10">
        <img
          src="/images/logo.webp"
          alt="logo"
          className="entrance-logo  2xl:w-72 3xl:w-80 md:w-60 w-48 absolute xs:top-[9.5rem] sm:top-[12.8rem] md:top-[8.5rem] 2xl:top-41.5 3xl:top-48 left-1/2 -translate-x-1/2"
        />

        <div className="text-wrapper mt-40 md:mt-60 2xl:mt-44 3xl:top-48">
          <h3 className="gradient-title md:text-[8rem] text-[5rem] font-round-bold !font-extrabold uppercase md:leading-[7rem] leading-[4.5rem] text-center bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
            Coming <br /> May 26th <br /> 2026
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
