# Тестовое: Эмулятор журнала событий

Онлайн:
https://miliekhin-test-job-gts.vercel.app/

События добавляются по таймеру со случайным интервалом.
Всего 36 событий.
Данные генерируются случайно, но в них есть некоторые зависимости.

Непрочитанные события в карточках выделены темной рамкой.
События выделяются по клику.
По нажатию на пробел, события отмечаются как прочитанные или как не прочитанные.

Непрочитанные события в таблице выделены полужирным шрифтом.
События можно выделить по клику или пробелу.
По нажатию на пробел, события отмечаются как прочитанные или как не прочитанные.

При переключении режима представления состояния поиска, событий, и пагинация сохраняются.

## Стек

Vue 3 Composition API, VueRouter, Pinia, TypeScript, PrimeVue, Docker, Docker Compose.

### Демо
[![Demo](VideoEventsLog.gif)](VideoEventsLog.gif)

## Запуск в Docker
```sh
docker-compose up
```

## localhost:8877

### Локально

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
