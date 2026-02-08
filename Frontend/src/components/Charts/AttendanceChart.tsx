import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Student } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AttendanceChartProps {
  students: Student[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ students }) => {
  const sortedStudents = [...students]
    .sort((a, b) => a.Attendance - b.Attendance)
    .slice(0, 10);

  const data = {
    labels: sortedStudents.map(s => s.Name.split(' ')[0]),
    datasets: [
      {
        label: 'Attendance %',
        data: sortedStudents.map(s => s.Attendance),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Risk Score',
        data: sortedStudents.map(s => s.RiskScore || 0),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Attendance vs Risk Correlation',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AttendanceChart;