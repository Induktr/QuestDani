import React, { ReactNode, useState } from 'react';
import styles from '@/app/styles/QuestionScreen.module.css';
import clsx from 'clsx';
import { variantsQuestions } from '@/lib/quetionData';

interface QuestButtonProps {
    text?: string | string[];
    onCLick?: () => void;
    className?: string;
}


export const QuestButton: React.FC<QuestButtonProps> = ({ text, onCLick, className }) => {
    return(
        <div className="grid grid-cols-3 col-span-3 group">
            <div className="grid grid-cols-3 mt-20 group">        
              <button className={`${styles.geometryDash} min-h-[66px] col-span-3 bg-[var(--color-primary-accent)] rounded-[10px] text-[var(--color-text-secondary)] text-2xl`}>{text}</button>
            </div>
        </div>
    );
}

export default QuestButton;