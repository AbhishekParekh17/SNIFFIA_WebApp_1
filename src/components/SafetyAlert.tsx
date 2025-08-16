import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface SafetyAlertProps {
  level: 'safe' | 'moderate' | 'danger';
  message: string;
  recommendation?: string;
}

const SafetyAlert: React.FC<SafetyAlertProps> = ({ level, message, recommendation }) => {
  const getAlertStyles = (level: string) => {
    switch (level) {
      case 'safe':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'moderate':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: Info,
          iconColor: 'text-yellow-600'
        };
      case 'danger':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: Info,
          iconColor: 'text-gray-600'
        };
    }
  };

  const styles = getAlertStyles(level);
  const Icon = styles.icon;

  return (
    <div className={`${styles.bg} ${styles.border} ${styles.text} border rounded-xl p-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {recommendation && (
            <p className="text-sm mt-1 opacity-80">{recommendation}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafetyAlert;