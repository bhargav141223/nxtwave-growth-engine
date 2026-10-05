import React from 'react';
import { useSimulation } from '../SimulationContext';
import { Copy, CheckCircle, Share2, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReferralPage() {
  const { currentUser, metrics, experimentVariant } = useSimulation();
  const [copied, setCopied] = React.useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-project.vercel.app';
  const referralUrl = `${baseUrl}/register?ref=${currentUser?.referralCode || 'DEMO123'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">You're Registered!</h1>
        <p className="text-lg text-slate-800 font-medium mb-1">You're registered for the workshop — demo registration complete.</p>
        <p className="text-sm text-slate-500 italic">This is a simulation. No email is sent from this prototype.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Referral Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Share2 className="text-blue-500" />
            Invite Your Friends
          </h2>
          <p className="text-slate-600 mb-6">
            Share this link in your college WhatsApp groups. Help your friends build their first AI project too!
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
            <p className="text-sm text-slate-500 mb-1">Your unique link</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm bg-white p-2 border border-slate-200 rounded font-mono truncate">
                {referralUrl}
              </code>
              <button 
                onClick={handleCopy}
                className="bg-blue-100 text-blue-700 p-2 rounded hover:bg-blue-200 transition-colors"
                title="Copy Link"
              >
                {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* TEST 2 — REFERRAL EXPERIMENT */}
        {experimentVariant === 'B' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              Referral Leaderboard
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              See how referral-led growth could work (simulated demo).
            </p>
            
            <div className="space-y-4">
              {metrics.leaderboard.slice(0, 3).map((user, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className={`font-bold w-6 text-center ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-400' : 'text-orange-400'}`}>
                      #{i + 1}
                    </span>
                    <span className="font-medium text-slate-700">{user.name}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold">
                    {user.referrals}
                  </span>
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-slate-600 font-medium">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center text-sm">#42</span>
                  <span>{currentUser?.name || 'You'}</span>
                </div>
                <span>0</span>
              </div>
            </div>
          </div>
        )}
        
        {experimentVariant === 'A' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center text-center">
            <div>
              <p className="text-slate-600 mb-4">Sharing is caring! Invite your college mates.</p>
              <button 
                onClick={handleCopy}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
              >
                Copy My Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
