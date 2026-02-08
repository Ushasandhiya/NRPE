import React from 'react';
import StatsCard from './Cards/StatsCard';
import StudentTable from './StudentTable';
import AttendanceChart from './Charts/AttendanceChart';
import MarksDistributionChart from './Charts/MarksDistributionChart';
import RiskDistributionChart from './Charts/RiskDistributionChart';
import SubjectPerformanceChart from './Charts/SubjectPerformanceChart';
import RiskIndicatorCard from './Cards/RiskIndicatorCard';
import { DashboardStats, Student } from '../types';
import { gradeData, subjects } from '../data/students';

interface DashboardProps {
  stats: DashboardStats;
  students: Student[];
  selectedGrade: string;
  selectedYear: string;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, students, selectedGrade, selectedYear }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Jasper Elite School - Student Performance Dashboard</h1>
        <div className="filters">
          <select value={selectedYear} onChange={(e) => {}} className="filter-select">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <select value={selectedGrade} onChange={(e) => {}} className="filter-select">
            <option value="All">All Grades</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard 
          title="Student Count" 
          value={stats.totalStudents.toString()} 
          icon="👥"
          trend="+5% from last year"
        />
        <StatsCard 
          title="Student Attendance" 
          value={`${stats.averageAttendance.toFixed(1)}%`} 
          icon="📊"
          trend="+2.3%"
          color={stats.averageAttendance > 85 ? 'success' : stats.averageAttendance > 70 ? 'warning' : 'danger'}
        />
        <StatsCard 
          title="Exam Average" 
          value={`${stats.averageMarks.toFixed(1)}%`} 
          icon="🎓"
          trend="+1.7%"
        />
        <StatsCard 
          title="Dropout Risk" 
          value={`${stats.dropoutRiskRate.toFixed(1)}%`} 
          icon="⚠️"
          trend="Monitoring needed"
          color={stats.dropoutRiskRate > 20 ? 'danger' : stats.dropoutRiskRate > 10 ? 'warning' : 'success'}
        />
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Attendance vs Risk Correlation</h3>
          <AttendanceChart students={students} />
        </div>
        
        <div className="chart-container">
          <h3>Risk Level Distribution</h3>
          <RiskDistributionChart students={students} />
        </div>
        
        <div className="chart-container">
          <h3>Marks Distribution</h3>
          <MarksDistributionChart students={students} />
        </div>
        
        <div className="chart-container">
          <h3>Subject Performance</h3>
          <SubjectPerformanceChart subjects={subjects} />
        </div>
      </div>

      <div className="student-details-section">
        <h2>Student Details</h2>
        <div className="gender-stats">
          <div className="gender-stat">
            <span className="gender-label">Male:</span>
            <span className="gender-count">{stats.maleCount}</span>
          </div>
          <div className="gender-stat">
            <span className="gender-label">Female:</span>
            <span className="gender-count">{stats.femaleCount}</span>
          </div>
        </div>
      </div>

      <div className="risk-indicators">
        <h3>Top Risk Students</h3>
        <div className="risk-cards-grid">
          {students
            .filter(s => s.RiskLevel === 'High')
            .slice(0, 3)
            .map((student, index) => (
              <RiskIndicatorCard key={index} student={student} />
            ))}
        </div>
      </div>

      <div className="student-table-section">
        <h3>All Students</h3>
        <StudentTable students={students} />
      </div>
    </div>
  );
};

export default Dashboard;