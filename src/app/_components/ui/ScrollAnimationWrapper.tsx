"use client";

import { motion } from "motion/react";
import { PropsWithChildren } from "react";

interface ScrollAnimationType extends PropsWithChildren {
  style?: string;
}

export default function ScrollAnimationWrapper({
  style,
  children,
}: ScrollAnimationType) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={style}
    >
      {children}
    </motion.div>
  );
}
