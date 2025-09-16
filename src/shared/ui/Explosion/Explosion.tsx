'use client';

import { motion } from 'framer-motion';

const PARTICLE_COUNT = 15;

const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

export const Explosion = () => {
  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
    id: i,
    x: randomValue(-150, 150),
    y: randomValue(-150, 150),
    scale: randomValue(0.3, 1),
    duration: randomValue(0.4, 0.8),
    delay: randomValue(0, 0.2),
    rotate: randomValue(-360, 360),
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute bg-yellow-400 rounded-md"
          style={{
            width: `${randomValue(8, 16)}px`,
            height: `${randomValue(5, 15)}px`,
          }}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, p.scale, p.scale * 0.8],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
            times: [0, 0.5, 1]
          }}
        />
      ))}
    </div>
  );
};