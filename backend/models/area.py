import typing as t
from backend.exception_types import *
from dataclasses import dataclass

@dataclass
class Area:
    """A circle"""
    id: str
    center: str # (x, y)
    radius: float
    name: str

    def contains(self, obj: t.Any) -> bool:
        """Check if the object is inside the circle"""
        
        if not hasattr(obj, "location"):
            raise UowCloseRaiseCustom("ObjectDoesNotHaveLocation", "Object does not have location")
        
        x, y= float(obj.location.split(",")[0][1:]), float(obj.location.split(",")[1][:-1])
        x0, y0= float(self.center.split(",")[0][1:]), float(self.center.split(",")[1][:-1])

        return (x - x0)**2 + (y - y0)**2 <= self.radius**2

    def filter_obj_with_locations(
        self, 
        objects: t.List[t.Any],
    )-> t.List[t.Any]:
        """Filter objects that are inside the circle"""
        return [o for o in objects if self.contains(o)]
        