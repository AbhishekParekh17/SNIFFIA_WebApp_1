import React from 'react';

interface CircularGaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  size?: 'small' | 'large';
  className?: string;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({ 
  value, 
  max, 
  label, 
  unit, 
  size = 'large',
  className = '' 
}) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * (size === 'large' ? 45 : 35);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getColor = (percentage: number) => {
    if (percentage <= 33) return '#10B981'; // green
    if (percentage <= 66) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  const getQualityLevel = (percentage: number) => {
    if (percentage <= 33) return 'EXCELLENT';
    if (percentage <= 50) return 'GOOD';
    if (percentage <= 66) return 'MODERATE';
    return 'POOR';
  };

  const radius = size === 'large' ? 45 : 35;
  const center = size === 'large' ? 50 : 40;
  const strokeWidth = size === 'large' ? 6 : 4;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg width={center * 2} height={center * 2} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={getColor(percentage)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold text-gray-900 ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>
            {value.toFixed(1)}
          </span>
          <span className={`text-gray-600 ${size === 'large' ? 'text-sm' : 'text-xs'}`}>
            {unit}
          </span>
        </div>
      </div>
      <div className="text-center mt-2">
        <div className={`font-semibold ${size === 'large' ? 'text-lg' : 'text-sm'}`} style={{ color: getColor(percentage) }}>
          {getQualityLevel(percentage)}
        </div>
        <div className={`text-gray-600 ${size === 'large' ? 'text-sm' : 'text-xs'}`}>
          {label}
        </div>
      </div>
    </div>
  );
};

export default CircularGauge;