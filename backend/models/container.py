from datetime import datetime
from dataclasses import dataclass
from enum import Enum
import random

@dataclass(frozen=True)
class ContainerStatus(str, Enum):
    TO_PICK=1
    BEING_PICKED_UP=2

@dataclass(frozen=True)
class FillStatus(str, Enum):
    OVERFLOWING=1
    FULL=2
    NORMAL=3
    EMPTY=4

@dataclass
class Container:
    id: str
    updated_at: datetime
    depth: float
    status: str
    location: str
    # TODO: set this on the basis of the depth measurement
    fill_status: str = random.choice(FillStatus._member_names_)