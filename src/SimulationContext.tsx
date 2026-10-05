import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserInfo = {
  name: string;
  email: string;
  college: string;
  goal: string;
  experienceLevel: string;
  referralCode: string;
};

type Activity = {
  id: string;
  message: string;
  time: string;
};

type SimulationContextType = {
  currentUser: UserInfo | null;
  setCurrentUser: (user: UserInfo) => void;
  registerUser: (user: UserInfo) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
  metrics: {
    totalRegistrations: number;
    referralRegistrations: number;
    conversionRate: number;
    costPerRegistration: number;
    registrationsByChannel: { name: string; value: number }[];
    leaderboard: { name: string; referrals: number }[];
    timeSeriesData: { date: string; registrations: number; target: number }[];
    funnelData: { name: string; value: number; fill: string }[];
  };
  liveFeed: Activity[];
  experimentVariant: 'A' | 'B';
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [experimentVariant] = useState<'A' | 'B'>('B'); // Force B for richer demo

  // Initial Data State
  const [totalReg, setTotalReg] = useState(284);
  const [refReg, setRefReg] = useState(84);
  
  const [timeSeries, setTimeSeries] = useState([
    { date: 'Day 1', registrations: 12, target: 50 },
    { date: 'Day 2', registrations: 34, target: 100 },
    { date: 'Day 3', registrations: 65, target: 150 },
    { date: 'Day 4', registrations: 110, target: 200 },
    { date: 'Day 5', registrations: 180, target: 300 },
    { date: 'Day 6', registrations: 245, target: 400 },
    { date: 'Today', registrations: 284, target: 500 },
  ]);

  const [liveFeed, setLiveFeed] = useState<Activity[]>([
    { id: '1', message: 'Student from VIT registered via WhatsApp', time: '2 mins ago' },
    { id: '2', message: 'Rahul successfully referred 2 friends', time: '5 mins ago' },
    { id: '3', message: 'New registration from Instagram Story', time: '12 mins ago' },
  ]);

  // Replaced automatic fake interval with an actual state updater for real interactions
  const addLiveRegistration = (isReferral: boolean, userName: string) => {
    setTotalReg(prev => prev + 1);
    if (isReferral) setRefReg(prev => prev + 1);

    // Update Today's time series
    setTimeSeries(prev => {
      const newSeries = [...prev];
      newSeries[6] = { ...newSeries[6], registrations: newSeries[6].registrations + 1 };
      return newSeries;
    });

    // Add to live feed
    setLiveFeed(prev => {
      const newActivities = [
        {
          id: Date.now().toString(),
          message: `${userName} just registered ${isReferral ? 'via a referral link!' : 'organically.'}`,
          time: 'Just now'
        },
        ...prev
      ].slice(0, 5);
      return newActivities;
    });
  };

  const registerUser = (user: UserInfo) => {
    setCurrentUser(user);
    // Check if they came from a referral link (simulate by checking if 'exp' or 'goal' is missing, or just pass a flag)
    const isReferral = user.experienceLevel === 'Not specified'; 
    addLiveRegistration(isReferral, user.name);
  };

  const metrics = {
    totalRegistrations: totalReg,
    referralRegistrations: refReg,
    conversionRate: 14.2,
    costPerRegistration: parseFloat((2000 / totalReg).toFixed(2)),
    registrationsByChannel: [
      { name: 'Communities', value: Math.floor(totalReg * 0.45) },
      { name: 'Referrals', value: refReg },
      { name: 'Paid Social', value: Math.floor(totalReg * 0.15) },
      { name: 'Direct', value: totalReg - Math.floor(totalReg * 0.45) - refReg - Math.floor(totalReg * 0.15) },
    ],
    leaderboard: [
      { name: 'Student A', referrals: 18 },
      { name: 'Student B', referrals: 15 },
      { name: 'Student C', referrals: 12 },
      { name: 'Student D', referrals: 8 },
      { name: 'Student E', referrals: 5 },
    ],
    timeSeriesData: timeSeries,
    funnelData: [
      { name: 'Landing Page Views', value: Math.floor(totalReg * 8.5), fill: '#94a3b8' },
      { name: 'Started Quiz', value: Math.floor(totalReg * 4.2), fill: '#60a5fa' },
      { name: 'Reached Registration', value: Math.floor(totalReg * 1.8), fill: '#3b82f6' },
      { name: 'Registered', value: totalReg, fill: '#1d4ed8' },
    ]
  };

  return (
    <SimulationContext.Provider value={{ currentUser, setCurrentUser, registerUser, isAdminAuthenticated, setIsAdminAuthenticated, metrics, liveFeed, experimentVariant }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error('useSimulation must be used within SimulationProvider');
  return context;
};
