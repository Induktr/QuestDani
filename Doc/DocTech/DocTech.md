# Техническая Документация "Wisdom Forge"

### 1. Введение: Архитектура как Фундамент Системы

Этот документ описывает **технический фундамент (Принцип 8)** проекта "Wisdom Forge", построенного как **модульная и масштабируемая система (Принцип 9)**.

### 2. Технологический Стек

*   **Бэкенд:** NestJS, GraphQL, Prisma
*   **Фронтенд:** Next.js (React), TypeScript
*   **База Данных:** PostgreSQL (Neon)

### 3. Архитектура Проекта

Архитектура следует **монорепозиторному** подходу с четким разделением на Frontend и Backend.

```mermaid
graph TD
    A[Frontend (Next.js)] -->|GraphQL API| B(Backend - NestJS);
    B -->|Prisma ORM| C(База Данных - PostgreSQL/Neon);

    Frontend (Next.js): Отвечает за:

        Отображение списка "Мастеров" и "Квестов".

        Реализацию UI для микро-игр ("Испытаний").

        Отображение профиля пользователя с наградами.

    Backend (NestJS): Отвечает за:

        Аутентификацию и управление пользователями.

        Хранение и предоставление данных о "Мастерах", "Квестах", "Испытаниях" и "Наградах".

        Валидацию результатов прохождения "Испытаний".

4. Схема Базы Данных (Prisma Schema)**

// backend/prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  // Связь с полученными наградами
  crowns    Crown[]
}

model Master {
  id          String   @id @default(cuid())
  name        String   // "Маргулан Сейсембай"
  description String
  quests      Quest[]
}

model Quest {
  id          String   @id @default(cuid())
  title       String   // "Принципы Эффективности"
  masterId    String
  master      Master   @relation(fields: [masterId], references: [id])
  trials      Trial[]
  crown       Crown?
}

model Trial {
  id          String   @id @default(cuid())
  title       String   // "Испытание Системой"
  description String   // "Построй систему для фильтрации задач..."
  gameType    String   // "filter-game", "focus-game", etc.
  questId     String
  quest       Quest    @relation(fields: [questId], references: [id])
  crystal     WisdomCrystal?
}

model WisdomCrystal {
  id          String   @id @default(cuid())
  principle   String   // "Эффективность достигается построением системы"
  trialId     String   @unique
  trial       Trial    @relation(fields: [trialId], references: [id])
}

model Crown {
  id          String   @id @default(cuid())
  title       String   // "Корона Мудрости Маргулана"
  imageUrl    String
  questId     String   @unique
  quest       Quest    @relation(fields: [questId], references: [id])
  userId      String
  owner       User     @relation(fields: [userId], references: [id])
}

5. API (GraphQL)

API предоставляет следующие ключевые возможности:

    Queries:

        masters: Получить список всех "Мастеров".

        quests(masterId: ID!): Получить список квестов для конкретного "Мастера".

        quest(id: ID!): Получить детальную информацию о квесте, включая его "Испытания".

        me: Получить профиль текущего пользователя и его награды.

    Mutations:

        register, login.

        completeTrial(trialId: ID!, result: JSON): Отправить результат прохождения испытания на проверку. В случае успеха, бэкенд создает "Кристалл Мудрости".```