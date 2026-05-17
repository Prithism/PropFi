# PropFi - Blockchain Property Registry

PropFi is a production-grade, decentralized property registry MVP. It bridges real-world real estate assets to Web3, allowing users to mint, transfer, and securely verify property ownership on the Polygon blockchain utilizing ERC721 NFT standards.

## Architecture & Tech Stack

The platform enforces strict separation of concerns across presentation, business logic, data, and infrastructure layers.

*   **Frontend (`/propfi-web`)**: Next.js (App Router), Tailwind CSS v4, shadcn/ui. Handles wallet connectivity and UI rendering.
*   **Backend (`/propfi-api`)**: FastAPI (Python), PostgreSQL, SQLAlchemy. Acts as an off-chain fast-read cache and interfaces with IPFS.
*   **Blockchain (`/propfi-contracts`)**: Solidity (Foundry/OpenZeppelin). Serves as the single definitive source of truth for property ownership.
*   **Storage**: IPFS (via Pinata) for decentralized, immutable metadata hosting.

---

## Local Development Setup

### Prerequisites
*   Node.js (v18+)
*   Python (3.11 or 3.12 recommended to avoid missing C++ wheel compilation issues)
*   PostgreSQL running locally or via Docker
*   MetaMask (or compatible Web3 wallet) browser extension

### 1. Frontend Configuration
The frontend is built for maximum speed and type safety, omitting heavy libraries in favor of custom, strictly-typed Web3 hooks.

```powershell
cd propfi-web
npm install
npm run dev
```
*The Next.js application will be available at `http://localhost:3000`.*

### 2. Backend Configuration
The backend strictly uses dependency injection and structured error handling. 

```powershell
cd propfi-api
python -m venv venv

# Activate Virtual Environment (Windows)
.\venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

### 3. Environment Variables
You must set up your environment variables before running the backend. Never hardcode secrets into the repository. 

Copy the example file to initialize your configuration:
```powershell
cp propfi-api/.env.example propfi-api/.env
```

**Required `.env` values:**
```ini
PROJECT_NAME="PropFi"
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/propfi"
JWT_SECRET="<generate_secure_random_hash>"
JWT_ALGORITHM="HS256"

# Pinata IPFS (Get keys from https://app.pinata.cloud/)
IPFS_GATEWAY_URL="https://ipfs.io/ipfs/"
PINATA_API_KEY=""
PINATA_SECRET_API_KEY=""

# Polygon RPC
POLYGON_RPC_URL="https://polygon-rpc.com"
CONTRACT_ADDRESS=""
```

### 4. Running the Backend Server
```powershell
cd propfi-api
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```
*Swagger API Documentation will be available at `http://localhost:8000/docs`.*

---

## Code Quality & Standards

This project strictly adheres to production-level standards:
- **No `any` in TypeScript**: All Web3 interactions and APIs must be strongly typed.
- **One Responsibility**: UI components handle layout; hooks (`useWallet`) handle Web3 state and business logic.
- **Graceful Error Handling**: JSON-RPC errors are caught, mapped to human-readable text, and surfaced cleanly in the UI. No silent failures or browser alerts.
- **Environment First**: All dynamic configuration must flow through environment variables.