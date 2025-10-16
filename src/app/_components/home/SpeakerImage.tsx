"use client";
import speakerVector from "@/public/assets/home/speaker-vector.svg";
import { motion } from "motion/react";
import Image from "next/image";

export default function SpeakerImage() {
  return (
    <motion.div
      initial={{ y: 100 }}
      whileInView={{ y: 0, transition: { duration: 0.6, ease: "linear" } }}
    >
      <Image
        src={speakerVector}
        alt="speaker image"
        quality={100}
        className="relative -bottom-10 lg:h-[493px] lg:w-[410.23px]"
      />
    </motion.div>
  );
}
