import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/styles/ObstaclePage.module.css';
import { MotionTrailProps } from '@/shared/lib/types';
import { TRAIL_VARIANTS } from '@/shared/lib/constants';

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
          variants={TRAIL_VARIANTS}
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