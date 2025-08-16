import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertCircle, Info } from 'lucide-react';
import CircularGauge from '../components/CircularGauge';
import TrendChart from '../components/TrendChart';
import SafetyAlert from '../components/SafetyAlert';
import { vocCompounds, getHistoricalData } from '../data/vocData';

interface CompoundDetailProps {
  compound: string;
  onBack: () => void;
}

const CompoundDetail: React.FC<CompoundDetailProps> = ({ compound, onBack }) => {
  const compoundData = vocCompounds.find(v => v.compound === compound);
  const historicalData = getHistoricalData(compound);

  if (!compoundData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Compound not found</p>
      </div>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-5 w-5 text-red-500" />;
      case 'down': return <TrendingDown className="h-5 w-5 text-green-500" />;
      case 'stable': return <Minus className="h-5 w-5 text-gray-500" />;
      default: return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getGaugeColor = (status: string) => {
    switch (status) {
      case 'safe': return '#10B981';
      case 'moderate': return '#F59E0B';
      case 'danger': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getThresholdInfo = () => {
    const { threshold } = compoundData;
    return [
      { label: 'Safe', value: `< ${threshold.safe}`, color: 'text-green-600' },
      { label: 'Moderate', value: `${threshold.safe} - ${threshold.moderate}`, color: 'text-yellow-600' },
      { label: 'Danger', value: `> ${threshold.moderate}`, color: 'text-red-600' }
    ];
  };

  const getSafetyRecommendation = (status: string, value: number, threshold: any) => {
    switch (status) {
      case 'safe':
        return {
          message: `${compound} levels are within safe limits at ${value} ${compoundData.unit}.`,
          recommendation: 'Continue normal monitoring. Maintain good ventilation practices.'
        };
      case 'moderate':
        return {
          message: `${compound} levels are elevated at ${value} ${compoundData.unit}.`,
          recommendation: 'Increase ventilation and investigate potential sources. Monitor more frequently.'
        };
      case 'danger':
        return {
          message: `${compound} levels are dangerously high at ${value} ${compoundData.unit}.`,
          recommendation: 'Take immediate action to reduce exposure. Consider evacuation if levels continue to rise.'
        };
      default:
        return {
          message: 'Monitoring in progress...',
          recommendation: 'Please wait for analysis to complete.'
        };
    }
  };

  const safetyInfo = getSafetyRecommendation(compoundData.status, compoundData.value, compoundData.threshold);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold">{compoundData.compound}</h1>
              <p className="text-blue-100">{compoundData.formula}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        {/* Current Reading */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 -mt-2 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Current Reading</h2>
            <div className="flex items-center gap-2">
              {getTrendIcon(compoundData.trend)}
              <span className="text-sm text-gray-600 capitalize">{compoundData.trend}</span>
            </div>
          </div>
          
          <div className="flex justify-center mb-4">
            <CircularGauge
              value={compoundData.value}
              max={compoundData.threshold.danger}
              label={compoundData.compound}
              unit={compoundData.unit}
              size="large"
            />
          </div>

          <SafetyAlert
            level={compoundData.status}
            message={safetyInfo.message}
            recommendation={safetyInfo.recommendation}
          />
        </div>

        {/* Historical Trend */}
        <div className="mt-6">
          <TrendChart
            data={historicalData}
            title="12-Hour Trend"
            color={getGaugeColor(compoundData.status)}
            unit={compoundData.unit}
          />
        </div>

        {/* Threshold Levels */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Safety Thresholds
          </h3>
          <div className="space-y-3">
            {getThresholdInfo().map((threshold, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`font-medium ${threshold.color}`}>{threshold.label}</span>
                <span className="text-gray-600">{threshold.value} {compoundData.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health Effects */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Health Effects
          </h3>
          <ul className="space-y-2">
            {compoundData.healthEffects.map((effect, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                {effect}
              </li>
            ))}
          </ul>
        </div>

        {/* Common Sources */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Common Sources</h3>
          <div className="grid grid-cols-2 gap-3">
            {compoundData.sources.map((source, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                {source}
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>About {compoundData.compound}:</strong> {compoundData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompoundDetail;