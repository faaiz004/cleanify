from psycopg2.extras import DictCursor
from backend.models.vehicle import Vehicle
import typing as t

class VehicleRepository:
    def __init__(self, connection):
        self.connection = connection
        self.cursor = connection.cursor(cursor_factory=DictCursor)

    def add(self, vehicle: Vehicle):
        p = vehicle.__dict__.keys()
        sql = f"""
            INSERT INTO vehicles ({
                ", ".join(p)
            }) 
            values ({", ".join([f"%({k})s" for k in p])})
            """
        self.cursor.execute(
            sql,
            vehicle.__dict__
        )

    def get(self, id: str) -> Vehicle:
        self.cursor.execute(f"SELECT * FROM vehicles WHERE id = '{id}'")
        vehicle = self.cursor.fetchone()
        return Vehicle(**vehicle)
    
    def get_all(self) -> t.List[Vehicle]:
        self.cursor.execute("SELECT * FROM vehicles")
        rows = self.cursor.fetchall()
        return [Vehicle(**c) for c in rows]
    
    def get_all_of_user(self, user_id: str) -> t.List[Vehicle]:
        self.cursor.execute(f"SELECT * FROM vehicles WHERE user_id = '{user_id}'")
        rows = self.cursor.fetchall()
        return [Vehicle(**c) for c in rows]