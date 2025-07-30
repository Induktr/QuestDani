'use client';

import { useState, useMemo } from 'react';
import { variantsQuestions } from '@/lib/quetionData';
import type { Answer } from '@/lib/types';
import { QuestButton } from '@/components/QuestButton';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import clsx from 'clsx';
import stylesPusab from '@/app/styles/QuestionScreen.module.css';
import { roboto } from '@/lib/fonts';
import { QuestCard } from '@/components/QuestCard';
import { useRouter } from 'next/navigation';

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [isShaking, setIsShaking] = useState(false); // Состояние для анимации тряски

  const router = useRouter();
  const currentQuestion = variantsQuestions[currentQuestionIndex];

  const allAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return [...currentQuestion.answers].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswerClick = (answer: Answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer.isCorrect) {
      setAnswerStatus('correct');
      setTimeout(() => {
        if (currentQuestionIndex < variantsQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setAnswerStatus(null);
        } else {
          router.push('../obstacle');
          console.log("КВЕСТ ЗАВЕРШЕН!");
        }
      }, 1500); // Задержка, чтобы анимация правильного ответа успела проиграться
    } else {
      setAnswerStatus('incorrect');
      setIsShaking(true); // Запускаем тряску
      setTimeout(() => {
        setSelectedAnswer(null);
        setAnswerStatus(null);
      }, 1500);
    }
  };

  // Варианты для появления ответов (GD-стиль)
  const answerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const answerItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 }, // Вылетают снизу
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300 }, // С эффектом пружины
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: '100%' }}
            animate={{
              opacity: 1,
              x: isShaking ? [-5, 5, -5, 5, 0] : 0, // Анимация тряски при неправильном ответе
            }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={isShaking ? { duration: 0.4 } : { type: 'spring', stiffness: 300, damping: 30 }}
            onAnimationComplete={() => setIsShaking(false)} // Сбрасываем состояние тряски после завершения
            className="w-full max-w-6xl text-center px-4"
          >
            <h1 className="text-3xl md:text-5xl text-[var(--color-text-primary)] font-medium">{currentQuestion.question}</h1>

            <motion.div
              className={clsx(
                'mt-12 md:mt-24 gap-4 md:gap-10',
                currentQuestion.type === 'cards'
                  ? 'flex flex-wrap justify-center'
                  : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
              )}
              variants={answerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {allAnswers.map((answer) => {
                const isSelected = selectedAnswer?.text === answer.text;

                return (
                  <motion.div
                    key={answer.text}
                    variants={answerItemVariants}
                    className="flex"
                    animate={
                      answerStatus === 'correct'
                        ? { // Анимация для правильного ответа (Roblox-стиль)
                            scale: isSelected ? 1.1 : 1,
                            opacity: isSelected ? 1 : 0,
                          }
                        : {}
                    }
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {currentQuestion.type === 'cards' ? (
                      <QuestCard
                        text={answer.text}
                        avatar={answer.avatar}
                        images={answer.images}
                        backgroundImage={answer.backgroundImage}
                        backgroundImages={answer.backgroundImages}
                        cardLayout={answer.cardLayout || 'default'}
                        onClick={() => handleAnswerClick(answer)}
                        isSelected={isSelected}
                        status={isSelected ? answerStatus : null}
                      />
                    ) : (
                      <QuestButton
                        text={answer.text}
                        onClick={() => handleAnswerClick(answer)}
                        isSelected={isSelected}
                        status={isSelected ? answerStatus : null}
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionPage;
