import React from 'react';
import { motion, Variants, useAnimationControls } from 'framer-motion';
import styles from '@/app/styles/ObstaclePage.module.css';

interface MotionTrailProps {
  trailControls: ReturnType<typeof useAnimationControls>;
}

const trailVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' } 
  },
  exit: { 
    pathLength: 0, 
    opacity: 0,
    transition: { duration: 0.1, ease: 'easeIn' } 
  },
};

export const MotionTrail: React.FC<MotionTrailProps> = ({ trailControls }) => {
  return (
    <div className={styles.motionTrailContainer}>
      <svg width="100%" height="100%" viewBox="0 0 400 80" preserveAspectRatio="none">
        {/* "Беговая дорожка" из нескольких линий */}
        <path d="M 0 70 H 400" className={styles.trailLine} style={{ animationDelay: '-0.5s' }} />
        <path d="M 0 50 H 400" className={styles.trailLine} style={{ opacity: 1, animationDelay: '-1s' }} />
        
        {/* Анимированный "след" от прыжка */}
        <motion.path
          d="M 50,98 L 150,98"
          variants={trailVariants}
          initial="hidden"
          animate={trailControls}
          stroke="var(--color-secondary-accent)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};