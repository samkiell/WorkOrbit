# WorkOrbit Backend API

NestJS REST API for WorkOrbit. It provides authentication, user management, job listings, contracts, milestones, and Stellar payment/escrow integration.

## Stack
- NestJS and TypeScript
- PostgreSQL via Prisma
- JWT access tokens and rotating refresh tokens
- class-validator / class-transformer
- Swagger at `/docs`

## Setup
```bash
cd backend
cp .env.example .env
# Configure DATABASE_URL, JWT_SECRET, REFRESH_TOKEN_PEPPER and FRONTEND_URL.
npm ci
npx prisma migrate dev
npm run start:dev
```

The API is available at `http://localhost:3001/api`. API docs are available at `http://localhost:3001/docs`.

## Checks
```bash
npm run lint
npm run build
npm run test
npm run test:cov
npm run test:e2e
```

## Security
Never use the example secrets in a real deployment. Configure production-grade secret values, restrict CORS to the exact frontend origin, apply database migrations deliberately, and use Stellar testnet until the escrow contract and all payment flows have been reviewed. A green build is not a substitute for a smart-contract audit.
