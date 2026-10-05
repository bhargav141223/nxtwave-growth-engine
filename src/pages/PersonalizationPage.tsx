import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function PersonalizationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [experience, setExperience] = useState('');

  const goals = [
    "Prepare for placements",
    "Improve my resume",
    "Build an AI project",
    "Explore AI tools"
  ];

  const experiences = [
    "Beginner",
    "Some experience",
    "Comfortable"
  ];

  const handleGoalSelect = (selectedGoal: string) => {
    setGoal(selectedGoal);
    setStep(2);
  };

  const handleExperienceSelect = (selectedExp: string) => {
    setExperience(selectedExp);
    setStep(3);
  };

  const getPersonalizedMessage = () => {
    if (goal === "Prepare for placements") {
      return "This workshop can help you turn your interest in AI into a practical project you can discuss during interviews.";
    }
    if (goal === "Improve my resume") {
      return "Adding a real GenAI project to your resume helps you stand out. We'll build one in just 60 minutes.";
    }
    if (experience === "Beginner") {
      return "You don't need advanced AI knowledge. The workshop is designed to help you start building quickly without math overload.";
    }
    return "Join us to build a practical, portfolio-ready AI project in just 60 minutes. Perfect for final-year students.";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="p-6">
        <button 
          onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
          className="text-slate-500 hover:text-slate-900 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
            <motion.div 
              className="bg-blue-600 h-full rounded-full"
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-slate-900">What is your current goal?</h2>
                <div className="grid gap-3">
                  {goals.map(g => (
                    <button
                      key={g}
                      onClick={() => handleGoalSelect(g)}
                      className="p-4 text-left border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl font-medium text-slate-700 transition-all"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-slate-900">How comfortable are you with AI?</h2>
                <div className="grid gap-3">
                  {experiences.map(e => (
                    <button
                      key={e}
                      onClick={() => handleExperienceSelect(e)}
                      className="p-4 text-left border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl font-medium text-slate-700 transition-all"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Here's why you should join:</h2>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  {getPersonalizedMessage()}
                </p>
                <button
                  onClick={() => navigate(`/register?goal=${encodeURIComponent(goal)}&exp=${encodeURIComponent(experience)}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold text-lg transition-colors"
                >
                  Continue to Registration
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
