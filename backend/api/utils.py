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
            req = request.get_json(force=True)
            try:
                r = func(req, uow, *args, **kwargs)
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

def validate_payload(params: list):
    def decorator(func):
        @wraps(func)
        def wrapper(req, *args, **kwargs):
            for each in params:
                if each not in req.keys():
                    raise CustomException("MissingParameters",f"Parameter missing: {each}")
            
            return func(req, *args, **kwargs)
        return wrapper
    return decorator