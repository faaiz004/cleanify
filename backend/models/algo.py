from backend.models.vehicle import Vehicle
from backend.models.container import Container
from backend.models.point import Point
from backend.models.utils import Location
from typing import List
import requests

def get_optimal_routes(
        vehicles: List[Vehicle],
        containers: List[Container],
        dumping_point: Point,
):
    # Convert dumping point location to latitude and longitude
    x_d, y_d = Location(dumping_point.location).get_lat_long()

    # Prepare the payload for the Vroom request
    vehicles_payload = []
    for i, vehicle in enumerate(vehicles):
        x, y = Location(vehicle.location).get_lat_long()
        vehicles_payload.append({
            "id": i,
            "start":   [x, y], # [74.3436,31.5497],
            "end":  [x_d, y_d], # [74.3436,31.5497],
            "description": str(vehicle),  # Optional
            "profile": "car"
        })
        print(f"Vehicle {i} added at {x},{y}")

    jobs_payload = []
    for i, container in enumerate(containers):
        x, y = Location(container.location).get_lat_long()
        jobs_payload.append({
            "id": i,
            "location":  [x, y], # [74.3587,31.5204],
            "priority": 1,  # Optional
            "description": str(container)  # Optional
        })
        print(f"Container {i} added at {x},{y}")

    # Create the final request payload
    payload = {
        "vehicles": vehicles_payload,
        "jobs": jobs_payload
    }

    # Send the request to the Vroom server
    try:
        response = requests.post(
            'http://solver.vroom-project.org',
            json=payload,
            headers={'Content-Type': 'application/json'}
        )

        # Check if the request was successful
        if response.status_code == 200:
            solution = response.json()
            return solution['routes']
        else:
            print(f"Error: Received status code {response.status_code}")
            print(f"Response: {response.text}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error while making the request: {e}")
        return None


# import vroom
# import vroom.solution.solution
# from backend.models.vehicle import *
# from backend.models.container import *
# from backend.models.point import *
# from backend.models.utils import *
# from typing import List

# def get_optimal_routes(
#         vehicles: List[Vehicle],
#         containers: List[Container],
#         dumping_point: Point,
# )-> vroom.solution.solution.Solution.routes:
    
#     problem_instance = vroom.Input(
#         servers={"auto": "valhalla1.openstreetmap.de:443"},
#         router=vroom._vroom.ROUTER.VALHALLA
#     )
#     x_d, y_d = Location(dumping_point.location).get_lat_long()
#     for i, vehicle in enumerate(vehicles):
#         x,y = Location(vehicle.location).get_lat_long()
#         problem_instance.add_vehicle(
#         vroom.Vehicle(
#                 id=i,
#                 start=(x,y),
#                 end=(x_d, y_d),
#                 description=vehicle.__dict__,
#                 profile="auto"
#             )
#         )
#         print(f"Vehicle {i} added at {x},{y}")
#     for i,container in enumerate(containers):
#         x,y = Location(container.location).get_lat_long()
#         problem_instance.add_job(
#             vroom.Job(
#                 id=i,
#                 location=(x, y),
#                 priority=1,
#                 description=container.__dict__
#             )
#         )
#         print(f"Container {i} added at {x},{y}")
    
#     solution:vroom.solution.solution.Solution = problem_instance.solve(exploration_level=5, nb_threads=4)

#     return solution.routes

