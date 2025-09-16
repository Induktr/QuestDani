'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/shared/hooks/useAudio';
import styles from '@/app/styles/ObstaclePage.module.css';
import { MotionTrail } from '@/shared/ui/MotionTrail/MotionTrail';
import { Explosion } from '@/shared/ui/Explosion/Explosion';
import { levelData } from '@/shared/lib/constants';
import { AppRoutes } from '@/shared/config/paths';
import { SoundList } from '@/shared/config/sounds';
import { GamePhase } from '@/shared/lib/types';

const JUMPS_TO_WIN = 5;

const ObstaclePage = () => {
    const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
    const [countdown, setCountdown] = useState(3);
    const [successfulJumps, setSuccessfulJumps] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [isMusicStarted, setIsMusicStarted] = useState(false);
    
    const router = useRouter();
    const cubeControls = useAnimationControls();
    const trailControls = useAnimationControls();
    const { play, pause } = useAudio(SoundList.STEREO_MADNESS);
    const { play: playDeathSound } = useAudio(SoundList.DEATH_SOUND);
    
    const cubeRef = useRef<HTMLDivElement>(null);
    const obstaclesRef = useRef<HTMLDivElement>(null);
    const gameLoopRef = useRef<number | null>(null);

    const resetGameState = useCallback(() => {
        setSuccessfulJumps(0);
        setIsJumping(false);
        setIsExploding(false);
        cubeControls.start({ y: 0, rotate: 0, scale: 1, opacity: 1 });
        if(obstaclesRef.current) {
            obstaclesRef.current.style.animation = 'none';
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            obstaclesRef.current.offsetHeight;
            obstaclesRef.current.style.animation = '';
        }
    }, [cubeControls]);

    useEffect(() => {
        if (gamePhase === 'intro') {
            const timer = setTimeout(() => setGamePhase('countdown'), 4000); // Увеличиваем время для чтения
            return () => clearTimeout(timer);
        }
        if (gamePhase !== 'playing') {
            pause();
        }
    }, [gamePhase, pause]);

    useEffect(() => {
        if (gamePhase === 'countdown' && countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        }
        if (gamePhase === 'countdown' && countdown === 0) {
            resetGameState();
            setGamePhase('playing');
        }
    }, [gamePhase, countdown, resetGameState]);

    const handleJump = async () => {
        if (gamePhase !== 'playing' || isJumping) return;

        if (!isMusicStarted) {
            play();
            setIsMusicStarted(true);
        }

        setIsJumping(true);
        setSuccessfulJumps(s => s + 1);

        // Запускаем след и анимацию прыжка параллельно
        trailControls.start('visible').then(() => trailControls.start('exit'));

        // Этап 1: Прыжок вверх
        await cubeControls.start({
            y: -120,
            rotate: 90,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
        });

        // Этап 2: Падение вниз
        await cubeControls.start({
            y: 0,
            rotate: 0,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
        });

        setIsJumping(false);
    };

    const restartGame = (e: React.MouseEvent) => {
        e.stopPropagation();
        setGamePhase('countdown');
        setCountdown(3);
    };

    useEffect(() => {
        if (successfulJumps >= JUMPS_TO_WIN) {
            setGamePhase('won');
            setTimeout(() => router.push(AppRoutes.FINAL), 1500);
        }
    }, [successfulJumps, router]);

    useEffect(() => {
        const checkCollisions = () => {
            if (!cubeRef.current || !obstaclesRef.current) return;

            const cubeRect = cubeRef.current.getBoundingClientRect();
            const spikeElements = obstaclesRef.current.querySelectorAll(`.${styles.spike}`);

            for (const spike of Array.from(spikeElements)) {
                const spikeRect = spike.getBoundingClientRect();
                
                // Простая проверка пересечения прямоугольников
                if (
                    cubeRect.left < spikeRect.right &&
                    cubeRect.right > spikeRect.left &&
                    cubeRect.top < spikeRect.bottom &&
                    cubeRect.bottom > spikeRect.top
                ) {
                    playDeathSound();
                    cubeControls.start({
                        opacity: 0,
                        transition: { duration: 0.01 }
                    });
                    setIsExploding(true);
                    setGamePhase('lost');
                    return; // Выходим из цикла и функции, если столкновение найдено
                }
            }

            gameLoopRef.current = requestAnimationFrame(checkCollisions);
        };

        if (gamePhase === 'playing') {
            gameLoopRef.current = requestAnimationFrame(checkCollisions);
        } else {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        }

        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [gamePhase, styles.spike]);

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-white overflow-hidden">
            {/* Контейнер для UI-элементов (сообщений, обратного отсчета), которые не влияют на игру */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 pointer-events-none">
                <AnimatePresence>
                    {gamePhase === 'intro' && (
                        <motion.h1 key="intro" className="text-4xl font-heading max-w-2xl p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            Завдання: &quot;Натисни на кубик 5 разів, щоб він перестрибнув шпильки!&quot;.
                        </motion.h1>
                    )}
                    {gamePhase === 'countdown' && countdown > 0 && (
                         <motion.h1 key={countdown} className="text-9xl font-bold" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}>{countdown}</motion.h1>
                    )}
                    {gamePhase === 'lost' && (
                         <motion.div className="pointer-events-auto bg-black bg-opacity-50 p-8 rounded-lg flex flex-col gap-4" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                            <h2 className="text-6xl font-bold text-red-500">ПОРАЗКА</h2>
                            <button onClick={restartGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Спробувати знову</button>
                        </motion.div>
                    )}
                     {gamePhase === 'won' && (
                         <motion.div className="bg-black bg-opacity-50 p-8 rounded-lg" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                            <h2 className="text-6xl font-bold text-green-500">ПЕРЕМОГА!</h2>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Главный игровой контейнер: полноэкранный, с обработчиком клика */}
            <AnimatePresence>
                {(gamePhase === 'playing' || gamePhase === 'lost' || gamePhase === 'won') && (
                    <motion.div
                        key="game-container"
                        className="w-screen h-screen relative overflow-hidden cursor-pointer"
                        onClick={handleJump}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className={styles.gameWorld}>
                            <motion.div
                                ref={cubeRef}
                                animate={cubeControls}
                                className="absolute z-10"
                                style={{ left: '15%', bottom: '20%' }} // Позиция относительно земли в flex-контейнере
                            >
                                <div className={`absolute -top-14 right-14 -translate-x-1/2 text-5xl font-bold ${gamePhase === 'lost' ? styles.glitch : ''}`}>
                                    {JUMPS_TO_WIN - successfulJumps > 0 ? JUMPS_TO_WIN - successfulJumps : ''}
                                </div>
                                {/* Адаптивный размер кубика через Tailwind классы */}
                                <Image src="/elements/cube.svg" alt="Cube" width={64} height={64} className="w-12 h-12 md:w-16 md:h-16" draggable="false" />
                                {isExploding && <Explosion />}
                            </motion.div>
                            
                            {/* Новый контейнер для земли и шипов */}
                            <div className={styles.groundContainer}>
                                <MotionTrail trailControls={trailControls} />
                                <div ref={obstaclesRef} className={styles.scrollingContainer} style={{ animationPlayState: gamePhase === 'playing' ? 'running' : 'paused' }}>
                                    {[...levelData, ...levelData].map((block, index) => (
                                        <div key={index} className={styles.obstacleBlock}>
                                            {block === 1 && <div className={styles.spike}></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ObstaclePage;