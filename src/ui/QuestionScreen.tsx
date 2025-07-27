"use client";

import React, { FC, ReactNode, useState } from 'react';

interface QuestionScreenProps {
    children?: ReactNode;
    className?: ReactNode;
    titleQuestion?: ReactNode;
}


export const QuestionScreen: FC<QuestionScreenProps> = ({ children, className, titleQuestion }) => {

    return(
        <div className="flex flex-col mx-auto px-12 py-48 text-5xl text-[var(--color-text-primary)]">
            {titleQuestion}
            {children}
        </div>
    );
}

export default QuestionScreen;