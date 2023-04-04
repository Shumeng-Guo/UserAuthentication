import sqlite3

def get_db():
    conn = sqlite3.connect('users.db')
    # cur = conn.execute("SELECT * FROM users")
    return conn



'''
# commit the changes
conn.commit()

# retrieve data from database
cur = conn.execute("SELECT * FROM users")
for row in cur:
    print(row)

# conn.close()
'''

