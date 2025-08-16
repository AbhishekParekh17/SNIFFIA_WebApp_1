import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import CompoundDetail from './pages/CompoundDetail';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'compound'>('dashboard');
  const [selectedCompound, setSelectedCompound] = useState<string | null>(null);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setSelectedCompound(null);
  };

  const handleNavigateToCompound = (compound: string) => {
    setSelectedCompound(compound);
    setCurrentView('compound');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCompound(null);
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'dashboard' ? (
        <Dashboard onNavigateToCompound={handleNavigateToCompound} onLogout={handleLogout} />
      ) : (
        <CompoundDetail 
          compound={selectedCompound!} 
          onBack={handleBackToDashboard} 
        />
      )}
    </div>
  );
}

export default App;