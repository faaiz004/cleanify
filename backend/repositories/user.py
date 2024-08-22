from psycopg2.extras import DictCursor
from backend.models.user import User

class UserRepository:
    def __init__(self, connection):
        self.connection = connection
        self.cursor = connection.cursor(cursor_factory=DictCursor)

    def add(self, user: User):
        p = user.__dict__.keys()
        sql = f"""
            INSERT INTO users ({
                ", ".join(p)
            }) 
            values ({", ".join([f"%({k})s" for k in p])})
            """
        print(sql)
        self.cursor.execute(
            sql,
            user.__dict__
        )

    def get(self, id: str) -> User:
        self.cursor.execute(f"SELECT * FROM users WHERE id = '{id}'")
        user = self.cursor.fetchone()
        return User(**user) if user else None

    def get_by_email(self, email:str) -> User:
        self.cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
        user = self.cursor.fetchone()
        if not user:
            return None
        
        return User(**user)