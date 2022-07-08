import pymysql

database = 'UpWork'
password = '1234678901_pP'
host = 'localhost'
user = 'root'

def connect_to_db():
    return pymysql.connect(user=user, host=host, database=database, password=password)
