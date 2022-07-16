import pymysql
from config import Config

def connect_to_db():
    return pymysql.connect(user=Config.user, host=Config.host, database=Config.database, password=Config.password)
