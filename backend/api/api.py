from flask import Flask, request, jsonify

from uuid import uuid4
from backend.uow import UnitOfWork
from backend.api.utils import *
from backend.models.user import *
from backend.exception_types import *

app = Flask(__name__)

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

@app.route('/sign-up', methods=['POST'])
@provide_req_and_uow_and_handle_exceptions(happy_path_commit=True)
@validate_payload(params=["email", "password", "full_name", "type"])
def sign_up(req, uow: UnitOfWork):
    
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

@app.route('/log-in', methods=['POST'])
@provide_req_and_uow_and_handle_exceptions(happy_path_commit=False)
@validate_payload(params=["email", "password"])
def log_in(req, uow: UnitOfWork):
    
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
