import { HTMLMotionProps } from "framer-motion";

export interface QuestButtonProps {
  text: string;
  isSelected: boolean;
  status: 'correct' | 'incorrect' | null;
}

export type ButtonProps = QuestButtonProps & HTMLMotionProps<'button'>;