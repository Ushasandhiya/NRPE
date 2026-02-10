import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { riskData } from "../data/dashboardData";

export default function RiskChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <PieChart width={300} height={250}>
        <Pie
          data={riskData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
        >
          {riskData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}