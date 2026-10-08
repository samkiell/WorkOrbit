# WorkOrbit Frontend

Next.js frontend for WorkOrbit, a Stellar-powered freelance marketplace prototype.

## Setup
```bash
cd frontend
npm ci
npm run dev
```

Set the backend API base URL and Stellar network configuration using the environment variables documented in the project setup guide. Never expose a Stellar secret key or backend-only secret through a `NEXT_PUBLIC_*` variable.

## Validation
```bash
npm run lint
npm run build
```

## Production status
The UI is not a guarantee that the backend or Soroban contract is production-ready. Do not enable real-fund flows until transaction confirmation checks, wallet signing, escrow state transitions, dependency audits, and testnet end-to-end scenarios have passed review.
