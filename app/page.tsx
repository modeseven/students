'use client';

import React from 'react';
import TabbedProfiles from './components/TabbedProfiles';
import { useInmateContext } from './contexts/InmateContext';

export default function Home() {
  const { openStudents, activeTab, handleTabChange, handleCloseTab } = useInmateContext();

  return (
    <TabbedProfiles 
      students={openStudents}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onCloseTab={handleCloseTab}
    />
  );
}
