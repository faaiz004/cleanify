from dataclasses import dataclass
from enum import Enum

class PointType(str, Enum):
    STARTING = 0
    DUMPING = 1


@dataclass
class Point:
    type: PointType
    location: str
    name: str
    user_id: str
    id: str