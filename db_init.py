import sqlite3

conn = sqlite3.connect('users.db')
# connect to a database, if such db not exist, create one and then connect 

# create a table
conn.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)")

# # insert some records
conn.execute("INSERT OR IGNORE INTO users (username, email, password) VALUES ('cassie', 'cassie@email.com','Cassie00'), ('eddie', 'eddie@email.com','Eddie111')")
conn.commit()