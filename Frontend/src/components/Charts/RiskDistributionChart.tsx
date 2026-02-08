import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Student } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RiskDistributionChartProps {
  students: Student[];
}

const RiskDistributionChart: React.FC<RiskDistributionChartProps> = ({ students }) => {
  const riskCounts = {
    Low: students.filter(s => s.RiskLevel === 'Low').length,
    Medium: students.filter(s => s.RiskLevel === 'Medium').length,
    High: students.filter(s => s.RiskLevel === 'High').length,
  };

  const data = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: [riskCounts.Low, riskCounts.Medium, riskCounts.High],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default RiskDistributionChart;