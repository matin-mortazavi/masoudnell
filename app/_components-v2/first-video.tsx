"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

const FirstVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.set(".first-vd-wrapper", { marginTop: "-150vh", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".first-vd-wrapper",
        start: "top top",
        end: "+=200% top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".hero-section", { delay: 0.5, opacity: 0, ease: "power1.inOut" });
    tl.to(".first-vd-wrapper", {
      opacity: 1,
      duration: 2,
      ease: "power1.inOut",
    });

    const addVideoAnimation = () => {
      if (videoRef.current && videoRef.current.duration) {
        tl.to(
          videoRef.current,
          {
            currentTime: videoRef.current.duration,

            duration: 2,
            ease: "power1.inOut",
          },
          "<"
        );
      }
    };

    // Check if metadata is already loaded
    if (videoRef.current) {
      if (videoRef.current.readyState >= 1) {
        addVideoAnimation();
      } else {
        // Wait for metadata to load
        videoRef.current.onloadedmetadata = addVideoAnimation;
      }
    }
  }, []);

  return (
    <section className="first-vd-wrapper">
      <div className="h-dvh">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/first-vid.mp4"
          className="first-vd h-full w-full object-cover md:[object-position:50%_center] [object-position:75%_center]"
        />
      </div>
    </section>
  );
};

export default FirstVideo;
