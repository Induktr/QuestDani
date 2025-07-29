// src/components/QuestButton.tsx

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
// 1. Используем HTMLMotionProps для полной совместимости с framer-motion
import styles from '@/app/styles/QuestionScreen.module.css'

// 2. Создаем интерфейс для наших кастомных props
interface QuestButtonProps {
  text: string;
  isSelected: boolean;
  status: 'correct' | 'incorrect' | null;
}

// 3. Создаем финальный тип, который объединяет наши props и стандартные props кнопки
type ButtonProps = QuestButtonProps & HTMLMotionProps<'button'>;

// 4. Используем новый тип и деструктуризируем '...props'
export const QuestButton: React.FC<ButtonProps> = ({ text, isSelected, status, className, ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={clsx(
        `${styles.geometryDash} h-full w-full bg-[var(--color-primary-accent)] text-[var(--color-text-secondary)] flex items-center justify-center p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-colors text-center text-lg sm:text-xl md:text-2xl font-bold uppercase`,
        {
          '!border-[var(--color-success)] !bg-[var(--color-text-secondary)] !text-[var(--color-text-primary)]': status === 'correct',
          '!border-[var(--color-error)] !bg-[var(--color-text-secondary)] !text-[var(--color-text-primary)]': status === 'incorrect',
          'border-[var(--color-text-secondary)] hover:border-[var(--color-secondary-accent)] hover:text-[var(--color-secondary-accent)]': !isSelected && !status,
        },
        className
      )}
      {...props} // Сюда попадет onClick и другие стандартные атрибуты
    >
      {text}
    </motion.button>
  );
};

export default QuestButton;
