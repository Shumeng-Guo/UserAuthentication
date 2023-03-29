import sqlite3

conn = sqlite3.connect('users.db')

# create a table
conn.execute("CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)")

# # insert some records
conn.execute("INSERT OR IGNORE INTO users (username, email, password) VALUES ('cassie', 'cassie@email.com','cassie'), ('eddie', 'eddie@email.com','eddie')")
conn.commit()