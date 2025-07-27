"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from 'react';
import { roboto } from "@/lib/fonts";
import stylesStart from "./styles/StartScreen.module.css";
import stylesQuestion from "./styles/QuestionScreen.module.css";
import QuestionScreen from "@/ui/QuestionScreen";
import clsx from 'clsx';
import QuestButton from '@/components/QuestButton';
import { variantsQuestions } from "@/lib/quetionData";

export default function StartScreen() {
  const [currentScreen, setCurrentScreen] = useState('');
  const [currentCountQuest, setCurrentCountQuest] = useState<number>(0);

  const handleNextScreen = () => {
    setCurrentScreen('questionScreen');
    setCurrentCountQuest(curr => curr + 1);
  }
  return (
    <div className="block h-screen max-w-5xl mx-auto">
      {currentScreen && (
        <div className="flex flex-col">
          <QuestionScreen titleQuestion={variantsQuestions[0].question}>
            {currentCountQuest === 1 && (
              <div>
                {variantsQuestions[0].answers.map(variant => (
                  <div key={variant}>
                    <QuestButton text={variant}/>
                  </div>
                ))}
              </div>
            )}
          </QuestionScreen>
        </div>
      )}
      <div className={clsx("flex flex-col h-full px-12 py-18 justify-center", {
        "hidden": currentScreen === 'questionScreen'
      })}>
        <h1 className={`${roboto.className} text-[var(--color-text-primary)] text-center text-2xl lg:text-5xl md:text-4xl sm:text-3xl`}>Секретне повідомлення для Дані</h1>
        <button onClick={handleNextScreen} className={`${stylesStart.startQuest} w-full max-w-[200px] lg:max-w-[268px] md:max-w-[260px] sm:max-w-[250px] mx-auto mt-20 lg:min-h-[66px] min-h-[45px] md:min-h-[60px] sm:min-h-[50px] text-[var(--color-text-secondary)] text-[14px] lg:text-2xl md:text-xl bg-[var(--color-primary-accent)] rounded-[10px] cursor-pointer`}>Start the quest</button>
      </div>
    </div>
  );
}
