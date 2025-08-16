import React from 'react';
import { Home, Droplets, AlertCircle, Wind, LogOut } from 'lucide-react';
import CircularGauge from '../components/CircularGauge';
import CompoundCard from '../components/CompoundCard';
import SafetyAlert from '../components/SafetyAlert';
import { vocCompounds, getOverallVOCLevel } from '../data/vocData';

interface DashboardProps {
  onNavigateToCompound: (compound: string) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToCompound, onLogout }) => {
  const overallLevel = getOverallVOCLevel();

  const getCompoundIcon = (compound: string) => {
    const icons: { [key: string]: React.ElementType } = {
      'Methane': Droplets,
      'Formaldehyde': AlertCircle,
      'Benzene': Wind,
      'Toluene': Home
    };
    return icons[compound] || Wind;
  };

  const getSafetyMessage = (status: string, level: number) => {
    switch (status) {
      case 'safe':
        return {
          message: 'Air quality is excellent. All VOC levels are within safe ranges.',
          recommendation: 'Continue regular monitoring and maintain good ventilation.'
        };
      case 'moderate':
        return {
          message: `Air quality is moderate with VOC index at ${level}%. Some compounds may be elevated.`,
          recommendation: 'Increase ventilation and identify potential sources of elevated compounds.'
        };
      case 'danger':
        return {
          message: `Air quality is poor with VOC index at ${level}%. Immediate attention required.`,
          recommendation: 'Evacuate if necessary and address all sources of elevated compounds immediately.'
        };
      default:
        return {
          message: 'Monitoring air quality...',
          recommendation: 'Please wait while we analyze current conditions.'
        };
    }
  };

  const safetyInfo = getSafetyMessage(overallLevel.status, overallLevel.level);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <img 
                src="https://aizenberglab.seas.harvard.edu/sites/g/files/omnuum6296/files/styles/hwp_1_1__1440x1440_scale/public/2025-01/tshirt_FRONT_bird.png?itok=6zcQSI6v" 
                alt="Aizenberg Lab Logo" 
                className="h-8 w-8 object-contain bg-white/10 rounded-lg p-1"
              />
              <h1 className="text-2xl font-bold">VOC Monitor</h1>
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
          <p className="text-blue-100">Aizenberg Lab - Indoor Air Quality Tracking</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        {/* Overall Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 -mt-4 relative z-10">
          <div className="text-center mb-6">
            <CircularGauge
              value={overallLevel.level}
              max={100}
              label="Overall VOC Index"
              unit="%"
              size="large"
            />
          </div>
          
          <SafetyAlert
            level={overallLevel.status}
            message={safetyInfo.message}
            recommendation={safetyInfo.recommendation}
          />
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Individual Compound Gauges */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">Individual Compounds</h2>
          <div className="grid grid-cols-2 gap-4">
            {vocCompounds.map((compound) => (
              <div 
                key={compound.compound}
                onClick={() => onNavigateToCompound(compound.compound)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <CircularGauge
                  value={compound.value}
                  max={compound.threshold.danger}
                  label={compound.compound}
                  unit={compound.unit}
                  size="small"
                />
                <div className="mt-2 text-center">
                  <div className="text-xs text-gray-500">{compound.formula}</div>
                  <div className={`text-xs font-medium mt-1 ${
                    compound.status === 'safe' ? 'text-green-600' :
                    compound.status === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {compound.status.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600">
              {vocCompounds.filter(c => c.status === 'safe').length}
            </div>
            <div className="text-sm text-gray-600">Compounds Safe</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {vocCompounds.filter(c => c.status === 'moderate').length}
            </div>
            <div className="text-sm text-gray-600">Need Attention</div>
          </div>
        </div>

        {/* Compound Cards */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Monitored Compounds</h2>
          {vocCompounds.map((compound) => (
            <CompoundCard
              key={compound.compound}
              name={compound.compound}
              formula={compound.formula}
              value={compound.value}
              unit={compound.unit}
              status={compound.status}
              trend={compound.trend}
              onClick={() => onNavigateToCompound(compound.compound)}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">About VOC Monitoring</h3>
          <p className="text-sm text-blue-800">
            Volatile Organic Compounds (VOCs) are chemicals that can easily become vapors or gases. 
            Many VOCs are human-made and used in paints, adhesives, and cleaning products. 
            Monitoring helps maintain healthy indoor air quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;