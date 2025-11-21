"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Masoud = () => {
  useGSAP(() => {
    gsap.set(".jason", { marginTop: "-80vh" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".jason",
          start: "top 90%",
          end: "10% center",
          scrub: 2,
        },
      })
      .to(".first-vd", { opacity: 0, duration: 1, ease: "power1.inOut" });

    gsap.to(
      ".jason .img-box",
      {
        scrollTrigger: {
          trigger: ".jason",
          start: "top center",
          end: "80% center",
          scrub: 2,
        },
        y: -300,
        duration: 1,
        ease: "power1.inOut",
      },
      "<"
    );
  });

  return (
    <section className="jason relative z-10 lg:ps-40 2xl:ps-80 ps-10 py-40 mt-60 flex lg:flex-row flex-col justify-between gap-5 w-dvw overflow-x-hidden">
      <div className="max-w-lg jason-content">
        <h1 className="text-yellow-500 font-black uppercase text-8xl mb-20">
           ADVENTURE
        </h1>
        <h2 className="text-pink-500 md:text-5xl text-3xl mb-7 md:pe-20 pe-10">
          its all about adventure its all about adventure its all about
          adventure its all about adventure
        </h2>
        <p className="text-white md:text-2xl text-lg md:pe-28 pe-14">
          Jason grew up around grifters and crooks. After a stint in the Army
          trying to shake off his troubled teens, he found himself in the Keys
          doing what he knows best, working for local drug runners. It might be
          time to try something new.
        </p>

        <div className="jason-2 bg-yellow h-[90vh] w-auto md:mt-36 mt-20 -translate-x-5">
          <img
            src="/images/jason-2.webp"
            className="w-full h-full object-cover [object-position:80%_center] hover:scale-x-[0.97] hover:scale-y-[0.98] transition duration-700 ease-in-out"
          />
        </div>
      </div>

      <div className="space-y-5 mt-96 img-box">
        <div className="jason-1  bg-yellow lg:h-[80vh] w-auto -translate-x-5">
          <img
            src="/images/jason-1.webp"
            className="w-full h-full object-cover [object-position:5%_center] hover:scale-[0.98] transition duration-700 ease-in-out"
          />
        </div>
        <div className="jason-3 bg-yellow h-[50vh] md:w-[60%] -translate-x-5">
          <img
            src="/images/jason-3.webp"
            className="w-full h-full object-cover [object-position:42%_center] hover:scale-[0.97] transition duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default Masoud;
