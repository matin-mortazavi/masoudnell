"use client";
import Image from "next/image";
import Hero from "./_components-v2/hero";
import FirstVideo from "./_components-v2/first-video";
import Masoud from "./_components-v2/masoud";
import FloatingLines from "@/components/FloatingLines";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);

  return (
    <section>
      <Hero />
      <FirstVideo />
      <Masoud />
    </section>
  );
}
