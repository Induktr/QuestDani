'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import ScrollingWish from '@/shared/ui/ScrollingWish/ScrollingWish';
import { useAudio } from '@/shared/hooks/useAudio';
import { balls, title, titleVariants, letterVariants, ballVariants } from '@/shared/lib/constants';
import { SoundList } from '@/shared/config/sounds';
import { colorsList } from '@/shared/config/colors';

const FinalPage = () => {
    const { fadeIn } = useAudio(SoundList.THEORY_OF_EVERYTHING);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [showConfetti, setShowConfetti] = useState(false);
    useEffect(() => {
        // Устанавливаем размеры окна на клиенте
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        // Запускаем конфетти после монтирования компонента
        setShowConfetti(true);
    }, []);
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[var(--color-background)] p-5 text-center relative overflow-hidden">
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 z-20"
                    >
                        <Confetti
                            width={windowSize.width}
                            height={windowSize.height}
                            numberOfPieces={200}
                            gravity={0.05} // Медленное падение
                            colors={colorsList} // Неоновая палитра
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="z-10">
                <motion.h1
                    className="text-5xl md:text-7xl text-[var(--color-primary-accent)] mb-5"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    aria-label={title}
                    onAnimationComplete={() => {
                        fadeIn(4000, 0.4); // Плавное включение на 4 секунды до 40% громкости
                    }}
                >
                    {title.split('').map((char, index) => (
                        <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </motion.h1>
                <motion.h2
                    className="text-2xl text-white mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    Ти успішно пройшов квест!
                </motion.h2>
            </div>

            <div className="z-10 w-full">
                <ScrollingWish />
            </div>

            {/* Анимированные шарики */}
            {balls.map((ball, i) => (
                <motion.div
                    key={i}
                    className="absolute z-0"
                    style={{ 
                        ...ball,
                        backgroundImage: 'url(/elements/ball.svg)',
                        width: 80,
                        height: 80,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                    }}
                    custom={i}
                    variants={ballVariants}
                    initial="hidden"
                    animate="visible"
                />
            ))}
        </div>
    );
};

export default FinalPage;