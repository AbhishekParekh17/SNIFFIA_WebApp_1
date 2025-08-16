import React from 'react';

interface DataPoint {
  time: string;
  value: number;
}

interface TrendChartProps {
  data: DataPoint[];
  title: string;
  color: string;
  unit: string;
}

const TrendChart: React.FC<TrendChartProps> = ({ data, title, color, unit }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const getY = (value: number) => {
    return 80 - ((value - minValue) / range) * 60;
  };

  const pathData = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 280;
    const y = getY(point.value);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <svg width="100%" height="100" viewBox="0 0 280 100" className="overflow-visible">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="280" height="80" fill="url(#grid)" />
          
          {/* Gradient fill */}
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <path
            d={`${pathData} L 280 80 L 0 80 Z`}
            fill={`url(#gradient-${title})`}
          />
          
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 280}
              cy={getY(point.value)}
              r="3"
              fill={color}
              className="hover:r-4 transition-all duration-200"
            />
          ))}
        </svg>
        
        {/* Time labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.filter((_, index) => index % 2 === 0).map((point, index) => (
            <span key={index}>{point.time}</span>
          ))}
        </div>
      </div>
      
      {/* Current value */}
      <div className="mt-4 text-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {data[data.length - 1]?.value.toFixed(1)}
        </span>
        <span className="text-sm text-gray-600 ml-1">{unit}</span>
      </div>
    </div>
  );
};

export default TrendChart;