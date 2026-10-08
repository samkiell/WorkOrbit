# WorkOrbit Product Requirements

## 1. Overview

WorkOrbit is a decentralized freelance marketplace built around Stellar payments and Soroban escrow.

The product connects clients and freelancers while using programmable escrow to reduce payment risk and support milestone-based work.

## 2. Problem

Freelancers face payment delays, cross-border payment friction, and uncertainty around whether completed work will be paid for.

Clients also need a structured way to fund work, approve milestones, and resolve disputes.

## 3. Goals

- Make freelance payments fast and transparent.
- Use Soroban escrow instead of relying entirely on platform custody.
- Support milestone-based contracts.
- Make cross-border Stellar payments practical.
- Provide a clear marketplace experience for clients and freelancers.

## 4. Core User Flows

### Client

1. Create an account.
2. Create and publish a job.
3. Select a freelancer.
4. Create a contract and milestones.
5. Fund escrow.
6. Review submitted work.
7. Release milestone payments.
8. Resolve disputes when required.

### Freelancer

1. Create an account.
2. Browse available jobs.
3. Submit proposals.
4. Accept a contract.
5. Submit milestone work.
6. Receive Stellar payments.
7. Raise a dispute when necessary.

## 5. Core Features

### Marketplace

- Job creation and management
- Job discovery
- Freelancer proposals
- Contract management
- User profiles

### Payments

- Stellar wallet connection
- Escrow funding
- Milestone releases
- Full contract release
- Refunds
- Payment history

### Disputes

- Dispute creation
- Escrow freeze
- Administrative resolution
- Atomic payment/refund split

## 6. Non-Goals

The first phase will not attempt to build:

- A generalized social network
- A full banking application
- Complex token issuance
- Off-chain payment processing that bypasses Stellar

## 7. Success Criteria

A successful first release should allow a client and freelancer to complete a testnet contract from job creation through milestone delivery and Stellar escrow payment.

## 8. Product Principle

Blockchain should solve a real product problem. Users should interact with a simple freelance marketplace, while Stellar and Soroban handle settlement and escrow where they provide a clear advantage.
