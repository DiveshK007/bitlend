![CI](https://github.com/DiveshK007/bitlend/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
# BitLend — Wallet-Native Lending dApp

**One-liner:** On-chain credit guardrails and risk limits for simpler, safer lending UX.

## ✨ Features
- Borrow/repay flows with wallet-native prompts
- Risk guardrails (LTV checks, health factor)
- Basic markets and interest accrual (demo logic)

## 🏗️ Architecture
Frontend (Next.js) ↔ Contracts (Solidity/Hardhat)
<!-- Add later: ![Architecture](./docs/architecture.png) -->

## 🧪 Tech Stack
Solidity • Hardhat • Ethers.js • Next.js • TypeScript

## 🚀 Quickstart
\\\ash
git clone https://github.com/DiveshK007/bitlend
cd bitlend
npm ci
cp .env.example .env
npm run dev
\\\

## 📜 Contracts
- LendingPool.sol — core borrow/repay + checks
- OracleMock.sol — demo price feed

## 🗺️ Roadmap
- [ ] Health factor UI + liquidations sim
- [ ] Plug in real oracle (Chainlink)
- [ ] Add unit tests (Foundry/Hardhat)

## 📄 License
MIT

