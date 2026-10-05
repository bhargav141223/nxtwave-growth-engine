import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '../SimulationContext';
import { motion } from 'framer-motion';
import { Rocket, Clock, Briefcase, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { experimentVariant } = useSimulation();
  
  // TEST 1 — MESSAGE EXPERIMENT
  const headline = experimentVariant === 'A' 
    ? "Build Your First AI Project in 60 Minutes"
    : "Build an AI Project You Can Add to Your Resume in 60 Minutes";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Demo Banner */}
      <div className="w-full bg-amber-200 text-amber-900 py-2 text-center text-sm font-semibold">
        Simulated Demo Mode - Experiment Variant {experimentVariant} Active
      </div>

      <main className="flex-1 w-full max-w-4xl px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-6"
        >
          <Rocket size={16} />
          Free NxtWave Workshop
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
        >
          {headline}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 mb-10 max-w-2xl"
        >
          Build something practical with AI, even if you don't know where to start. Perfect for final-year engineering students preparing for placements.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={() => navigate('/personalize')}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Find Out Why This Workshop Is For Me
            <ChevronRight size={20} />
          </button>
          
          <button 
            onClick={() => navigate('/register')}
            className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Skip & Register Now
          </button>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 mt-24 text-left w-full"
        >
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <Clock className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">60-Minute Format</h3>
            <p className="text-slate-600">No multi-week courses. Get in, build a real project, and get out in just one hour.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <Briefcase className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Resume Ready</h3>
            <p className="text-slate-600">Walk away with a tangible project you can confidently discuss in your placement interviews.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
