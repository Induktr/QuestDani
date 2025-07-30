'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Confetti from 'react-confetti';
import { roboto } from '@/lib/fonts';
import ScrollingWish from '@/components/ScrollingWish';
import { useAudio } from '@/hooks/useAudio';

const FinalPage = () => {
    const { fadeIn } = useAudio('/audio/theoryofeverything.mp3');
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

    const title = "З Днем Народження, Даня!";
    const titleVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Анимация по буквам
            },
        },
    };

    const letterVariants: Variants = {
        hidden: { opacity: 0, y: -20, scale: 1.5 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', damping: 12, stiffness: 100 },
        },
    };

    const ballVariants: Variants = {
        hidden: { y: '-100vh', opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 50,
                delay: 0.1 + i * 0.05, // Разная задержка для падения
            },
        }),
    };

    const balls = [
        { top: '10%', left: '15%', rotate: -15 },
        { top: '20%', right: '10%', rotate: 15 },
        { bottom: '15%', left: '20%', rotate: -25 },
        { bottom: '10%', right: '25%', rotate: 20 },
    ];

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
                            colors={['#00FFD1', '#FF00E6', '#FF1D15', '#39FF14']} // Неоновая палитра
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="z-10">
                <motion.h1
                    className={`text-5xl md:text-7xl text-[var(--color-primary-accent)] mb-5 ${roboto.className}`}
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