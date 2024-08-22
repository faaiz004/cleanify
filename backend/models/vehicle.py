from dataclasses import dataclass
from enum import Enum

@dataclass(frozen=True)
class VehicleStatus(str, Enum):
    WORKING = 1
    NOT_WORKING = 2
    BROKEN = 3

@dataclass
class Vehicle:

    id: str
    user_id: str
    location: str
    status: str