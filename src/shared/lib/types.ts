// src/lib/types.ts

import { useAnimationControls } from 'framer-motion';

export type ImageMap = { [key: string]: string };

// Тип для декоративного изображения с размерами
export interface DecorativeImage {
  src: string;
  width: number;
  height: number;
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  transform?: string;
}

// Тип для одного варианта ответа
export interface Answer {
  text: string;
  isCorrect: boolean;
  images?: string | string[]; // Контентное изображение
  avatar?: string;
  backgroundImages?: DecorativeImage[]; // Декоративные иконки
  backgroundImage?: string | string[]; // Полноразмерный фон
  cardLayout?: 'default' | 'image-bottom';
}

// Обновленный тип для вопроса
export interface Question {
  id: number;
  type?: 'buttons' | 'cards';
  question: string;
  answers: Answer[]; // Единый массив ответов

  // Новые поля для типа 'cards', чтобы данные были на уровне вопроса
  image?: string | string[];
  backgroundImage?: string | string[];
  images?: ImageMap;
  avatars?: ImageMap;
}

export type QuestionData = Question[];

export interface MotionTrailProps {
  trailControls: ReturnType<typeof useAnimationControls>;
}

export type GamePhase = 'intro' | 'countdown' | 'playing' | 'lost' | 'won'