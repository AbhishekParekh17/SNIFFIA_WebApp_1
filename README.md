# VOC Tracking Device Interface

A modern, responsive web application for monitoring Volatile Organic Compounds (VOCs) in indoor environments. This application provides real-time tracking and analysis of air quality with a focus on four key volatile compounds.

## Features

### 🔐 Authentication
- Secure login system with user credentials
- Session-based authentication
- Logout functionality

### 📊 Dashboard Overview
- Overall VOC quality index with color-coded safety levels
- Individual gauges for 4 key compounds (Methane, Formaldehyde, Benzene, Toluene)
- Real-time safety status indicators
- Quick statistics and compound status overview

### 🔍 Detailed Compound Analysis
- Individual pages for each volatile compound
- 12-hour historical trend charts
- Safety threshold indicators
- Health effects and risk information
- Common sources identification
- Real-time recommendations

### 📱 Mobile-First Design
- Responsive design optimized for mobile devices
- Touch-friendly interface
- Smooth animations and micro-interactions
- Professional color system with safety-based gradients

## Monitored Compounds

1. **Methane (CH₄)** - Natural gas component
2. **Formaldehyde (HCHO)** - Building materials emission
3. **Benzene (C₆H₆)** - Gasoline vapor component
4. **Toluene (C₇H₈)** - Paint and adhesive solvent

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Static hosting ready

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd voc-tracking-device
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Login Credentials
- **User ID**: Haritosh
- **Password**: Abhishek

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CircularGauge.tsx    # Circular progress indicators
│   ├── CompoundCard.tsx     # Compound summary cards
│   ├── LoginForm.tsx        # Authentication form
│   ├── SafetyAlert.tsx      # Safety status alerts
│   └── TrendChart.tsx       # Historical data charts
├── data/               # Data management
│   └── vocData.ts          # VOC compound data and utilities
├── pages/              # Main application pages
│   ├── Dashboard.tsx       # Main overview page
│   └── CompoundDetail.tsx  # Individual compound analysis
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Safety Levels

The application uses a three-tier safety classification system:

- 🟢 **Safe**: Levels within normal ranges
- 🟡 **Moderate**: Elevated levels requiring attention
- 🔴 **Danger**: High levels requiring immediate action

## Data Simulation

The application currently uses simulated data for demonstration purposes. In a production environment, this would be replaced with real sensor data from VOC monitoring hardware.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by professional air quality monitoring applications
- Built with modern web technologies for optimal performance
- Designed with user experience and accessibility in mind