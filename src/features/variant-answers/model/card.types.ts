import { HTMLMotionProps } from "framer-motion";
import { DecorativeImage } from "@/shared/lib/types";

export type DivProps = QuestCardProps & Omit<HTMLMotionProps<'div'>, 'children'>;

export interface QuestCardProps {
  text: string;
  avatar?: string;
  images?: string | string[];
  backgroundImages?: DecorativeImage[];
  backgroundImage?: string | string[];
  isSelected: boolean;
  status: 'correct' | 'incorrect' | null;
  cardLayout?: 'default' | 'image-bottom';
}