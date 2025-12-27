
from pydantic import BaseModel

class APACCreate(BaseModel):
    paciente: str
    cid: str
    procedimento: str
    medico: str
