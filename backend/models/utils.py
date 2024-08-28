from dataclasses import dataclass
from exception_types import *

@dataclass(frozen=True)
class Location:
    value: str # (x, y)

    def validate(self):
        try:
            x, y = float(self.value.split(",")[0][1:]), float(self.value.split(",")[1][:-1])
        except:
            raise UowCloseRaiseCustom("InvalidFormat", "The location should be in the (float, float) format")

    def get_lat_long(self):
        return float(self.value.split(",")[0][1:]), float(self.value.split(",")[1][:-1])