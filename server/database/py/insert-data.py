from configparser import ConfigParser
import psycopg2
import pandas
import numpy
from psycopg2.extensions import register_adapter, AsIs
from datetime import datetime, timezone, timedelta

dt = datetime.now(timezone.utc)

def addapt_numpy_float64(numpy_float64):
    return AsIs(numpy_float64)
def addapt_numpy_int64(numpy_int64):
    return AsIs(numpy_int64)
register_adapter(numpy.float64, addapt_numpy_float64)
register_adapter(numpy.int64, addapt_numpy_int64)

def config(filename='/Users/spope/Desktop/dev/creativity-tracker/server/database/py/database.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)

    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} not found in the {1} file'.format(section, filename))

    return db

def insert_many(list):
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
		
        # create a cursor
        cur = conn.cursor()
        
	# execute a statement
        sql = 'INSERT INTO tracker (number_creative_hours, rating, overview, created_at, "user") VALUES(%s, %s, %s, %s, 1);'
        cur.executemany(sql,list)
        

        # display the PostgreSQL database server version
        db_version = cur.statusmessage
        print(db_version)

        conn.commit()
       
	# close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

spreadsheet = pandas.read_csv('/Users/spope/Desktop/dev/creativity-tracker/server/database/raw/creativity.csv')

count = 0
insertion_rows = []
for item in spreadsheet['hours']:
    insertion_rows.append((
        spreadsheet['hours'][count],
        spreadsheet['rating'][count],
        spreadsheet['overview'][count][:480], #first 480 characters
        dt-timedelta(days=count),
    ))
    count += 1

# print(insertion_rows)

if __name__ == '__main__':
    insert_many(insertion_rows)
