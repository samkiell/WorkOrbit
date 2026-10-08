# WorkOrbit

WorkOrbit is a Stellar-powered freelance marketplace prototype focused on jobs, milestone contracts, and Soroban-based escrow.

> **Status: under active development, not production-ready.** Do not use this deployment to custody or transfer real funds until the application, dependency tree, and escrow contract have passed security review and end-to-end testnet validation.

## Repository layout

- `frontend/`: Next.js web application.
- `backend/`: NestJS API, Prisma data layer, authentication, jobs, contracts, and payment integration.
- `contract/`: Rust/Soroban escrow contract and contract tests.
- `docs/`: product, architecture, security, and contributor documentation.

## Local development

Use Node.js 20 or the version pinned by CI, npm, Rust, and PostgreSQL.

### Backend
```bash
cd backend
cp .env.example .env
# Set DATABASE_URL, JWT_SECRET, and REFRESH_TOKEN_PEPPER to local values.
npm ci
npx prisma migrate dev
npm run start:dev
```

### Frontend
```bash
cd frontend
npm ci
npm run dev
```

### Soroban contract
```bash
cd contract
cargo test
cargo build --target wasm32-unknown-unknown --release
```

Set all Stellar network and contract environment values deliberately. Start on testnet; never put a Stellar secret key in frontend code, commits, or logs.

## Security and readiness

- See [SECURITY.md](SECURITY.md) for vulnerability reporting.
- Use the example environment files only as templates; generate unique secrets for every environment.
- Review the dependency-health and CI results before deployment.
- The backend uses PostgreSQL and Prisma; the Soroban contract is a separate on-chain component.
- Blockchain transaction existence alone is not sufficient evidence that an escrow action matches the intended contract state. Verify transaction operations and contract state.
- Production readiness requires clean dependency audits, passing CI, end-to-end tests against a deployed testnet contract, operational monitoring, backups, incident response, and an independent smart-contract review.

## Contributing

Submit focused pull requests with tests for behaviour changes. Do not fabricate historical commits or mark incomplete functionality as production-ready.
