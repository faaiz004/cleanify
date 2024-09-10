import vroom

problem_instance = vroom.Input(
    servers={"auto": "router.project-osrm.org:443"},
    router=vroom._vroom.ROUTER.OSRM
)
kalma_chowk = (31.595972812337553, 74.34572422484837)
problem_instance.add_vehicle(vroom.Vehicle(1, start=(31.595972812337553, 74.34572422484837), profile="auto"))

problem_instance.add_job([
    # vroom.Job(1, location=(53.1392942235985, 18.00088454490479)),
    vroom.Job(2, location=(31.59613779790846, 74.3452983732481)),
    vroom.Job(3, location=(31.595653539263814 , 74.34532156098771)),
])

sol = problem_instance.solve(exploration_level=5, nb_threads=4)
print(sol.routes[["vehicle_id", "type", "arrival", "longitude","latitude", "id"]])
