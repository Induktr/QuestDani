"use client";

import React, { useState, useEffect } from 'react';
import stylesStart from "./styles/StartScreen.module.css";
import Link from "next/link";
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import { startQuestData, variantVisible } from '@/shared/lib/constants';
import { AppRoutes } from '@/shared/config/paths';

export default function StartScreen() {
  const [statusElements, setStatusElements] = useState
  <
  "inactive" | "active" | "completed"
  >
  (
    "inactive"
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const controls = animate([
      [scope.current, variantVisible.visible],
      ["div", variantVisible.hidden]
    ]);

    controls.speed = 0.4;

    return () => controls.stop();
  }, [])
  return (
    <div className="block h-screen max-w-5xl mx-auto">
      <div className="flex flex-col h-full px-12 py-18 justify-center">
        <AnimatePresence>
          <motion.h1 
            className="text-[var(--color-text-primary)] text-center text-2xl lg:text-5xl md:text-4xl sm:text-3xl"
          >
            {startQuestData.h1}
          </motion.h1>
          <motion.div
            ref={scope}
            animate={statusElements}
            // variants={variantVisible && variantHover}
            whileInView={{ x: 2, y: 3 }}
            whileTap="hover"
            whileHover="visible"
            exit="hidden"
            className="text-center transform-3d flex flex-col justify-center w-full max-w-[200px] lg:max-w-[268px] md:max-w-[260px] sm:max-w-[250px] mx-auto mt-20 lg:min-h-[66px] min-h-[45px] md:min-h-[60px] sm:min-h-[50px] text-[var(--color-text-secondary)] text-[14px] lg:text-2xl md:text-xl bg-[var(--color-primary-accent)] border-4 border-[var(--color-text-secondary)] hover:border-[var(--color-secondary-accent)] hover:text-[var(--color-secondary-accent)]  transition duration-300 rounded-[10px] cursor-pointer"
          >
            <Link
              href={AppRoutes.QUESTION}
              className={`${stylesStart.startQuest}`}
            >
              {startQuestData.inscriptionBtn}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
