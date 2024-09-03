from psycopg2.extras import DictCursor
from backend.models.point import Point
import typing as t

class PointRepository:
    def __init__(self, connection):
        self.connection = connection
        self.cursor = connection.cursor(cursor_factory=DictCursor)

    def add(self, point: Point):
        p = point.__dict__.keys()
        sql = f"""
            INSERT INTO points ({
                ", ".join(p)
            }) 
            values ({", ".join([f"%({k})s" for k in p])})
            """
        self.cursor.execute(
            sql,
            point.__dict__
        )

    def get(self, id: str) -> Point:
        self.cursor.execute(f"SELECT * FROM points WHERE id = '{id}'")
        point = self.cursor.fetchone()
        return Point(**point)
        
    def get_all_of_user(self, user_id: str) -> t.List[Point]:
        self.cursor.execute(f"SELECT * FROM points WHERE user_id = '{user_id}'")
        rows = self.cursor.fetchall()
        return [Point(**c) for c in rows]