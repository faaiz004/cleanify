from dataclasses import dataclass
from enum import Enum




class UserType(str, Enum):
    ADMIN=1
    GOVERNMENT=2
    PRIVATE=3


@dataclass
class User:

    id: str
    email: str
    password: str
    full_name: str
    type: str