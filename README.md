# Docker training app

A small CRUD app built as a self-training project to learn Docker, multi-environment deployments, and CI/CD with GitHub Actions

The app itself is a Star Wars planets browser — fetch planets from [SWAPI](https://swapi.info), save your favorites, switch between grid/list views. The interesting part is the **infrastructure around it**

You can visit the live app at [https://ilias-docker-training-frontend.onrender.com](https://ilias-docker-training-frontend.onrender.com)

> ⚠️ Both services are hosted on Render's free tier and spin down after 15 minutes of inactivity. The first request after a quiet period may take ~30 seconds to wake up.

## Live deployment

Both services are deployed on [Render](https://render.com) using the published Docker Hub images:

| Service  | URL                                                             |
| -------- | --------------------------------------------------------------- |
| Frontend | https://ilias-docker-training-frontend.onrender.com             |
| Backend  | https://ilias-docker-training-backend.onrender.com              |

## Built with

[![typescript-shield]][typescript-url]
[![react-shield]][react-url]
[![vite-shield]][vite-url]
[![tailwind-shield]][tailwind-url]
[![shadcn-shield]][shadcn-url]
[![rtk-shield]][rtk-url]
[![rtk-query-shield]][rtk-query-url]
[![react-router-dom-shield]][react-router-dom-url]
[![docker-shield]][docker-url]
[![github-actions-shield]][github-actions-url]

To see the version of each dependency, check the `package.json` file

## Folder Structure

Below is a high-level overview of the project's `src/` folder structure:

```bash
src/
├── assets/       # Static assets
├── components/   # Reusable UI components (shadcn-based)
├── features/     # Feature-based modules
├── lib/          # Helper and utility functions
├── pages/        # Page-level views
├── router/       # App routing config
├── store/        # Redux Toolkit store + RTK Query APIs
└── types/        # TypeScript types
```

## Development

### Prerequisites

Make sure you have the following installed on your machine:

- NodeJS: Download by visiting [NodeJS website](https://nodejs.org/en/download/)
- Git: Download by visiting [Git website](https://git-scm.com/downloads)
- Docker Desktop: Download by visiting [Docker website](https://www.docker.com/products/docker-desktop/)

To check if NodeJS, Git, and Docker are installed, run the following commands in your terminal:

```bash
node -v
git --version
docker --version
```

### 1. Clone the repository

```bash
git clone https://github.com/iliassachlos/ilias-docker-training.git
```

### 2. Install dependencies

```bash
cd ilias-docker-training
npm install
```

### 3. Start the client (Vite dev server)

```bash
npm run dev
```

Then visit `http://localhost:5173`.

You'll also need the backend running for full functionality:

```bash
npm run server
```

## Docker

The project is fully dockerized with three environments. Each has its own port mapping and isolated data volume

### Run with Docker Compose

```bash
# Development
docker compose -f docker-compose.development.yml up --build

# Staging
docker compose -f docker-compose.staging.yml up --build

# Production
docker compose -f docker-compose.production.yml up --build
```

| Environment | Frontend       | Backend        |
| ----------- | -------------- | -------------- |
| Development | localhost:3000 | localhost:8080 |
| Staging     | localhost:3001 | localhost:8081 |
| Production  | localhost:3002 | localhost:8082 |

### Architecture

Two containers per environment:

- **Frontend** — multi-stage build. Static React app served by nginx with SPA routing fallback
- **Backend** — JSON-Server reading from `db.json`

### Published images

Available on Docker Hub:

- `eliassah/ilias-docker-training-frontend:dev | staging | prod`
- `eliassah/ilias-docker-training-backend:dev | staging | prod`

## CI/CD

Two workflows in `.github/workflows/`:

**`ci.yml`** — runs on every push and pull request to `dev`, `staging`, `main`:

- Lint (`eslint`)
- Type check + build (`tsc -b && vite build`)

**`deploy.yml`** — runs on push to `dev`, `staging`, `main`:

- Branch determines target environment (dev, staging, production)
- Builds Docker images
- Pushes images to Docker Hub with env-specific tags

## What I learned

- Writing Dockerfiles and Docker Compose configs across three environments (dev, staging, production) for both frontend and backend
- Setting up GitHub Actions workflows for CI/CD — automated linting, type checking, builds, and image publishing

<!-- MARKDOWN IMAGES -->

[typescript-shield]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[react-shield]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[vite-shield]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=FFD62E
[tailwind-shield]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[shadcn-shield]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[rtk-shield]: https://img.shields.io/badge/Redux%20Toolkit-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white
[rtk-query-shield]: https://img.shields.io/badge/RTK%20Query-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white
[react-router-dom-shield]: https://img.shields.io/badge/React%20Router-%23CA4245.svg?style=for-the-badge&logo=reactrouter&logoColor=white
[docker-shield]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[github-actions-shield]: https://img.shields.io/badge/GitHub%20Actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white

<!-- MARKDOWN LINKS -->

[typescript-url]: https://www.typescriptlang.org/
[react-url]: https://react.dev/
[vite-url]: https://vitejs.dev/
[tailwind-url]: https://tailwindcss.com/
[shadcn-url]: https://ui.shadcn.com/
[rtk-url]: https://redux-toolkit.js.org/
[rtk-query-url]: https://redux-toolkit.js.org/rtk-query/overview
[react-router-dom-url]: https://reactrouter.com/
[docker-url]: https://www.docker.com/
[github-actions-url]: https://github.com/features/actions
