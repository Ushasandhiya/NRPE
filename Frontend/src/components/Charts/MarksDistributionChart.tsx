import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Student } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MarksDistributionChartProps {
  students: Student[];
}

const MarksDistributionChart: React.FC<MarksDistributionChartProps> = ({ students }) => {
  // Define marks ranges
  const marksRanges = [
    { range: '0-40%', min: 0, max: 40, color: 'rgba(239, 68, 68, 0.8)' },
    { range: '41-50%', min: 41, max: 50, color: 'rgba(245, 158, 11, 0.8)' },
    { range: '51-60%', min: 51, max: 60, color: 'rgba(234, 179, 8, 0.8)' },
    { range: '61-70%', min: 61, max: 70, color: 'rgba(34, 197, 94, 0.8)' },
    { range: '71-80%', min: 71, max: 80, color: 'rgba(59, 130, 246, 0.8)' },
    { range: '81-90%', min: 81, max: 90, color: 'rgba(139, 92, 246, 0.8)' },
    { range: '91-100%', min: 91, max: 100, color: 'rgba(16, 185, 129, 0.8)' },
  ];

  // Count students in each range
  const counts = marksRanges.map(range => 
    students.filter(s => s.MarksAverage >= range.min && s.MarksAverage <= range.max).length
  );

  // Calculate percentages
  const percentages = counts.map(count => 
    Math.round((count / students.length) * 100)
  );

  const data = {
    labels: marksRanges.map(r => r.range),
    datasets: [
      {
        label: 'Number of Students',
        data: counts,
        backgroundColor: marksRanges.map(r => r.color),
        borderColor: marksRanges.map(r => r.color.replace('0.8', '1')),
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Percentage',
        data: percentages,
        type: 'line' as const,
        borderColor: 'rgba(0, 0, 0, 0.7)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(0, 0, 0, 0.7)',
        yAxisID: 'y1',
      }
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            if (context.datasetIndex === 0) {
              return `${label}: ${value} students`;
            } else {
              return `${label}: ${value}%`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Marks Range',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Students',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          stepSize: 1
        }
      },
      y1: {
        position: 'right' as const,
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Percentage (%)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MarksDistributionChart;