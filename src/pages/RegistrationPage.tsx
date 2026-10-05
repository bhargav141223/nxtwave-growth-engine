import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSimulation } from '../SimulationContext';
import { ArrowLeft } from 'lucide-react';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { registerUser } = useSimulation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const referralCode = formData.name.substring(0, 4).toUpperCase() + Math.floor(Math.random() * 1000);
    
    registerUser({
      ...formData,
      goal: searchParams.get('goal') || 'Not specified',
      experienceLevel: searchParams.get('exp') || 'Not specified',
      referralCode
    });
    
    navigate('/referral');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="p-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-500 hover:text-slate-900 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-slate-900">Register Now</h2>
          <p className="text-slate-600 mb-6">Secure your spot for the 60-minute AI workshop.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                required
                type="text"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                required
                type="email"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">College Name</label>
              <input
                required
                type="text"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.college}
                onChange={e => setFormData({...formData, college: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold text-lg mt-6 transition-colors"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
