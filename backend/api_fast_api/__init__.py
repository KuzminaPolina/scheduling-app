from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from backend.api_fast_api.models import create_database
from backend.api_fast_api.routers_html import router_html
from backend.api_fast_api.routes_admin import router_admin
from backend.api_fast_api.routes_calendar import router_calendar
from backend.api_fast_api.config import STATIC_FOLDER_PATH, ORIGINS

# Создаем экземпляр FastAPI приложения
app = FastAPI()

# Подключаем маршруты из APIRouter
app.include_router(router_admin)  # Маршруты администрирования
app.include_router(router_calendar)  # Маршруты календаря
app.include_router(router_html)  # Маршруты страниц HTML
# Подключаем статические файлы из папки "static"
app.mount("/static", StaticFiles(directory=STATIC_FOLDER_PATH), name="static")

# Добавляем CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Authorization"],
)

# Создаем БД если ее нет
create_database()
