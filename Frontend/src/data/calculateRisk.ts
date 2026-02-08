import { Student, DashboardStats } from '../types';

export const calculateRiskScore = (student: Student): number => {
  let score = 0;
  
  // Attendance factor (30% weight)
  if (student.Attendance < 60) score += 30;
  else if (student.Attendance < 75) score += 20;
  else if (student.Attendance < 85) score += 10;
  
  // Marks factor (25% weight)
  if (student.MarksAverage < 50) score += 25;
  else if (student.MarksAverage < 60) score += 20;
  else if (student.MarksAverage < 70) score += 15;
  else if (student.MarksAverage < 80) score += 10;
  
  // Assignment submission (15% weight)
  if (student.AssignmentSubmission === "Missing") score += 15;
  else if (student.AssignmentSubmission === "Late") score += 10;
  
  // Health issues (10% weight)
  if (student.HealthIssues !== "None") score += 10;
  
  // Scholarship status (10% weight)
  if (student.Scholarship === "No") score += 10;
  
  // Address factor (5% weight) - Rural students have higher risk
  if (student.Address === "Rural") score += 5;
  
  // Study time (5% weight)
  if (student.StudyTime === "Low") score += 5;
  
  return Math.min(100, score);
};

export const getRiskLevel = (score: number): 'Low' | 'Medium' | 'High' => {
  if (score < 30) return 'Low';
  if (score < 60) return 'Medium';
  return 'High';
};

export const calculateDashboardStats = (students: Student[]) => {
  const totalStudents = students.length;
  const averageAttendance = students.reduce((sum, s) => sum + s.Attendance, 0) / totalStudents;
  const averageMarks = students.reduce((sum, s) => sum + s.MarksAverage, 0) / totalStudents;
  const maleCount = students.filter(s => s.Sex === "Male").length;
  const femaleCount = students.filter(s => s.Sex === "Female").length;
  const scholarshipRate = (students.filter(s => s.Scholarship === "Yes").length / totalStudents) * 100;
  
  // Calculate risk scores for all students
  const studentsWithRisk = students.map(s => ({
    ...s,
    RiskScore: calculateRiskScore(s),
    RiskLevel: getRiskLevel(calculateRiskScore(s))
  }));
  
  const highRiskCount = studentsWithRisk.filter(s => s.RiskLevel === 'High').length;
  const mediumRiskCount = studentsWithRisk.filter(s => s.RiskLevel === 'Medium').length;
  const lowRiskCount = studentsWithRisk.filter(s => s.RiskLevel === 'Low').length;
  
  const dropoutRiskRate = (highRiskCount / totalStudents) * 100;
  
  const stats: DashboardStats = {
    totalStudents,
    averageAttendance,
    averageMarks,
    dropoutRiskRate,
    maleCount,
    femaleCount,
    scholarshipRate,
    highRiskCount,
    mediumRiskCount,
    lowRiskCount
  };
  
  return { studentsWithRisk, stats };
};