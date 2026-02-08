export interface Student {
  Name: string;
  RollNo: string;
  Sex: string;
  Age: number;
  Address: string;
  PhoneNumber: string;
  FamilySize: string;
  ParentsOccupation: string;
  TravelTime: string;
  ScholarType: string;
  StudyTime: string;
  Attendance: number;
  AssignmentSubmission: string;
  MarksAverage: number;
  Scholarship: string;
  HealthIssues: string;
  ExtraCurricularActivities: string;
  RiskScore?: number;
  RiskLevel?: 'Low' | 'Medium' | 'High';
}

export interface DashboardStats {
  totalStudents: number;
  averageAttendance: number;
  averageMarks: number;
  dropoutRiskRate: number;
  maleCount: number;
  femaleCount: number;
  scholarshipRate: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
}