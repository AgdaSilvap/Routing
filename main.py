from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from core.configs import settings
from api.v1.api import api_router
import uvicorn

app = FastAPI(title="Trabalho de EMPR")
app.include_router(api_router, prefix=settings.API_V1_STR)

# Montando o diretório estático para servir arquivos CSS, JS, imagens e HTML
app.mount("/static", StaticFiles(directory="static"), name="static")

# Verifica se o script está sendo executado diretamente
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info", reload=True)

# Rota para a página Home (index.html)
@app.get("/")
async def home():
    return FileResponse("static/html/index.html")

# Rota para a página "Por que o Routing?" (recursos.html)
@app.get("/recursos")
async def recursos():
    return FileResponse("static/html/recursos.html")

# Rota para a página "Orçamento" (orcamento.html)
@app.get("/orcamento")
async def orcamento():
    return FileResponse("static/html/orcamento.html")

# Rota para a página de Login (login.html)
@app.get("/login")
async def login():
    return FileResponse("static/html/login.html")

# Rota para a página de Ambiente de Usuário (ambiente-usuario.html)
@app.get("/ambiente_usuario")
async def ambiente_usuario():
    return FileResponse("static/html/ambiente-usuario.html")

# Rota para a página de Planejar Rota (planejar-rota.html)
@app.get("/planejar_rota")
async def planejar_rota():
    return FileResponse("static/html/planejar-rota.html")