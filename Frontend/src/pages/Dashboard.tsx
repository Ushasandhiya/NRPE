import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import StatsCard from "../components/Statscard";
import RiskChart from "../components/RiskChart";
import SubjectChart from "../components/SubjectChart";
import TopCard from "../components/TopCard";
import StudentCard from "../components/StudentCard";
import AverageScore from "../components/AverageScore";
import { stats } from "../data/dashboardData";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 space-y-6">

        <Filters />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatsCard title="Student Count" value={stats.totalStudents} />
          <StatsCard title="Student Attendance" value={`${stats.attendance}%`} />
          <StatsCard title="Exam Average" value={`${stats.examAverage}%`} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <RiskChart />
          <SubjectChart />
        </div>

        {/* Top Students */}
        <div className="grid grid-cols-2 gap-4">
          <TopCard title="Best in Marks" name="Aarav Kumar" score="89%" />
          <TopCard title="Best in Attendance" name="Priya Sharma" score="95%" />
        </div>

        {/* Student Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Student Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <StudentCard name="Rahul" marks="78%" attendance="82%" />
            <StudentCard name="Ananya" marks="85%" attendance="91%" />
            <StudentCard name="Vikram" marks="72%" attendance="75%" />
          </div>
        </div>

        {/* Average Score */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Average Score</h2>
          <div className="grid grid-cols-3 gap-4">
            <AverageScore subject="English" value="81" />
            <AverageScore subject="Maths" value="88" />
            <AverageScore subject="Science" value="76" />
          </div>
        </div>

      </div>
    </div>
  );
}