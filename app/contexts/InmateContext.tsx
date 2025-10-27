'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { MainTabType } from '../components/TabbedProfiles';

interface TabState {
  mainTab: number;
  educationTab: number;
}

interface Inmate {
  id: string;
  name: string;
  studentNumber: string;
}

interface InmateContextType {
  openInmates: Inmate[];
  activeTab: number;
  mainTab: MainTabType;
  tabStates: Record<string, TabState>; // inmateId -> TabState
  handleInmateSelect: (inmate: any) => void;
  handleTabChange: (newValue: number) => void;
  handleCloseTab: (inmateId: string) => void;
  handleMainTabChange: (inmateId: string, mainTab: number) => void;
  handleEducationTabChange: (inmateId: string, educationTab: number) => void;
  handleMainTabOpen: (tabType: MainTabType) => void;
  handleMainTabClose: () => void;
}

const InmateContext = createContext<InmateContextType | undefined>(undefined);

// Convert inmate data to minimal format
const convertInmate = (inmate: any): Inmate => {
  return {
    id: inmate.registerNumber,
    name: inmate.name,
    studentNumber: inmate.registerNumber,
  };
};

export function InmateProvider({ children }: { children: React.ReactNode }) {
  const [openInmates, setOpenInmates] = useState<Inmate[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [mainTab, setMainTab] = useState<MainTabType>('census-roster');
  const [tabStates, setTabStates] = useState<Record<string, TabState>>({});

  const handleInmateSelect = useCallback((inmate: any) => {
    const inmateData = convertInmate(inmate);
    
    // Check if this inmate is already open
    const existingIndex = openInmates.findIndex(i => i.id === inmateData.id);
    
    if (existingIndex >= 0) {
      // If already open, switch to that tab (accounting for main tab at index 0)
      setActiveTab(mainTab ? existingIndex + 1 : existingIndex);
    } else {
      // Add new tab and switch to it (accounting for main tab at index 0)
      setOpenInmates(prev => [...prev, inmateData]);
      const newTabIndex = mainTab ? openInmates.length + 1 : openInmates.length;
      setActiveTab(newTabIndex);
      
      // Initialize tab state for new inmate
      setTabStates(prev => ({
        ...prev,
        [inmateData.id]: { mainTab: 0, educationTab: 0 }
      }));
    }
  }, [openInmates.length, mainTab]);

  const handleTabChange = useCallback((newValue: number) => {
    setActiveTab(newValue);
  }, []);

  const handleCloseTab = useCallback((inmateId: string) => {
    setOpenInmates(prev => {
      const newInmates = prev.filter(i => i.id !== inmateId);
      
      // Adjust active tab if needed (accounting for main tab)
      const totalTabs = mainTab ? newInmates.length + 1 : newInmates.length;
      if (activeTab >= totalTabs && totalTabs > 0) {
        setActiveTab(totalTabs - 1);
      } else if (totalTabs === 0) {
        setActiveTab(0);
      }
      
      return newInmates;
    });
    
    // Remove tab state for closed inmate
    setTabStates(prev => {
      const newStates = { ...prev };
      delete newStates[inmateId];
      return newStates;
    });
  }, [activeTab, mainTab]);

  const handleMainTabChange = useCallback((inmateId: string, mainTab: number) => {
    setTabStates(prev => ({
      ...prev,
      [inmateId]: { ...prev[inmateId], mainTab }
    }));
  }, []);

  const handleEducationTabChange = useCallback((inmateId: string, educationTab: number) => {
    setTabStates(prev => ({
      ...prev,
      [inmateId]: { ...prev[inmateId], educationTab }
    }));
  }, []);

  const handleMainTabOpen = useCallback((tabType: MainTabType) => {
    setMainTab(tabType);
    setActiveTab(0); // Always switch to main tab when opening
  }, []);

  const handleMainTabClose = useCallback(() => {
    setMainTab(null);
    // If there are inmate tabs, switch to the first one, otherwise stay at 0
    if (openInmates.length > 0) {
      setActiveTab(0);
    } else {
      setActiveTab(0);
    }
  }, [openInmates.length]);

  return (
    <InmateContext.Provider value={{
      openInmates,
      activeTab,
      mainTab,
      tabStates,
      handleInmateSelect,
      handleTabChange,
      handleCloseTab,
      handleMainTabChange,
      handleEducationTabChange,
      handleMainTabOpen,
      handleMainTabClose
    }}>
      {children}
    </InmateContext.Provider>
  );
}

// Export Inmate type
export type { Inmate };

export function useInmateContext() {
  const context = useContext(InmateContext);
  if (context === undefined) {
    throw new Error('useInmateContext must be used within an InmateProvider');
  }
  return context;
}
