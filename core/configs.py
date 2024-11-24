from typing import List
from typing import ClassVar


from pydantic_settings import BaseSettings
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='/.env.exemple')

class Settings(BaseSettings):
    API_V1_STR: str = '/api/v1'
    DB_URL: str = f"postgresql+asyncpg://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{int(os.getenv('DB_PORT', 5432))}/{os.getenv('DB_NAME')}"
    DBBase: ClassVar = declarative_base()

    JWT_SECRET_KEY: str = os.getenv('JWT_SECRET_KEY', 'default_secret_key')
    JWT_ALGORITHM: str = 'HS256'
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    class Config:
        case_sensitive = True


settings: Settings = Settings()