'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Student } from '../components/Profile';

interface TabState {
  mainTab: number;
  educationTab: number;
}

interface InmateContextType {
  openStudents: Student[];
  activeTab: number;
  tabStates: Record<string, TabState>; // studentId -> TabState
  handleInmateSelect: (inmate: any) => void;
  handleTabChange: (newValue: number) => void;
  handleCloseTab: (studentId: string) => void;
  handleMainTabChange: (studentId: string, mainTab: number) => void;
  handleEducationTabChange: (studentId: string, educationTab: number) => void;
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
  const [tabStates, setTabStates] = useState<Record<string, TabState>>({});

  const handleInmateSelect = useCallback((inmate: any) => {
    const student = convertInmateToStudent(inmate);
    
    // Check if this inmate is already open
    const existingIndex = openStudents.findIndex(s => s.id === student.id);
    
    if (existingIndex >= 0) {
      // If already open, switch to that tab
      setActiveTab(existingIndex);
    } else {
      // Add new tab and switch to it
      setOpenStudents(prev => [...prev, student]);
      setActiveTab(openStudents.length);
      
      // Initialize tab state for new student
      setTabStates(prev => ({
        ...prev,
        [student.id]: { mainTab: 0, educationTab: 0 }
      }));
    }
  }, [openStudents.length]);

  const handleTabChange = useCallback((newValue: number) => {
    setActiveTab(newValue);
  }, []);

  const handleCloseTab = useCallback((studentId: string) => {
    setOpenStudents(prev => {
      const newStudents = prev.filter(s => s.id !== studentId);
      
      // Adjust active tab if needed
      if (activeTab >= newStudents.length && newStudents.length > 0) {
        setActiveTab(newStudents.length - 1);
      } else if (newStudents.length === 0) {
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
  }, [activeTab]);

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

  return (
    <InmateContext.Provider value={{
      openStudents,
      activeTab,
      tabStates,
      handleInmateSelect,
      handleTabChange,
      handleCloseTab,
      handleMainTabChange,
      handleEducationTabChange
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
