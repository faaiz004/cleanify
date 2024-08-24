from flask import Flask, request, jsonify

from flask_cors import CORS
from uuid import uuid4
from backend.uow import UnitOfWork
from backend.api.utils import *
from backend.models.user import *
from backend.models.container import *
from backend.models.vehicle import *
from backend.exception_types import *

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def base():
    return {'message': 'Hello, World!'}


@app.errorhandler(CustomException)
def handle_exceptions(e: CustomException):
    payload = {
        "message": e.message,
        "name": e.name,
    }
    return payload, e.status_code

# curl -X POST -d '{"full_name":"juicy", "type":"GOVERNMENT", "email":"1234@gmail.com", "password":"root"}' http://127.0.0.1:5000/sign-up
@app.route('/sign-up', methods=['POST'])
@provide_req_and_uow_and_handle_exceptions(happy_path_commit=True)
@validate_post_payload(params=["email", "password", "full_name", "type"])
def sign_up(uow:UnitOfWork, req):
    
    if uow.users.get_by_email(email=req["email"]):
        raise UowCloseRaiseCustom("UserWithThisEmailAlreadyExists", f"""user with email ({req["email"]}) already exists""")
    
    u = User(
        id = str(uuid4()),
        email= req["email"],
        password= req["password"],
        full_name=req["full_name"],
        type=UserType[req["type"]].name
    )
    uow.users.add(u)

    return Response(
        message="User created successfully",
        status_code=200,
        data=u.id
    ).__dict__


#   curl -X POST -d '{"email":"1234@gmail.comm", "password":"root"}' http://127.0.0.1:5000/log-in
@app.route('/log-in', methods=['POST'])
@provide_req_and_uow_and_handle_exceptions(happy_path_commit=False)
@validate_post_payload(params=["email", "password"])
def log_in(uow:UnitOfWork, req):
    
    u = uow.users.get_by_email(email=req["email"])
    
    if not u:
        raise UowCloseRaiseCustom("UserDoesNotExist", f"User with email {req['email']} does not exist")
    if req["password"] != u.password:
        raise UowCloseRaiseCustom("InvalidPassword", "Password incorrect")
    

    return Response(
        message="User logged in successfully",
        status_code=200,
        data=u.id
    ).__dict__

def validate_location(l: str):
    try:
        lat, long= int(l.split(",")[0][1:]), int(l.split(",")[1][:-1])
    except Exception as e:
        raise UowCloseRaiseCustom("InvalidFormat", "The location should be in the (float, float) format")

# curl -X POST -d '{"location":"(0,0)"}' http://127.0.0.1:5000/create-container
@app.route('/create-container', methods=['POST'])
@provide_req_and_uow_and_handle_exceptions(happy_path_commit=True)
@validate_post_payload(params=["location"])
def create_container(uow:UnitOfWork, req):
    
    validate_location(req["location"])

    c = Container(
        id=str(uuid4()),
        updated_at=datetime.now(),
        depth=0,
        status=ContainerStatus["TO_PICK"].name,
        location=req["location"]
    )

    uow.containers.add(c)
    
    return Response(
        message="Container Created Successfully",
        status_code=200,
    ).__dict__


# curl  http://127.0.0.1:5000/get-all-containers
@app.route('/get-all-containers', methods=['GET'])
@provide_req_and_uow_and_handle_exceptions(happy_path_commit=False)
@validate_get_payload(params=[])
def get_all_containers(uow: UnitOfWork, req):
    c_list = uow.containers.get_all()
    return Response(
        message="All Containers Returned",
        status_code=200,
        data=c_list
    ).__dict__


# curl -X POST -d '{"user_id":""2519d1fa-66aa-4869-86b8-d919acbf4b9c, "location":"(0,0)"}' http://127.0.0.1:5000/create-vehicle
@app.route('/create-vehicle', methods=['POST'])
@provide_req_and_uow_and_handle_exceptions(happy_path_commit=True)
@validate_post_payload(params=["user_id", "location"])
def create_vehicle(uow:UnitOfWork, req):
    
    validate_location(req["location"])
    u = uow.users.get(req["user_id"])
    if not u:
        raise UowCloseRaiseCustom("UserDoesNotExist", f"User with id {req['user_id']} does not exist")
    if u.type != "GOVERNMENT":
        raise UowCloseRaiseCustom("InvalidUserType", "Only government users can create vehicles!")
    
    v = Vehicle(
        id=str(uuid4()),
        user_id=req["user_id"],
        status=VehicleStatus["NOT_WORKING"].name,
        location=req["location"]
    )

    uow.vehicles.add(v)

    return Response(
        message="Vehicle Created Successfully",
        status_code=200,
    ).__dict__
