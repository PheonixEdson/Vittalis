
from fastapi import APIRouter
from app.modules.apac.schemas import APACCreate

router = APIRouter(prefix="/apac", tags=["APAC"])

@router.post("/")
def criar_apac(apac: APACCreate):
    return {"message": "APAC criada com sucesso", "apac": apac}

@router.get("/pendentes")
def listar_pendentes():
    return [
        {"id": 1, "paciente": "João da Silva", "cid": "C50", "status": "pendente"},
        {"id": 2, "paciente": "Maria Oliveira", "cid": "C34", "status": "pendente"}
    ]

@router.put("/{apac_id}/aprovar")
def aprovar_apac(apac_id: int):
    return {"message": f"APAC {apac_id} aprovada"}
