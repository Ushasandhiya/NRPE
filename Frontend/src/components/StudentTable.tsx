import React from 'react';
import { Student } from '../types';

interface StudentTableProps {
  students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  const getRiskBadgeClass = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'High': return 'risk-badge high-risk';
      case 'Medium': return 'risk-badge medium-risk';
      case 'Low': return 'risk-badge low-risk';
      default: return 'risk-badge';
    }
  };

  return (
    <div className="student-table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Attendance</th>
            <th>Marks Average</th>
            <th>Health Issues</th>
            <th>Assignment</th>
            <th>Risk Score</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.RollNo}>
              <td>{student.RollNo}</td>
              <td className="student-name">
                <div className="avatar">{student.Name.charAt(0)}</div>
                {student.Name}
              </td>
              <td>
                <div className="attendance-bar">
                  <div 
                    className="attendance-fill"
                    style={{ width: `${student.Attendance}%` }}
                  ></div>
                  <span className="attendance-text">{student.Attendance}%</span>
                </div>
              </td>
              <td>{student.MarksAverage}%</td>
              <td>{student.HealthIssues === "None" ? "None" : "⚠️"}</td>
              <td className={`assignment-${student.AssignmentSubmission.toLowerCase().replace(' ', '-')}`}>
                {student.AssignmentSubmission}
              </td>
              <td>{student.RiskScore?.toFixed(1) || 'N/A'}</td>
              <td>
                <span className={getRiskBadgeClass(student.RiskLevel)}>
                  {student.RiskLevel || 'N/A'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;