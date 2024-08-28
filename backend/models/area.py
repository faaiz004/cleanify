import typing as t
from backend.exception_types import *
from dataclasses import dataclass
from backend.models.utils import *


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
        
        x, y= Location(obj.location).get_lat_long()
        x0, y0 = Location(self.center).get_lat_long()
        
        return (x - x0)**2 + (y - y0)**2 <= self.radius**2

    def filter_obj_with_locations(
        self, 
        objects: t.List[t.Any],
    )-> t.List[t.Any]:
        """Filter objects that are inside the circle"""
        return [o for o in objects if self.contains(o)]
        