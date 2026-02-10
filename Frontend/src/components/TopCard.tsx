import Navbar from "../components/Navbar";
import StatsCard from "../components/Statscard";
import RiskChart from "../components/RiskChart";
import SubjectChart from "../components/SubjectChart";
import { stats } from "../data/dashboardData";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-6 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard 
            title="Student Count" 
            value={stats.totalStudents} 
          />

          <StatsCard 
            title="Student Attendance" 
            value={`${stats.attendance}%`} 
          />

          <StatsCard 
            title="Exam Average" 
            value={`${stats.examAverage}%`} 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RiskChart />
          <SubjectChart />
        </div>

      </div>
    </div>
  );
}