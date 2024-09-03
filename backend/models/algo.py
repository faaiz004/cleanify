import vroom
import vroom.solution.solution

problem_instance = vroom.Input(
    servers={"auto": "valhalla1.openstreetmap.de:443"},
    router=vroom._vroom.ROUTER.VALHALLA
)
problem_instance.add_vehicle(vroom.Vehicle(1, start=(2, 48.81), profile="auto"))
problem_instance.add_vehicle(vroom.Vehicle(2, start=(3, 48.81), profile="auto"))

problem_instance.add_job([
    vroom.Job(1, location=(2.44, 48.81)),
    vroom.Job(2, location=(2.46, 48.7)),
    vroom.Job(3, location=(2.42, 48.6)),
])


sol: vroom.solution.solution.Solution = problem_instance.solve(exploration_level=5, nb_threads=4)
print(sol.routes[["vehicle_id", "type", "arrival", "longitude","latitude", "id"]])