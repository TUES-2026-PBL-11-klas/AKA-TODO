# Multi-User Task Management System – Етап 1

## Структура
- **backend/** – NestJS skeleton (modules, entities, DTOs, services, controllers)
- **database/** – миграции и seed скрипт
- **docker-compose.yml** – стартира backend и PostgreSQL
- **.github/workflows/** – CI/CD pipeline за Docker build/push

## Стартиране (локално)
1. `docker-compose up --build`
2. Backend достъпен на http://localhost:3000
3. Базата данни – PostgreSQL на порт 5432

## Миграции и seed
- Генериране на миграция: `npm run migration:generate <name>` (в папка backend)
- Изпълнение на миграции: `npm run migration:run`
- Seed: `npm run seed`

## CI/CD
- При push към main: build и push на Docker image към Docker Hub

## Забележка
Този етап съдържа само архитектурната основа и базата данни. Няма бизнес логика или frontend.
