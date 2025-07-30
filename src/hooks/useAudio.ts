import { useRef, useEffect, useCallback } from 'react';

export const useAudio = (url: string) => {
  // Используем useRef для хранения экземпляра Audio, чтобы избежать лишних ререндеров
  // и обеспечить доступ к одному и тому же объекту на протяжении всего жизненного цикла компонента.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Инициализируем аудио-объект только один раз при монтировании.
  useEffect(() => {
    // Проверка на window нужна, чтобы избежать ошибок при серверном рендеринге (SSR).
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(url);
    }

    // Функция очистки, которая сработает при размонтировании компонента.
    // Это критически важно для предотвращения утечек памяти.
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]); // Зависимость от url, чтобы пересоздать объект, если источник изменится.

  const play = useCallback(() => {
    if (audioRef.current) {
      // Браузеры могут блокировать автовоспроизведение.
      // .play() возвращает промис, который можно использовать для обработки таких случаев.
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      // Гарантируем, что громкость находится в допустимом диапазоне [0, 1].
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  const fadeIn = useCallback((duration: number = 3000, maxVolume: number = 0.5) => {
    if (audioRef.current) {
        const audio = audioRef.current;
        audio.volume = 0;
        audio.play().catch(error => console.error("Audio play failed:", error));

        const fadeInterval = 50; // ms, как часто обновлять громкость
        const volumeStep = maxVolume / (duration / fadeInterval);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            if (audio.volume < maxVolume) {
                const newVolume = audio.volume + volumeStep;
                audio.volume = Math.min(newVolume, maxVolume);
            } else {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }
        }, fadeInterval);
    }
  }, []);

  // Возвращаем стабильные функции благодаря useCallback.
  return { play, pause, setVolume, fadeIn };
};