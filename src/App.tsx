import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SimulationProvider } from './SimulationContext';
import LandingPage from './pages/LandingPage';
import PersonalizationPage from './pages/PersonalizationPage';
import RegistrationPage from './pages/RegistrationPage';
import ReferralPage from './pages/ReferralPage';
import DashboardPage from './pages/DashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-xl text-blue-600">AI Workshop Growth Engine</Link>
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
              NxtWave Growth Challenge
            </span>
          </div>
          <div className="flex gap-4 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/admin" className="hover:text-blue-600">Admin</Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/personalize" element={<PersonalizationPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/referral" element={<ReferralPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SimulationProvider>
  );
}

export default App;
