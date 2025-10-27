'use client';

import React from 'react';
import TabbedProfiles from './components/TabbedProfiles';
import { useInmateContext } from './contexts/InmateContext';

export default function Home() {
  const { 
    openInmates, 
    activeTab, 
    mainTab,
    handleTabChange, 
    handleCloseTab,
    handleMainTabClose
  } = useInmateContext();

  return (
    <TabbedProfiles 
      inmates={openInmates}
      mainTab={mainTab}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onCloseTab={handleCloseTab}
      onCloseMainTab={handleMainTabClose}
    />
  );
}
