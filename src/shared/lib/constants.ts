import type { QuestionData } from './types';
import { Variants, stagger } from 'framer-motion';

export const authors = ['Нiкiта', 'Алiса'];

export const variantsQuestions: QuestionData = [
  {
    id: 1,
    type: 'buttons',
    question: 'Які саме ігри, ти найчастіше граєш щодня?',
    answers: [
      { text: 'roblox', isCorrect: true },
      { text: 'geometry dash', isCorrect: false },
      { text: 'steam games', isCorrect: false },
      { text: 'minecraft', isCorrect: false },
      { text: 'world of tanks', isCorrect: false },
      { text: 'war thunder', isCorrect: false },
    ],
  },
  {
    id: 2,
    type: 'buttons',
    question: 'Які тобі категорії режимів у Roblox подобаються найбільше?',
    answers: [
      { text: 'shooter', isCorrect: true },
      { text: 'horror', isCorrect: false },
      { text: 'fantasy', isCorrect: false },
    ],
  },
  {
    id: 3,
    type: 'buttons',
    question: `Які режими ти грав з ${authors[1]} можливо ще півроку тому?`,
    answers: [
      { text: 'tower defence', isCorrect: true },
      { text: 'simulator', isCorrect: true },
      { text: 'shooter', isCorrect: false },
      { text: 'horror', isCorrect: false },
      { text: 'evade', isCorrect: false },
      { text: 'all are wrong', isCorrect: false },
    ],
  },
  {
    id: 4,
    type: 'buttons',
    question: `Який скін у ${authors[0]} на даний момент у Roblox?`,
    answers: [
      { text: 'default', isCorrect: true },
      { text: '50% premium 50% no robux', isCorrect: true },
      { text: 'premium', isCorrect: false },
      { text: 'with robux', isCorrect: false },
      { text: 'don\'t know', isCorrect: false },
    ],
  },
  {
    id: 5,
    type: 'buttons',
    question: `Скільки у твого брата/сестри - ${authors[0]} є зараз робуксів у Roblox?`,
    answers: [
      { text: '30 robux', isCorrect: true },
      { text: '0 robux', isCorrect: true },
      { text: '1000 robux', isCorrect: false },
      { text: '100 robux', isCorrect: false },
      { text: '60 robux', isCorrect: false },
      { text: '400 robux', isCorrect: false },
    ],
  },
  {
    id: 6,
    type: 'cards',
    question: 'Чим твій брат займається і яка у нього місія?',
    answers: [
      {
        text: 'Розробник, а також засновник проекту під назвою BrainMessenger - по суті це месенджер для зручного, сфокусованого та ефективного спілкування з майбутніми інтеграціями з ІІ.',
        isCorrect: true,
        avatar: '/images/Nikita.png',
        backgroundImages: [
          { src: '/images/logo1.png', width: 120, height: 120, top: '0%', left: '60%', transform: 'rotate(0deg)' },
          { src: '/images/logo2.png', width: 70, height: 70, bottom: '30%', right: '10%', transform: 'rotate(0deg)' },
          { src: '/images/logo3.png', width: 120, height: 120, bottom: '0%', right: '60%', transform: 'rotate(0deg)' },
        ],
      },
      {
        text: 'Дизайнер робить првеюшки на ютуб для ютуберів, наприклад як "Олена Солтан" він зараз їй зробив дуже багато прев\'ю, і заробіток в основному був непоганим, але зараз став ще більшим.',
        isCorrect: false,
        avatar: '/images/NikitaOld.png',
        backgroundImages: [
          { src: '/images/Thumbnail1.png', width: 250, height: 135, bottom: '50%', right: '60%', transform: 'rotate(0deg)' },
          { src: '/images/Thumbnail2.png', width: 310, height: 218, top: '-3%', left: '40%', transform: 'rotate(0deg)' },
          { src: '/images/Thumbnail3.png', width: 170, height: 104, top: '65%', left: '68%', transform: 'rotate(0deg)' },
        ], // Используем правильное свойство для декора
      },
    ],
  },
  {
    id: 7,
    type: 'cards',
    question: 'Як ти думаєш, твій брат взагалі запланував заробити на фрілансі 10000$ через рік наприклад?',
    answers: [
      {
        text: 'Так, у нього своя система для планування, в якій він планує не тільки як він намагатиметься заробляти, і він також планує своє життя в цілому.',
        isCorrect: true,
        cardLayout: 'image-bottom',
        images: ['/images/Portfolio1.png', '/images/Portfolio2.png'],
      },
      {
        text: 'Мені здається він навіть над цим не замислювався, оскільки він над своїм проектом поки що зайнятий, тому в нього часу точно не залишиться на фріланс',
        isCorrect: false,
        backgroundImages: [
          { src: '/images/QuestionMark.svg', width: 70, height: 70, bottom: '10%', left: '5%', transform: 'rotate(-5deg)' },
          { src: '/images/QuestionMark2.svg', width: 70, height: 70, bottom: '5%', right: '5%', transform: 'rotate(-30deg)' },
          { src: '/images/QuestionMark.svg', width: 60, height: 60, bottom: '5%', left: '40%', transform: 'rotate(-10deg)' },
          { src: '/images/QuestionMark.svg', width: 60, height: 60, bottom: '30%', left: '60%', transform: 'rotate(-20deg)' },
          { src: '/images/QuestionMark2.svg', width: 70, height: 70, bottom: '5%', right: '30%', transform: 'rotate(20deg)' },
          { src: '/images/QuestionMark.svg', width: 60, height: 60, bottom: '-10%', left: '20%', transform: 'rotate(-60deg)' },
          { src: '/images/QuestionMark.svg', width: 50, height: 50, bottom: '25%', left: '20%', transform: 'rotate(-20deg)' },
        ],
      },
    ],
  },
  {
    id: 8,
    type: 'cards',
    question: 'Як ти гадаєш, твій брат захоче пограти в Roblox, якщо у нього проект буде вже запущений?',
    answers: [
      {
        text: 'Я думаю що можливо, тому що по ідеї у нього з\'явиться більше вільного часу, тому що у нього проект вже готовий, опублікований, і я думаю, що ймовірність є.',
        isCorrect: true,
        backgroundImages: [
          { src: '/images/bubble.svg', width: 100, height: 100, bottom: '0%', left: '0%', transform: 'rotate(0deg)' },
          { src: '/images/rocket.svg', width: 100, height: 100, bottom: '20%', right: '30%', transform: 'rotate(0deg)' },
          { src: '/images/android.svg', width: 100, height: 100, bottom: '15%', left: '20%', transform: 'rotate(0deg)' },
          { src: '/images/launch.svg', width: 100, height: 100, bottom: '3%', left: '80%', transform: 'rotate(0deg)' },
        ],
      },
      {
        text: 'Тут залежить від того, як він вирішить, грати йому зі мною, чи ні, можливо він не любить взагалі грати в ігри, тому що можливо він не любить розважатися, він більше любить постійно розвиватися і самовдосконалюватися щодня.',
        isCorrect: false,
        backgroundImages: [
          { src: '/images/faq.svg', width: 100, height: 100, top: '-5%', left: '-2%', transform: 'rotate(-30deg)' },
          { src: '/images/faq.svg', width: 100, height: 100, bottom: '-10%', right: '10%', transform: 'rotate(-40deg)' },
          { src: '/images/faq.svg', width: 100, height: 100, bottom: '-35%', right: '60%', transform: 'translate(-50%, -50%) rotate(0deg)' },
        ],
      },
    ],
  },
];

export const startQuestData = {
    h1: "Секретне повідомлення для Дані",
    inscriptionBtn: "Start the quest"
}

export const wishText = `
    Дорогий Даню,

    З Днем Народження!
    
    Ти щойно пройшов мій маленький квест, і це не просто гра. Це метафора того, як ти йдеш по життю: сміливо, вирішуючи завдання і ніколи не здаючись.
    
    (Принцип 13: Наполегливість)
    Пам'ятай, як у Geometry Dash: іноді, щоб пройти складний рівень, потрібна сотня спроб. Але кожна спроба — це не програш, а збір даних. Кожен провал — це крок до перемоги. Ніколи не бійся падати, головне — завжди піднімайся і пробуй знову.
    
    (Принцип 1: Постійне Навчання)
    Життя — це найбільша гра з нескінченними "ачівками". Кожна нова навичка, яку ти освоюєш — у Roblox Studio, у навчанні, у спорті — це твій новий "скіл", який робить тебе сильнішим. Ніколи не припиняй вчитися та "прокачувати" свого "персонажа".
    
    (Принцип 10: Створення Активів)
    Ти дивовижна і творча людина. Все, що ти створюєш — світи в Roblox, ідеї, дружбу — це твої "активи". Це те, що буде працювати на тебе і приносити радість тобі та іншим. Цінуй те, що ти створюєш.
    
    (Принцип 5: Здоров'я як Фундамент)
    Щоб перемагати у найскладніших "рейдах", твоєму герою потрібна енергія. Дбай про себе: добре спи, гуляй на свіжому повітрі та правильно харчуйся. Твоє здоров'я — це твій головний "енергетичний щит".
    
    Даню, я вірю в тебе більше, ніж будь-хто. Ти можеш досягти абсолютно всього, чого забажаєш, тому що в тебе є найголовніше — розум, наполегливість і добре серце.
    
    Це твій квест, і я знаю, ти пройдеш його блискуче.
    
    З любов'ю,
    твій брат Микита.
  `;

export const TRAIL_VARIANTS: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' } 
  },
  exit: { 
    pathLength: 0, 
    opacity: 0,
    transition: { duration: 0.1, ease: 'easeIn' } 
  },
};

export const variantVisible = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delayChildren: stagger(0.1),
      duration: 0.1,
      times: [0, 0.1, 0.2]
    },
    x: 1,
    y: 5,
    scale: 1.1
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      delayChildretrn: stagger(0.1),
    },
    speed: 10,
  }
}

export const title = "З Днем Народження, Даня!";
export const titleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08, // Анимация по буквам
        },
    },
}
export const letterVariants: Variants = {
    hidden: { opacity: 0, y: -20, scale: 1.5 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
}
export const ballVariants: Variants = {
    hidden: { y: '-100vh', opacity: 0 },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 50,
            delay: 0.1 + i * 0.05, // Разная задержка для падения
        },
    }),
}
export const balls = [
    { top: '10%', left: '15%', rotate: -15 },
    { top: '20%', right: '10%', rotate: 15 },
    { bottom: '15%', left: '20%', rotate: -25 },
    { bottom: '10%', right: '25%', rotate: 20 },
];

export const levelData = [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0];

export const answerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const answerItemVariants: Variants = {
  hidden: { opacity: 0, y: 50 }, // Вылетают снизу
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300 }, // С эффектом пружины
  },
};