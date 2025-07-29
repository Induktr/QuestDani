'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';
import { pusab } from '@/lib/fonts';
import styles from '@/app/styles/ObstaclePage.module.css';
import { MotionTrail } from '@/components/MotionTrail';

const levelData = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0];
const JUMPS_TO_WIN = 5;

const ObstaclePage = () => {
    const [gamePhase, setGamePhase] = useState<'intro' | 'countdown' | 'playing' | 'lost' | 'won'>('intro');
    const [countdown, setCountdown] = useState(3);
    const [successfulJumps, setSuccessfulJumps] = useState(0);
    const [clearedSpikes, setClearedSpikes] = useState<number[]>([]);
    
    const router = useRouter();
    const cubeControls = useAnimationControls();
    const trailControls = useAnimationControls();
    const { play, pause } = useAudio('/audio/stereo_madness.mp3');
    
    const cubeRef = useRef<HTMLDivElement>(null);
    const obstaclesRef = useRef<HTMLDivElement>(null);
    const gameLoopRef = useRef<number | null>(null);

    const resetGameState = useCallback(() => {
        setSuccessfulJumps(0);
        setClearedSpikes([]);
        cubeControls.start({ y: -20, rotate: 0 });
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
        if (gamePhase === 'playing') play();
        else pause();
    }, [gamePhase, play, pause]);

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
        if (gamePhase !== 'playing') return;
        setSuccessfulJumps(s => s + 1);
        await Promise.all([
            cubeControls.start({
                y: [-20, -140, -20],
                rotate: [0, 180, 360],
                transition: { type: 'spring', stiffness: 500, damping: 20, duration: 0.7 }
            }),
            trailControls.start('visible').then(() => trailControls.start('exit'))
        ]);
    };

    const restartGame = (e: React.MouseEvent) => {
        e.stopPropagation();
        setGamePhase('countdown');
        setCountdown(3);
    };

    useEffect(() => {
        if (successfulJumps >= JUMPS_TO_WIN) {
            setGamePhase('won');
            setTimeout(() => router.push('/final'), 1500);
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
        <div className={`flex flex-col justify-center items-center min-h-screen bg-[var(--color-background)] p-5 text-center overflow-hidden relative ${gamePhase === 'playing' ? 'cursor-pointer' : 'cursor-default'}`} onClick={handleJump}>
            
            <AnimatePresence>
                {gamePhase === 'intro' && (
                    <motion.h1 key="intro" className="text-4xl text-white font-heading max-w-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Завдання: &quot;Натисни на кубик 5 разів, щоб він перестрибнув шпильки!&quot;.
                    </motion.h1>
                )}
                {gamePhase === 'countdown' && countdown > 0 && (
                     <motion.h1 key={countdown} /* ... */>{countdown}</motion.h1>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {(gamePhase === 'playing' || gamePhase === 'lost' || gamePhase === 'won') && (
                    <motion.div key="game-world" className={styles.gameWorld} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className={styles.playerContainer}>
                            <motion.div ref={cubeRef} animate={cubeControls} className="relative">
                                <div className={`absolute -top-10 left-1/2 -translate-x-1/2 text-5xl font-bold text-white ${gamePhase === 'lost' ? styles.glitch : ''} ${pusab.className}`}>
                                    {JUMPS_TO_WIN - successfulJumps}
                                </div>
                                <Image src="/elements/cube.svg" alt="Cube" width={80} height={80} draggable="false" />
                            </motion.div>
                        </div>
                        <MotionTrail trailControls={trailControls} />
                        <div ref={obstaclesRef} className={styles.scrollingContainer} style={{ animationPlayState: gamePhase === 'playing' ? 'running' : 'paused' }}>
                            {[...levelData, ...levelData].map((block, index) => (
                                <div key={index} className={styles.obstacleBlock}>
                                    {block === 1 && <div className={styles.spike}></div>}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {gamePhase === 'lost' && (
                     <motion.div /* ... */>
                        <h2>ПОРАЗКА</h2>
                        <button onClick={restartGame}>Спробувати знову</button>
                    </motion.div>
                )}
                 {gamePhase === 'won' && (
                     <motion.div /* ... */>
                        <h2>ПЕРЕМОГА!</h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ObstaclePage;