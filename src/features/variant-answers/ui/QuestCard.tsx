import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { DivProps } from '@/features/variant-answers/model/card.types';
import ContainerCard from '@/widgets/ContainerCard/ContainerCard';

export const QuestCard: React.FC<DivProps> = ({
  text,
  className,
  avatar,
  images,
  backgroundImages,
  backgroundImage,
  isSelected,
  status,
  cardLayout = 'default',
  ...props
}) => {
  const isDecorativeCard = backgroundImages && backgroundImages.length > 0;

  return (
    <ContainerCard
      whileTap={{ scale: 0.97 }}
      className={clsx(
        'h-full w-full md:w-[507px] flex flex-col border-4 border-[var(--color-text-secondary)] hover:border-[var(--color-secondary-accent)] bg-[var(--color-primary-accent)] rounded-lg cursor-pointer transition-all duration-300 relative overflow-hidden p-4 md:p-4',
        {
          '!border-4 !border-[var(--color-success)] bg-[var(--color-text-secondary)]': status === 'correct',
          '!border-4 !border-[var(--color-error)] bg-[var(--color-text-secondary)]': status === 'incorrect',
        },
        className
      )}
      {...props}
    >
      {/* Слой 1: Полноразмерный фон (если есть) */}
      {backgroundImage && !Array.isArray(backgroundImage) && (
        <Image
          src={backgroundImage}
          alt="Card background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10"
        />
      )}

      {/* Слой 2: Декоративные иконки */}
      {isDecorativeCard && (
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((img, index) => (
            <Image
              key={index}
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              className="absolute"
              style={{
                top: img.top,
                left: img.left,
                right: img.right,
                bottom: img.bottom,
                transform: img.transform,
              }}
            />
          ))}
        </div>
      )}

      {/* Слой 3: Контент */}
      <div className={clsx(
        "relative z-10 flex flex-grow items-start justify-start h-full text-left",
        cardLayout === 'image-bottom' ? 'flex-col-reverse' : 'flex-col'
      )}>
        {avatar && (
          <Image
            src={avatar}
            alt="Avatar"
            height={56}
            width={56}
            className="rounded-full mb-3"
          />
        )}
      
        {/* Контентное изображение(я) */}
        {images && (
          <div className={clsx("w-full grid grid-cols-2 gap-2", cardLayout === 'default' && 'mb-3')}>
            {Array.isArray(images) ? (
              images.map((src, index) => (
                <div key={index} className="w-full h-24 md:h-24 relative">
                  <Image
                    src={src}
                    alt={`Card content ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-32 md:h-32 relative">
                <Image
                  src={images}
                  alt="Card content"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            )}
          </div>
        )}

        <span className={clsx(
          'font-bold text-xl md:text-2xl flex-grow',
          {
            'text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-accent)] transition duration-200': !isDecorativeCard || backgroundImage || isDecorativeCard,
            '!text-[var(--color-text-primary)]': status === 'incorrect',
            '!text-[var(--color-text-primary)] transition': status === 'correct',
            'mb-3': cardLayout === 'image-bottom'
          }
        )}>
          {text}
        </span>
      </div>
    </ContainerCard>
  );
};

export default QuestCard;
