import { Student } from '../types';

export const studentsData: Student[] = [
  // This is a subset, you would import all 50 students from CSV
  {
    Name: "Aarav Kumar",
    RollNo: "CSE1001",
    Sex: "Female",
    Age: 22,
    Address: "Rural",
    PhoneNumber: "9350251922",
    FamilySize: "Small",
    ParentsOccupation: "Private Job",
    TravelTime: "<15 min",
    ScholarType: "Day Scholar",
    StudyTime: "Low",
    Attendance: 68,
    AssignmentSubmission: "Missing",
    MarksAverage: 52,
    Scholarship: "No",
    HealthIssues: "Diabetes",
    ExtraCurricularActivities: "Sports"
  },
  // Add all 50 students here...
];

export const subjects = [
  { name: 'Maths', average: 75.2 },
  { name: 'English', average: 78.5 },
  { name: 'Science', average: 72.3 },
  { name: 'Arts', average: 81.1 },
  { name: 'Exercise', average: 85.6 },
];

export const gradeData = [
  { grade: 'Grade 1', count: 28.9 },
  { grade: 'Grade 2', count: 22.2 },
  { grade: 'Grade 3', count: 28.9 },
  { grade: 'Grade 4', count: 15.3 },
  { grade: 'Grade 5', count: 19.8 },
];