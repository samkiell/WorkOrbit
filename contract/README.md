# WorkOrbit Soroban Escrow

Rust/Soroban contract for locking freelance contract funds and releasing them through milestone payments or dispute resolution.

## Current contract entrypoints
- `fund`: pulls an approved token amount from the client into the contract and records the client, freelancer, admin, token, and amount.
- `release_milestone`: releases a positive amount to the freelancer, limited by the remaining escrow balance.
- `release`: releases the remaining balance to the freelancer.
- `refund`: returns remaining funds to the client through the permitted caller path.
- `dispute`: freezes further normal release/refund operations.
- `resolve_dispute`: admin-only release, refund, or basis-point split.
- `get_escrow`, `get_admin`, and `version`: read-only inspection methods.

## Local checks
```bash
cargo test
cargo clippy --all-targets -- --deny warnings
cargo build --target wasm32-unknown-unknown --release
```

The CI workflow runs these checks on changes to the repository.

## Deployment status

**Do not deploy to mainnet yet.** A passing unit-test suite does not replace an independent smart-contract audit. Before real funds are used, validate the backend-to-contract state transitions on testnet, verify transaction hashes against the actual contract state, review storage TTL and upgrade controls, and document incident/recovery procedures.

The backend derives a Soroban symbol key from a PostgreSQL UUID by removing UUID hyphens. Keep this mapping consistent between the backend and contract.
