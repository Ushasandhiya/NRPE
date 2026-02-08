import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
  description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendType = 'neutral',
  color = 'blue',
  description
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      text: 'text-blue-700',
      borderLeft: 'border-l-blue-500'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      text: 'text-green-700',
      borderLeft: 'border-l-green-500'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      text: 'text-red-700',
      borderLeft: 'border-l-red-500'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      text: 'text-purple-700',
      borderLeft: 'border-l-purple-500'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      text: 'text-yellow-700',
      borderLeft: 'border-l-yellow-500'
    }
  };

  const trendColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`${currentColor.bg} ${currentColor.border} border rounded-xl p-5 shadow-sm ${currentColor.borderLeft} border-l-4`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${trendColors[trendType]}`}>
                {trendType === 'positive' ? '↗' : trendType === 'negative' ? '↘' : '→'} {trend}
              </span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          )}
        </div>
        
        <div className={`${currentColor.iconBg} p-3 rounded-lg`}>
          <div className={`${currentColor.iconColor} text-xl`}>
            {icon}
          </div>
        </div>
      </div>
      
      {/* Progress bar (optional) */}
      {color === 'red' && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Risk Level</span>
            <span>High</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      )}
      
      {color === 'green' && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Improvement</span>
            <span>+12%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard;