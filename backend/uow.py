import psycopg2
from os import environ as env
from backend.repositories.user import UserRepository

class UnitOfWork:
    
    def __init__(self):
        DB_HOST=env['DB_HOST']
        DB_NAME=env['DB_NAME']
        DB_USER=env['DB_USER']
        DB_PASSWORD=env['DB_PASSWORD']
        DB_PORT=env['DB_PORT']

        self.connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT
        )

        self.dict_cursor = self.connection.cursor(cursor_factory=psycopg2.extras.DictCursor)

        self.users = UserRepository(self.connection)

    def commit_close(self):
        self.connection.commit()
        self.connection.close()

    def close(self):
        self.connection.close()