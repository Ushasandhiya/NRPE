import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import { studentsData } from './data/students';
import { calculateDashboardStats } from './data/calculateRisk';
import { Student, DashboardStats } from './types';
import './App.css';

function App() {
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<{
    studentsWithRisk: Student[];
    stats: DashboardStats;
  } | null>(null);

  // Calculate dashboard data on mount
  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      const data = calculateDashboardStats(studentsData);
      setDashboardData(data);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter students based on selection
  const getFilteredStudents = () => {
    if (!dashboardData) return [];
    
    if (selectedGrade === 'All') {
      return dashboardData.studentsWithRisk;
    }

    // Mock grade filtering - in real app, you'd have grade data
    return dashboardData.studentsWithRisk.filter(student => {
      // Simple mock: every 10th student is in different grade
      const studentIndex = studentsData.findIndex(s => s.RollNo === student.RollNo);
      const gradeNumber = (studentIndex % 5) + 1;
      return `Grade ${gradeNumber}` === selectedGrade;
    });
  };

  if (isLoading || !dashboardData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600">Analyzing student data for risk prediction...</p>
        </div>
      </div>
    );
  }

  const filteredStudents = getFilteredStudents();
  const filteredStats = selectedGrade === 'All' 
    ? dashboardData.stats 
    : {
        ...dashboardData.stats,
        totalStudents: filteredStudents.length,
        maleCount: filteredStudents.filter(s => s.Sex === "Male").length,
        femaleCount: filteredStudents.filter(s => s.Sex === "Female").length,
      };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedGrade={selectedGrade}
          selectedYear={selectedYear}
          onGradeChange={setSelectedGrade}
          onYearChange={setSelectedYear}
          stats={dashboardData.stats}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Student Dropout Risk Dashboard
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Monitoring {filteredStats.totalStudents} students • Academic Year {selectedYear} • 
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {selectedGrade}
                    </span>
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-700">Live Data Updated</span>
                </div>
              </div>
            </div>

            <Dashboard 
              stats={filteredStats}
              students={filteredStudents}
              selectedGrade={selectedGrade}
              selectedYear={selectedYear}
            />

            {/* System Status Bar */}
            <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">System Status: Active</p>
                    <p className="text-sm text-gray-600">Predicting risks in real-time</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-0">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Low Risk: {filteredStats.lowRiskCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">Medium Risk: {filteredStats.mediumRiskCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">High Risk: {filteredStats.highRiskCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;