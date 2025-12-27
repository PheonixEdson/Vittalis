
from fastapi import FastAPI
from app.modules.auth.routes import router as auth_router
from app.modules.apac.routes import router as apac_router

app = FastAPI(title="Vittalis Backend")

app.include_router(auth_router)
app.include_router(apac_router)

@app.get("/")
def root():
    return {"status": "Vittalis Backend rodando"}
