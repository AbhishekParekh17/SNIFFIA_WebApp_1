import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CompoundCardProps {
  name: string;
  formula: string;
  value: number;
  unit: string;
  status: 'safe' | 'moderate' | 'danger';
  trend: 'up' | 'down' | 'stable';
  onClick: () => void;
}

const CompoundCard: React.FC<CompoundCardProps> = ({
  name,
  formula,
  value,
  unit,
  status,
  trend,
  onClick
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '→';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <span className="text-sm text-gray-500">({formula})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            <span className="text-sm text-gray-600">{unit}</span>
            <span className="text-lg">{getTrendIcon(trend)}</span>
          </div>
          <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(status)}`}>
            {status.toUpperCase()}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default CompoundCard;