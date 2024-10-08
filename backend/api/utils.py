from dataclasses import dataclass
from typing import Any
from functools import wraps
from backend.uow import UnitOfWork
from flask import request
from backend.exception_types import *

@dataclass(frozen=True)
class Response:
    """Response object"""

    message: str
    status_code: int
    data: Any = None

class CustomException(ExceptionWithName):
    """ Catched by the error handler """
    status_code: int=400

def provide_req_and_uow_and_handle_exceptions(
        happy_path_commit: bool
):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            uow = UnitOfWork()

            try:
                req = request.get_json(force=True)
            except:
                # get request
                req = {}

            try:
                r = func(uow, req, *args, **kwargs)
            except UowCloseRaiseCustom as e:
                uow.close()
                raise CustomException(e.name, e.message)
            except UowCommitCloseRaiseCustom as e:
                uow.commit_close()
                raise CustomException(e.name, e.message)
            except Exception as e:
                uow.close()
                raise e

            if happy_path_commit:
                uow.commit_close()
            else:
                uow.close()
            return r

        return wrapper
    return decorator

def validate_post_payload(params: list):
    def decorator(func):
        @wraps(func)
        def wrapper(uow, req, *args, **kwargs):
            for each in params:
                if each not in req.keys():
                    raise CustomException("MissingParameters",f"Parameter missing: {each}")
            
            return func(uow, req, *args, **kwargs)
        return wrapper
    return decorator

def validate_get_payload(params: list):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for each in params:
                if each not in request.args:
                    raise CustomException("MissingParameters",f"Parameter missing: {each}")
            
            return func(*args, **kwargs)
        return wrapper
    return decorator