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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Subject {
  name: string;
  average: number;
}

interface SubjectPerformanceChartProps {
  subjects: Subject[];
}

const SubjectPerformanceChart: React.FC<SubjectPerformanceChartProps> = ({ subjects }) => {
  // Sort subjects by average score
  const sortedSubjects = [...subjects].sort((a, b) => b.average - a.average);
  
  // Color scheme based on performance
  const getColorForScore = (score: number) => {
    if (score >= 90) return 'rgba(34, 197, 94, 0.8)';      // Green - Excellent
    if (score >= 80) return 'rgba(59, 130, 246, 0.8)';    // Blue - Very Good
    if (score >= 70) return 'rgba(234, 179, 8, 0.8)';     // Yellow - Good
    if (score >= 60) return 'rgba(245, 158, 11, 0.8)';    // Orange - Average
    return 'rgba(239, 68, 68, 0.8)';                     // Red - Needs Improvement
  };

  const data = {
    labels: sortedSubjects.map(s => s.name),
    datasets: [
      {
        label: 'Average Score (%)',
        data: sortedSubjects.map(s => s.average),
        backgroundColor: sortedSubjects.map(s => getColorForScore(s.average)),
        borderColor: sortedSubjects.map(s => getColorForScore(s.average).replace('0.8', '1')),
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.7,
      },
      {
        label: 'Passing Line (60%)',
        data: Array(sortedSubjects.length).fill(60),
        type: 'line' as const,
        borderColor: 'rgba(107, 114, 128, 0.7)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
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
          filter: function(item) {
            return !item.text.includes('Passing Line') || item.datasetIndex === 1;
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            if (context.datasetIndex === 0) {
              const performance = 
                value >= 90 ? 'Excellent' :
                value >= 80 ? 'Very Good' :
                value >= 70 ? 'Good' :
                value >= 60 ? 'Average' : 'Needs Improvement';
              return [`${label}: ${value.toFixed(1)}%`, `Performance: ${performance}`];
            }
            return `${label}: ${value}%`;
          },
          afterLabel: function(context) {
            if (context.datasetIndex === 0) {
              const value = context.raw as number;
              if (value < 60) {
                return '⚠️ Below passing mark';
              } else if (value >= 90) {
                return '🌟 Excellent performance!';
              }
            }
            return '';
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Subjects',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: { top: 10 }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          stepSize: 20
        },
        title: {
          display: true,
          text: 'Average Score (%)',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: { bottom: 10 }
        },
        grid: {
          color: function(context) {
            if (context.tick.value === 60) {
              return 'rgba(107, 114, 128, 0.3)';
            }
            return 'rgba(0, 0, 0, 0.1)';
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  // Calculate overall average
  const overallAverage = subjects.reduce((sum, s) => sum + s.average, 0) / subjects.length;

  return (
    <div className="w-full h-full">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">Overall Average: </span>
            <span className={`text-lg font-bold ${
              overallAverage >= 80 ? 'text-green-600' :
              overallAverage >= 70 ? 'text-blue-600' :
              overallAverage >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {overallAverage.toFixed(1)}%
            </span>
          </div>
          <div className="flex space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
              <span className="text-xs text-gray-600">≥90%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
              <span className="text-xs text-gray-600">80-89%</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
              <span className="text-xs text-gray-600">60-79%</span>
            </div>
          </div>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SubjectPerformanceChart;