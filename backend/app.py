from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)
DB_NAME = "students.db"


def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/students", methods=["GET"])
def get_students():
    conn = get_db_connection()
    students = conn.execute("SELECT * FROM students").fetchall()
    conn.close()
    students_list = [dict(student) for student in students]
    return jsonify(students_list)


@app.route("/stats", methods=["GET"])
def get_stats():
    conn = get_db_connection()
    total_students = conn.execute("SELECT COUNT(*) FROM students").fetchone()[0]
    avg_marks = conn.execute("SELECT AVG(marks) FROM students").fetchone()[0]
    avg_attendance = conn.execute("SELECT AVG(attendance) FROM students").fetchone()[0]
    scholarship_count = conn.execute("SELECT COUNT(*) FROM students WHERE scholarship = 1").fetchone()[0]
    hosteller_count = conn.execute("SELECT COUNT(*) FROM students WHERE scholar_type = 'Hosteller'").fetchone()[0]
    day_scholar_count = conn.execute("SELECT COUNT(*) FROM students WHERE scholar_type = 'Day Scholar'").fetchone()[0]
    conn.close()
    return jsonify({
        "total_students": total_students,
        "avg_marks": round(avg_marks, 2),
        "avg_attendance": round(avg_attendance, 2),
        "scholarship_count": scholarship_count,
        "hosteller_count": hosteller_count,
        "day_scholar_count": day_scholar_count
    })


if __name__ == "__main__":
    app.run(debug=True)
