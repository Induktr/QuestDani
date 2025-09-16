'use client';

import { motion } from 'framer-motion';
import { wishText } from '@/shared/lib/constants';

const ScrollingWish = () => {
  return (
    <div className="h-64 w-full max-w-md mx-auto overflow-hidden relative">
      <motion.div
        className="absolute whitespace-pre-wrap text-start text-[var(--color-text-primary)] text-2xl"
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {wishText}
      </motion.div>
    </div>
  );
};

export default ScrollingWish;