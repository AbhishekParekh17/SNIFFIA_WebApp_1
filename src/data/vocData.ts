// Simulated VOC data
export interface VOCReading {
  compound: string;
  formula: string;
  value: number;
  unit: string;
  status: 'safe' | 'moderate' | 'danger';
  trend: 'up' | 'down' | 'stable';
  threshold: {
    safe: number;
    moderate: number;
    danger: number;
  };
  description: string;
  healthEffects: string[];
  sources: string[];
}

export interface HistoricalData {
  time: string;
  value: number;
}

// Generate realistic historical data
const generateHistoricalData = (baseValue: number, hours: number = 12): HistoricalData[] => {
  const data: HistoricalData[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
    const value = Math.max(0, baseValue + (baseValue * variation));
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: parseFloat(value.toFixed(2))
    });
  }
  
  return data;
};

export const vocCompounds: VOCReading[] = [
  {
    compound: 'Methane',
    formula: 'CH₄',
    value: 2.3,
    unit: 'ppm',
    status: 'safe',
    trend: 'stable',
    threshold: { safe: 5, moderate: 25, danger: 50 },
    description: 'A colorless, odorless gas that is the main component of natural gas.',
    healthEffects: [
      'Generally not toxic at low concentrations',
      'High concentrations can displace oxygen',
      'May cause dizziness and drowsiness'
    ],
    sources: ['Natural gas leaks', 'Decomposing organic matter', 'Landfills', 'Agriculture']
  },
  {
    compound: 'Formaldehyde',
    formula: 'HCHO',
    value: 0.08,
    unit: 'ppm',
    status: 'moderate',
    trend: 'up',
    threshold: { safe: 0.05, moderate: 0.1, danger: 0.3 },
    description: 'A colorless gas with a strong, suffocating odor used in building materials.',
    healthEffects: [
      'Eye, nose, and throat irritation',
      'Respiratory issues',
      'Skin reactions',
      'Potential carcinogen'
    ],
    sources: ['Pressed wood products', 'Insulation materials', 'Adhesives', 'Textiles']
  },
  {
    compound: 'Benzene',
    formula: 'C₆H₆',
    value: 0.015,
    unit: 'ppm',
    status: 'safe',
    trend: 'down',
    threshold: { safe: 0.02, moderate: 0.05, danger: 0.1 },
    description: 'A colorless liquid with a sweet odor, commonly found in gasoline.',
    healthEffects: [
      'Drowsiness and dizziness',
      'Headaches',
      'Blood disorders with long-term exposure',
      'Known carcinogen'
    ],
    sources: ['Vehicle exhaust', 'Gasoline vapors', 'Industrial emissions', 'Tobacco smoke']
  },
  {
    compound: 'Toluene',
    formula: 'C₇H₈',
    value: 0.12,
    unit: 'ppm',
    status: 'safe',
    trend: 'stable',
    threshold: { safe: 0.2, moderate: 1.0, danger: 5.0 },
    description: 'A colorless liquid with a paint thinner-like odor.',
    healthEffects: [
      'Nervous system effects',
      'Fatigue and confusion',
      'Memory loss with high exposure',
      'Respiratory irritation'
    ],
    sources: ['Paints and coatings', 'Adhesives', 'Gasoline', 'Nail polish']
  }
];

export const getHistoricalData = (compound: string): HistoricalData[] => {
  const vocData = vocCompounds.find(v => v.compound === compound);
  if (!vocData) return [];
  
  return generateHistoricalData(vocData.value);
};

export const getOverallVOCLevel = (): { level: number; status: 'safe' | 'moderate' | 'danger' } => {
  const scores = vocCompounds.map(compound => {
    const percentage = (compound.value / compound.threshold.danger) * 100;
    return Math.min(percentage, 100);
  });
  
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  
  let status: 'safe' | 'moderate' | 'danger' = 'safe';
  if (avgScore > 60) status = 'danger';
  else if (avgScore > 30) status = 'moderate';
  
  return { level: Math.round(avgScore), status };
};