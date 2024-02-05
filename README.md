# Monad Goldrush: 2024 Trainee Application.

A client application to control the Goldrush game.

## Features.

- Connect to an existing game instance with game id.
- Create a new game instance based on the given level id.
- Restart current game run.
- Rotate player to 8 directions: 0, 45, 90, 135, 180, 225, 270, 315.
- Move player to the current direction.
- Clean UI crafted using Next.js 14 & Tailwind.
- Store game id in the url params.
- Strong and typesafe Zod schemas.

## Built with.

- Next.js 14
- Tailwind
- WebSocket
- Zod

## Getting started.

1. Clone the repository.

```
git@github.com:lauriahlfors/monad-goldrush.git
```

2. Install NPM packages.

```
npm install
```

3. Add .env file and variables.

For example, in project root:

```
touch .env
```

Add keys and values:

```
PLAYER_TOKEN=
LEVEL_ID=
MONAD_BACKEND=
```

4. Run the project locally.

```
npm run dev
```
