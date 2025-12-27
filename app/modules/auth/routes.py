
from fastapi import APIRouter, HTTPException
from app.modules.auth.schemas import LoginRequest
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
def login(data: LoginRequest):
    # Mock user
    if data.email != "medico@teste.com" or data.password != "123456":
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_access_token({"sub": data.email, "role": "medico"})
    return {"access_token": token, "role": "medico"}
