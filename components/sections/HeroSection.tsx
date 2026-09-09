// components/sections/HeroSection.tsx
"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// Varian Animasi Staggered
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay the appearance of each element
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl space-y-6"
      >
        {/* Greeting Line */}
        <motion.p 
          variants={itemVariants} 
          className="text-xl text-primary font-medium"
        >
          Hello, I&apos;m <span className="text-2xl sm:text-3xl font-bold">Safta Nasdalihin</span>.
        </motion.p>
        
        {/* Main Role/Title Line */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          A Smart Contract Developer Building Decentralized and Secure Applications on the Blockchain.
        </motion.h1>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Link
            href="/projects"
            className="inline-block bg-primary text-primary-foreground 
                       px-8 py-3 mt-6 text-lg font-semibold rounded-full 
                       hover:bg-primary/90 transition-colors"
          >
            View My Work
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};