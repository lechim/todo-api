# ToDo - API

## _Developed By Jean-Michel Steyn_

API used for my Todo App.

Powered by Express.js

## Features

-   REST API
-   Prisma
-   Typescript
-   JWT Auth
-   Zod Validation

## Getting Started

Save example.env as .env

Generate a secure key for accessTokenSecret and again for refreshTokenSecret in .env

Run the prisma generate command to link to database

```bash
npm run gen
```

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

```bash
npm i
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
