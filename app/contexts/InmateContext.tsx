'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Student } from '../components/Profile';
import { MainTabType } from '../components/TabbedProfiles';

interface TabState {
  mainTab: number;
  educationTab: number;
}

interface InmateContextType {
  openStudents: Student[];
  activeTab: number;
  mainTab: MainTabType;
  tabStates: Record<string, TabState>; // studentId -> TabState
  handleInmateSelect: (inmate: any) => void;
  handleTabChange: (newValue: number) => void;
  handleCloseTab: (studentId: string) => void;
  handleMainTabChange: (studentId: string, mainTab: number) => void;
  handleEducationTabChange: (studentId: string, educationTab: number) => void;
  handleMainTabOpen: (tabType: MainTabType) => void;
  handleMainTabClose: () => void;
}

const InmateContext = createContext<InmateContextType | undefined>(undefined);

// Convert inmate data to student format (without API calls - lazy loading)
const convertInmateToStudent = (inmate: any): Student => {
  return {
    id: inmate.registerNumber,
    name: inmate.name,
    studentNumber: inmate.registerNumber,
    grade: 'Inmate',
    gpa: 0, // Will be loaded when transcript tab is opened
    currentCourses: [], // Will be loaded when transcript tab is opened
    highTests: [], // Will be loaded when transcript tab is opened
    reviews: [], // Will be loaded when reviews tab is opened
    allTests: [], // Will be loaded when tests tab is opened
    interview: {
      id: inmate.registerNumber,
      date: new Date().toISOString().split('T')[0],
      interviewer: 'System',
      notes: `Inmate profile for ${inmate.name} (${inmate.registerNumber})`,
      recommendations: [],
      status: 'scheduled'
    }
  };
};

export function InmateProvider({ children }: { children: React.ReactNode }) {
  const [openStudents, setOpenStudents] = useState<Student[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [mainTab, setMainTab] = useState<MainTabType>(null);
  const [tabStates, setTabStates] = useState<Record<string, TabState>>({});

  const handleInmateSelect = useCallback((inmate: any) => {
    const student = convertInmateToStudent(inmate);
    
    // Check if this inmate is already open
    const existingIndex = openStudents.findIndex(s => s.id === student.id);
    
    if (existingIndex >= 0) {
      // If already open, switch to that tab (accounting for main tab at index 0)
      setActiveTab(mainTab ? existingIndex + 1 : existingIndex);
    } else {
      // Add new tab and switch to it (accounting for main tab at index 0)
      setOpenStudents(prev => [...prev, student]);
      const newTabIndex = mainTab ? openStudents.length + 1 : openStudents.length;
      setActiveTab(newTabIndex);
      
      // Initialize tab state for new student
      setTabStates(prev => ({
        ...prev,
        [student.id]: { mainTab: 0, educationTab: 0 }
      }));
    }
  }, [openStudents.length, mainTab]);

  const handleTabChange = useCallback((newValue: number) => {
    setActiveTab(newValue);
  }, []);

  const handleCloseTab = useCallback((studentId: string) => {
    setOpenStudents(prev => {
      const newStudents = prev.filter(s => s.id !== studentId);
      
      // Adjust active tab if needed (accounting for main tab)
      const totalTabs = mainTab ? newStudents.length + 1 : newStudents.length;
      if (activeTab >= totalTabs && totalTabs > 0) {
        setActiveTab(totalTabs - 1);
      } else if (totalTabs === 0) {
        setActiveTab(0);
      }
      
      return newStudents;
    });
    
    // Remove tab state for closed student
    setTabStates(prev => {
      const newStates = { ...prev };
      delete newStates[studentId];
      return newStates;
    });
  }, [activeTab, mainTab]);

  const handleMainTabChange = useCallback((studentId: string, mainTab: number) => {
    setTabStates(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], mainTab }
    }));
  }, []);

  const handleEducationTabChange = useCallback((studentId: string, educationTab: number) => {
    setTabStates(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], educationTab }
    }));
  }, []);

  const handleMainTabOpen = useCallback((tabType: MainTabType) => {
    setMainTab(tabType);
    setActiveTab(0); // Always switch to main tab when opening
  }, []);

  const handleMainTabClose = useCallback(() => {
    setMainTab(null);
    // If there are inmate tabs, switch to the first one, otherwise stay at 0
    if (openStudents.length > 0) {
      setActiveTab(0);
    } else {
      setActiveTab(0);
    }
  }, [openStudents.length]);

  return (
    <InmateContext.Provider value={{
      openStudents,
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

export function useInmateContext() {
  const context = useContext(InmateContext);
  if (context === undefined) {
    throw new Error('useInmateContext must be used within an InmateProvider');
  }
  return context;
}
