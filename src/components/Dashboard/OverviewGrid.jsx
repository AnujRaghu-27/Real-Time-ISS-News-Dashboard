import React from 'react';
import StatCard from './StatCard';
import { Users, Zap, Globe, Activity } from 'lucide-react';
import { useISSTracker } from '../../hooks/useISSTracker';

const OverviewGrid = () => {
  const { speed, astronauts, altitude, history } = useISSTracker();

  const stats = [
    {
      title: 'Current Velocity',
      value: speed ? Math.round(speed).toLocaleString() : '27,600',
      unit: 'KM/H',
      trend: 0.8,
      icon: Zap,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Crew',
      value: astronauts?.length || '7',
      unit: 'People',
      trend: 0,
      icon: Users,
      color: 'bg-violet-500',
    },
    {
      title: 'Orbital Altitude',
      value: altitude ? altitude.toFixed(1) : '408.5',
      unit: 'KM',
      trend: 0.2,
      icon: Globe,
      color: 'bg-emerald-500',
    },
    {
      title: 'Stream Health',
      value: '99.9%',
      unit: 'Uptime',
      trend: 0.1,
      icon: Activity,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default OverviewGrid;
