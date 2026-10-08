# WorkOrbit Architecture

## High-Level

WorkOrbit uses three primary application layers:

1. Next.js frontend
2. NestJS backend
3. Soroban escrow contracts on Stellar

## Frontend

The frontend is responsible for:

- Marketplace pages
- Authentication UI
- Jobs and proposals
- Contracts and milestones
- Wallet connection
- Transaction signing
- Payment status

## Backend

The backend handles:

- Authentication
- Users
- Jobs
- Contracts
- Milestones
- Escrow service
- Database persistence
- Stellar transaction preparation

The backend should not custody user private keys.

## Blockchain

Soroban contracts provide the escrow state machine.

Expected operations include:

- Fund escrow
- Release a milestone
- Release remaining funds
- Refund
- Open a dispute
- Resolve a dispute

## Data Flow

Client -> Next.js -> NestJS -> Stellar/Soroban

Wallet-signed transactions -> Stellar -> Horizon -> application status

## Trust Boundary

The application database stores marketplace metadata and application state.

Escrowed funds are controlled by the Soroban contract once funded. Contract state and Stellar transaction history should remain independently verifiable.

## Future Integration Priority

1. Freighter wallet connection
2. Contract deployment to Stellar testnet
3. Backend contract invocation
4. Frontend escrow actions
5. Transaction verification and event indexing
