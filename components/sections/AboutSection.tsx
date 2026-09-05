// components/sections/AboutSection.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { SkillsGrid } from './SkillsGrid';
// import { ExperienceTimeline } from './ExperienceTimeline';
import { FaDownload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

export const AboutSection = () => {
  return (
    <motion.section 
        id="about" 
        className="py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
    >       
      <motion.h2 className="mb-10 text-5xl font-extrabold text-center text-primary" variants={itemVariants}>
        About Me
      </motion.h2>

      {/* Bio and Photo Content (Responsive: 2 columns on desktop) */}
      <motion.div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-start" variants={itemVariants}>
        
        {/* Text Coloum (Bio) */}
        <div className="lg:w-2/3">
          <p className="mb-4 text-lg text-foreground/80">
            Hello! I&apos;m Safta Nasdalihin, an aspiring <strong>Smart Contract Developer</strong> from Indonesia, focused on building secure and reliable applications with <strong>Solidity</strong> and the <strong>EVM</strong>. 
            I enjoy turning ideas into practical smart contract systems while continuously learning about blockchain architecture, protocol design, and security.
          </p>

          <p className="mb-4 text-lg text-foreground/80">
            My current focus is on <strong>smart contract development</strong>, especially understanding how decentralized systems work under the hood. 
            I build and test my contracts using <strong>Foundry</strong>, with an emphasis on writing clear Solidity code, designing robust contract logic, and understanding the trust assumptions behind on-chain applications.
          </p>

          <p className="mb-6 text-lg font-medium">
            I&apos;m interested in the problems blockchain can solve through <strong>trustless execution, transparency, and programmable ownership</strong>. 
            My goal is to grow into a professional smart contract developer and contribute to building decentralized systems that are useful, secure, and genuinely meaningful.
          </p>

          {/* Tombol CTA */}
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <Link
              href="/contact"
              className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground 
                         transition-transform hover:scale-[1.03] active:scale-95"
            >
              Start a Project
            </Link>
             <a
              href="/Safta-Nasdalihin-CV.pdf"
              download
              className="flex items-center gap-2 rounded-md border border-border bg-secondary 
                         px-6 py-3 font-semibold text-secondary-foreground 
                         transition-transform hover:scale-[1.03] active:scale-95"
                >
              <FaDownload /> Download My CV
            </a>
            </motion.div>
        </div>

        {/* Photo Column (Professional Profile Picture) */}
        <div className="lg:w-1/3 flex justify-center lg:justify-end">
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/50 shadow-2xl">
            <Image
              src="/images/safta-profile.png" 
              alt="Professional Profile Picture of Safta Nasdalihin"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:rotate-1 hover:scale-105"
              priority 
            />
          </div>
        </div>
      </motion.div>
      
      {/* Skill Grid is loaded here */}
      <motion.div className="my-16" variants={itemVariants}>
      <SkillsGrid />
      </motion.div>
      {/* <ExperienceTimeline /> */}
    </motion.section>
  );
};