# app.py

from flask import Flask, jsonify
import sqlite3
import pandas as pd
import os

# -------------------------
# CONFIG
# -------------------------
DB_NAME = "students.db"
CSV_FILE = "students.csv"

# -------------------------
# CREATE DB FROM CSV (if not exists)
# -------------------------
if not os.path.exists(DB_NAME):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    
    # Create table
    c.execute("""
    CREATE TABLE students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        gender TEXT,
        attendance REAL,
        marks REAL,
        scholar_type TEXT,
        study_time REAL,
        scholarship INTEGER,
        assignment_submission REAL
    )
    """)
    
    # Load CSV into pandas
    df = pd.read_csv("students.csv")
    
    # Insert into SQLite
    df.to_sql("students", conn, if_exists="append", index=False)
    
    conn.commit()
    conn.close()

# -------------------------
# INIT FLASK
# -------------------------
app = Flask(__name__)
DB_NAME ="students.db"


# -------------------------
# HELPER FUNCTION: DB CONNECT
# -------------------------
# Helper function to fetch all students from database as dictionaries
def get_all_students():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # Allows dict-like access
    c = conn.cursor()
    c.execute("SELECT * FROM students")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]


# -------------------------
# ROUTES
# -------------------------

# Home route
@app.route("/")
def home():
    return "Flask backend running! Go to /students or /stats"

# 1️⃣ Get all students
@app.route("/students", methods=["GET"])
def students():
    students_list = get_all_students()
    return jsonify(students_list)

# 2️⃣ Get dashboard stats
@app.route("/stats", methods=["GET"])
def stats():
    students_list = get_all_students()
    total_students = len(students_list)

    if total_students == 0:
        return jsonify({
            "total_students": 50,
            "avg_marks": 0,
            "avg_attendance": 0,
            "scholarship_count": 0,
            "hosteller_count": 0,
            "day_scholar_count": 0
        })

    avg_marks = round(sum(float(s["Marks Average"]) for s in students_list)/total_students, 2)
    avg_attendance = round(sum(float(s["Attendance %"].replace('%','')) for s in students_list)/total_students, 2)
    scholarship_count = sum(1 for s in students_list if str(s["Scholarship"]).lower() in ["1","yes"])
    hosteller_count = sum(1 for s in students_list if str(s["Scholar Type"]).lower() == "hosteller")
    day_scholar_count = total_students - hosteller_count

    return jsonify({
        "total_students": total_students,
        "avg_marks": avg_marks,
        "avg_attendance": avg_attendance,
        "scholarship_count": scholarship_count,
        "hosteller_count": hosteller_count,
        "day_scholar_count": day_scholar_count
    })

# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)