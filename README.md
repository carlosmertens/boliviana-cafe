# Boliviana Café

Website for Boliviana — a café in Berlin uniting three Bolivian brands: [Die Seele Boliviens](https://www.google.com/maps/place/BOLIVIANA+-+Die+Seele+Boliviens+-/@52.5335319,13.4231295,17z) (Bolivian pastries), [Caraya Coffee](https://www.caraya-coffee.com/info/about-us.html) (specialty coffee), and [Miskisimi](https://miskisimi.com/en/pages/about-us) (Bolivian wines).

See [`project-scope.md`](./project-scope.md) for the project scope and content ideas, and [`teck-stack.md`](./teck-stack.md) for tech stack decisions.

## Getting Started

This project uses [pnpm](https://pnpm.io). Install dependencies, then run the dev server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Scripts

- `pnpm dev` — start the development server
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — lint with ESLint
- `pnpm format` — format with Prettier
- `pnpm format:check` — check formatting without writing

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel. See [`teck-stack.md`](./teck-stack.md) for details and reasoning.
