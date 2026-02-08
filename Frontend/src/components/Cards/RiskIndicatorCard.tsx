import React from 'react';
import { Student } from '../../types';

interface RiskIndicatorCardProps {
  student: Student;
  rank?: number;
  onClick?: () => void;
}

const RiskIndicatorCard: React.FC<RiskIndicatorCardProps> = ({ student, rank, onClick }) => {
  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'High':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-800',
          dot: 'bg-red-500',
          gradient: 'from-red-500 to-red-600'
        };
      case 'Medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-800',
          dot: 'bg-yellow-500',
          gradient: 'from-yellow-500 to-yellow-600'
        };
      case 'Low':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-700',
          badge: 'bg-green-100 text-green-800',
          dot: 'bg-green-500',
          gradient: 'from-green-500 to-green-600'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-800',
          dot: 'bg-gray-500',
          gradient: 'from-gray-500 to-gray-600'
        };
    }
  };

  const getRiskFactors = () => {
    const factors = [];
    if (student.Attendance < 75) factors.push('Low Attendance');
    if (student.MarksAverage < 60) factors.push('Low Marks');
    if (student.AssignmentSubmission === 'Missing') factors.push('Missing Assignments');
    if (student.AssignmentSubmission === 'Late') factors.push('Late Submissions');
    if (student.HealthIssues !== 'None') factors.push('Health Issues');
    if (student.Scholarship === 'No') factors.push('No Scholarship');
    return factors;
  };

  const riskColor = getRiskColor(student.RiskLevel);
  const riskFactors = getRiskFactors();

  return (
    <div 
      className={`${riskColor.bg} ${riskColor.border} border rounded-xl p-4 transition-all duration-200 hover:shadow-md cursor-pointer ${onClick ? 'hover:scale-[1.02]' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {rank && (
            <div className={`bg-gradient-to-r ${riskColor.gradient} text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}>
              #{rank}
            </div>
          )}
          
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {student.Name.charAt(0)}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${riskColor.dot} rounded-full border-2 border-white`}></div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900">{student.Name}</h4>
            <p className="text-xs text-gray-600">{student.RollNo} • {student.Age}yrs</p>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${riskColor.badge}`}>
          {student.RiskLevel || 'Unknown'} Risk
        </span>
      </div>
      
      {/* Risk Score */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Risk Score</span>
          <span className={`font-bold ${riskColor.text}`}>{student.RiskScore?.toFixed(1) || 'N/A'}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${riskColor.gradient}`}
            style={{ width: `${student.RiskScore || 0}%` }}
          ></div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-white rounded-lg">
          <p className="text-xs text-gray-500">Attendance</p>
          <p className={`text-sm font-bold ${student.Attendance < 75 ? 'text-red-600' : 'text-green-600'}`}>
            {student.Attendance}%
          </p>
        </div>
        <div className="text-center p-2 bg-white rounded-lg">
          <p className="text-xs text-gray-500">Marks Avg</p>
          <p className={`text-sm font-bold ${student.MarksAverage < 60 ? 'text-red-600' : 'text-green-600'}`}>
            {student.MarksAverage}%
          </p>
        </div>
      </div>
      
      {/* Risk Factors */}
      {riskFactors.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Risk Factors:</p>
          <div className="flex flex-wrap gap-1">
            {riskFactors.slice(0, 3).map((factor, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700"
              >
                {factor}
              </span>
            ))}
            {riskFactors.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                +{riskFactors.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Action Button */}
      {onClick && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <button className="w-full text-sm font-medium text-blue-600 hover:text-blue-700">
            View Details →
          </button>
        </div>
      )}
    </div>
  );
};

export default RiskIndicatorCard;