import React from 'react';
import { DashboardHero } from './DashboardHero';
import UserSlots from './UserSlots';

const Dashboard = () => {
  return (
    <div>
      <DashboardHero />

      <UserSlots />
      
    </div>
  );
};

export default Dashboard;
