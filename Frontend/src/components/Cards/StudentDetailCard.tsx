import React from 'react';
import { Student } from '../../types';

interface StudentDetailCardProps {
  student: Student;
  expanded?: boolean;
}

const StudentDetailCard: React.FC<StudentDetailCardProps> = ({ student, expanded = false }) => {
  const getAttendanceStatus = (attendance: number) => {
    if (attendance >= 90) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (attendance >= 75) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (attendance >= 60) return { text: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getMarksStatus = (marks: number) => {
    if (marks >= 80) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (marks >= 65) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (marks >= 50) return { text: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getAssignmentStatus = (status: string) => {
    switch (status) {
      case 'On Time': return { color: 'text-green-600', bg: 'bg-green-100' };
      case 'Late': return { color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'Missing': return { color: 'text-red-600', bg: 'bg-red-100' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const attendanceStatus = getAttendanceStatus(student.Attendance);
  const marksStatus = getMarksStatus(student.MarksAverage);
  const assignmentStatus = getAssignmentStatus(student.AssignmentSubmission);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {student.Name.charAt(0)}
            </div>
            {student.RiskLevel === 'High' && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⚠️</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900">{student.Name}</h3>
            <p className="text-gray-600">{student.RollNo}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-gray-500">{student.Age} years</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{student.Sex}</span>
              <span className="text-gray-300">•</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                student.RiskLevel === 'High' ? 'bg-red-100 text-red-800' :
                student.RiskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {student.RiskLevel} Risk
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{student.RiskScore?.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Risk Score</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Attendance</span>
            <span className={`text-xs px-2 py-1 rounded-full ${attendanceStatus.bg} ${attendanceStatus.color}`}>
              {attendanceStatus.text}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{student.Attendance}%</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
              style={{ width: `${student.Attendance}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Marks Average</span>
            <span className={`text-xs px-2 py-1 rounded-full ${marksStatus.bg} ${marksStatus.color}`}>
              {marksStatus.text}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{student.MarksAverage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${student.MarksAverage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-2">
            <span className="text-gray-600 text-sm">Assignments</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            <span className={`${assignmentStatus.color}`}>
              {student.AssignmentSubmission}
            </span>
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${assignmentStatus.bg} ${assignmentStatus.color}`}>
            Submission Status
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-2">
            <span className="text-gray-600 text-sm">Health Status</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {student.HealthIssues === 'None' ? 'Good' : '⚠️'}
          </div>
          <div className="text-xs text-gray-600">
            {student.HealthIssues === 'None' ? 'No Issues' : student.HealthIssues}
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      {expanded && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-semibold text-gray-900 mb-4">Student Details</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium">{student.Address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Family Size</p>
              <p className="font-medium">{student.FamilySize}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Parents Occupation</p>
              <p className="font-medium">{student.ParentsOccupation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Travel Time</p>
              <p className="font-medium">{student.TravelTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Scholar Type</p>
              <p className="font-medium">{student.ScholarType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Study Time</p>
              <p className="font-medium">{student.StudyTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Scholarship</p>
              <p className={`font-medium ${student.Scholarship === 'Yes' ? 'text-green-600' : 'text-red-600'}`}>
                {student.Scholarship}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Extracurricular</p>
              <p className="font-medium">{student.ExtraCurricularActivities || 'None'}</p>
            </div>
          </div>

          {/* Risk Factors Analysis */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Risk Factors Analysis</h4>
            <div className="space-y-3">
              {student.Attendance < 75 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700">Low Attendance ({student.Attendance}%)</span>
                  <span className="text-red-600 font-bold">+30 pts</span>
                </div>
              )}
              {student.MarksAverage < 60 && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700">Low Marks Average ({student.MarksAverage}%)</span>
                  <span className="text-red-600 font-bold">+25 pts</span>
                </div>
              )}
              {student.AssignmentSubmission === 'Missing' && (
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700">Missing Assignments</span>
                  <span className="text-red-600 font-bold">+15 pts</span>
                </div>
              )}
              {student.HealthIssues !== 'None' && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-700">Health Issues ({student.HealthIssues})</span>
                  <span className="text-yellow-600 font-bold">+10 pts</span>
                </div>
              )}
              {student.Scholarship === 'No' && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-700">No Scholarship</span>
                  <span className="text-yellow-600 font-bold">+10 pts</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
          View Full Profile
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90">
          Take Action
        </button>
      </div>
    </div>
  );
};

export default StudentDetailCard;