from datetime import datetime
from dataclasses import dataclass
from enum import Enum

@dataclass(frozen=True)
class ContainerStatus(str, Enum):
    TO_PICK=1
    BEING_PICKED_UP=2

@dataclass
class Container:
    id: str
    updated_at: datetime
    depth: float
    status: str
    location: str