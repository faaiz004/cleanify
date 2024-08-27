from psycopg2.extras import DictCursor
from backend.models.area import Area
import typing as t

class AreaRepository:
    def __init__(self, connection):
        self.connection = connection
        self.cursor = connection.cursor(cursor_factory=DictCursor)

    def add(self, area: Area):
        p = area.__dict__.keys()
        sql = f"""
            INSERT INTO areas ({
                ", ".join(p)
            }) 
            values ({", ".join([f"%({k})s" for k in p])})
            """
        self.cursor.execute(
            sql,
            area.__dict__
        )

    def get(self, id: str) -> Area:
        self.cursor.execute(f"SELECT * FROM areas WHERE id = '{id}'")
        area = self.cursor.fetchone()
        return Area(**area) if area else None
    
    def get_all(self) -> t.List[Area]:
        self.cursor.execute("SELECT * FROM areas")
        rows = self.cursor.fetchall()
        return [Area(**c) for c in rows]