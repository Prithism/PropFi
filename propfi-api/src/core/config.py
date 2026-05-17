from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "PropFi"
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/propfi"
    JWT_SECRET: str = "your-secret-key" # In production, set via environment variable
    JWT_ALGORITHM: str = "HS256"
    IPFS_GATEWAY_URL: str = "https://ipfs.io/ipfs/"
    PINATA_API_KEY: str = ""
    PINATA_SECRET_API_KEY: str = ""
    POLYGON_RPC_URL: str = "https://polygon-rpc.com"
    CONTRACT_ADDRESS: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
