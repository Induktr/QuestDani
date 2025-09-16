// src/components/QuestButton.tsx

import React from 'react';
import clsx from 'clsx';
import styles from '@/app/styles/QuestionScreen.module.css'
import { ButtonProps } from '../model/button.types';
import ContainerButton from '@/widgets/ContainerButton/ContainerButton';

// 4. Используем новый тип и деструктуризируем '...props'
export const QuestButton: React.FC<ButtonProps> = ({ text, isSelected, status, className, ...props }) => {
  return (
    <ContainerButton
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
    </ContainerButton>
  );
};

export default QuestButton;
