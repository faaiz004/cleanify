from psycopg2.extras import DictCursor
from backend.models.container import Container
import typing as t
from backend.exception_types import *
class ContainerRepository:
    def __init__(self, connection):
        self.connection = connection
        self.cursor = connection.cursor(cursor_factory=DictCursor)

    def add(self, container: Container):
        p = container.__dict__.keys()
        sql = f"""
            INSERT INTO containers ({
                ", ".join(p)
            }) 
            values ({", ".join([f"%({k})s" for k in p])})
            """
        self.cursor.execute(
            sql,
            container.__dict__
        )

    def get(self, id: str) -> Container:
        self.cursor.execute(f"SELECT * FROM containers WHERE id = '{id}'")
        container = self.cursor.fetchone()

        if not container:
            raise UowCloseRaiseCustom("ContainerDoesNotExist", f"Container with id {id} does not exist")
        
        return Container(**container)
    
    def get_all(self) -> t.List[Container]:
        self.cursor.execute("SELECT * FROM containers")
        rows = self.cursor.fetchall()
        return [Container(**c) for c in rows]