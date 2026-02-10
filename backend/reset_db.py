import sqlite3
import pandas as pd

DB_NAME = "students.db"
CSV_FILE = "students.csv"

# Delete existing table if it exists
conn = sqlite3.connect(DB_NAME)
c = conn.cursor()
c.execute("DROP TABLE IF EXISTS students")
conn.commit()

# Load CSV
df = pd.read_csv(CSV_FILE)

# Create table automatically from CSV
df.to_sql("students", conn, if_exists="replace", index=False)

conn.close()

print("Database reset and CSV loaded successfully!")