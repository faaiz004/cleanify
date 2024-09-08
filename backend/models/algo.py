import vroom
import vroom.solution.solution
from backend.models.vehicle import *
from backend.models.container import *
from backend.models.point import *
from backend.models.utils import *
from typing import List

def get_optimal_routes(
        vehicles: List[Vehicle],
        containers: List[Container],
        dumping_point: Point,
)-> vroom.solution.solution.Solution.routes:
    
    problem_instance = vroom.Input(
        servers={"auto": "valhalla1.openstreetmap.de:443"},
        router=vroom._vroom.ROUTER.VALHALLA
    )
    x_d, y_d = Location(dumping_point.location).get_lat_long()
    for i, vehicle in enumerate(vehicles):
        x,y = Location(vehicle.location).get_lat_long()
        problem_instance.add_vehicle(
        vroom.Vehicle(
                id=i,
                start=(x,y),
                end=(x_d, y_d),
                description=vehicle.__dict__,
                profile="auto"
            )
        )
        print(f"Vehicle {i} added at {x},{y}")
    for i,container in enumerate(containers):
        x,y = Location(container.location).get_lat_long()
        problem_instance.add_job(
            vroom.Job(
                id=i,
                location=(x, y),
                priority=1,
                description=container.__dict__
            )
        )
        print(f"Container {i} added at {x},{y}")
    
    solution:vroom.solution.solution.Solution = problem_instance.solve(exploration_level=10, nb_threads=10)

    return solution.routes