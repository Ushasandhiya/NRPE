import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { subjectData } from "../data/dashboardData";

export default function SubjectChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <BarChart width={500} height={300} data={subjectData}>
        <XAxis dataKey="subject" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pass" fill="#4f46e5" />
        <Bar dataKey="average" fill="#0ea5e9" />
        <Bar dataKey="fail" fill="#f59e0b" />
      </BarChart>
    </div>
  );
}