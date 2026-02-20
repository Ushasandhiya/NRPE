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
# CREATE DATABASE (ONLY IF NOT EXISTS)
# -------------------------
if not os.path.exists(DB_NAME):
    conn = sqlite3.connect(DB_NAME)
    df = pd.read_csv(CSV_FILE)
    df.to_sql("students", conn, index=False)
    conn.close()

# -------------------------
# INIT FLASK
# -------------------------
app = Flask(__name__)

# -------------------------
# HELPER FUNCTIONS
# -------------------------
def get_all_students():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT * FROM students")
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def get_column_names():
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()
    cur.execute("PRAGMA table_info(students)")
    cols = [row[1] for row in cur.fetchall()]
    conn.close()
    return cols


# -------------------------
# ROUTES
# -------------------------
@app.route("/")
def home():
    return "Flask backend running! Go to /students or /stats"


@app.route("/students")
def students():
    return jsonify(get_all_students())


@app.route("/stats")
def stats():
    students = get_all_students()

    total_students = len(students)

    if total_students == 0:
        return {
            "total_students": 0,
            "avg_marks": 0,
            "avg_attendance": 0,
            "scholarship_count": 0,
            "hosteler_count": 0,
            "day_scholar_count": 0
        }

    # ---- AVERAGES ----
    avg_marks = sum(
        float(s.get("Marks Average", 0) or 0)
        for s in students
        if str(s.get("Marks Average", "")).strip() != ""
    ) / total_students

    avg_attendance = sum(
        float(s.get("Attendance %", 0) or 0)
        for s in students
        if str(s.get("Attendance %", "")).strip() != ""
    ) / total_students

    # ---- SCHOLARSHIP COUNT (Yes / No) ----
    scholarship_count = sum(
        1 for s in students
        if str(s.get("Scholarship", "")).strip().lower() == "yes"
    )

    # ---- SCHOLAR TYPE ----
    hosteler_count = sum(
        1 for s in students
        if str(s.get("Scholar Type", "")).strip().lower() == "hosteler"
    )

    day_scholar_count = sum(
        1 for s in students
        if str(s.get("Scholar Type", "")).strip().lower() == "day scholar"
    )

    return {
        "total_students": total_students,
        "avg_marks": round(avg_marks, 2),
        "avg_attendance": round(avg_attendance, 2),
        "scholarship_count": scholarship_count,
        "hosteler_count": hosteler_count,
        "day_scholar_count": day_scholar_count
    }


# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":
    print("DB columns:", get_column_names())  # one-time visibility
    app.run(debug=True)
