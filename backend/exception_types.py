class ExceptionWithName(Exception):
    """Base class for exceptions with a name attribute"""

    def __init__(self, name, message):
        self.name = name
        self.message = message
        super().__init__(message)

class UowCloseRaiseCustom(ExceptionWithName):
    """Raised when uow needs to be closed and a custom_exception (message) is raised"""

class UowCommitCloseRaiseCustom(ExceptionWithName):
    """Raised when uow needs to be committed, closed and a custom_exception (message) is raised"""
