'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import { School, Close, List, PersonAdd } from '@mui/icons-material';
import Profile, { Student } from './Profile';
import CensusRoster from './CensusRoster';
import LoadInmate from './LoadInmate';

export type MainTabType = 'census-roster' | 'load-inmate' | null;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

interface TabbedProfilesProps {
  students: Student[];
  mainTab: MainTabType;
  activeTab?: number;
  onTabChange?: (newValue: number) => void;
  onCloseTab?: (studentId: string) => void;
  onCloseMainTab?: () => void;
}

export default function TabbedProfiles({ 
  students, 
  mainTab,
  activeTab = 0, 
  onTabChange, 
  onCloseTab,
  onCloseMainTab
}: TabbedProfilesProps) {
  const [internalTabValue, setInternalTabValue] = useState(0);
  
  // Use external activeTab if provided, otherwise use internal state
  const tabValue = activeTab !== undefined ? activeTab : internalTabValue;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (onTabChange) {
      onTabChange(newValue);
    } else {
      setInternalTabValue(newValue);
    }
  };

  const handleCloseTab = (event: React.MouseEvent, studentId: string) => {
    event.stopPropagation();
    if (onCloseTab) {
      onCloseTab(studentId);
    }
  };

  const handleCloseMainTab = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onCloseMainTab) {
      onCloseMainTab();
    }
  };

  const getMainTabInfo = (tabType: MainTabType) => {
    switch (tabType) {
      case 'census-roster':
        return { icon: <List />, label: 'Census Roster' };
      case 'load-inmate':
        return { icon: <PersonAdd />, label: 'Load Inmate' };
      default:
        return { icon: null, label: '' };
    }
  };

  if (!mainTab && (!students || students.length === 0)) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" color="text.secondary" align="center">
          No content open
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Select a menu item or search for an inmate to get started
        </Typography>
      </Box>
    );
  }


  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      marginTop: 2, // Add top margin
    }}>
      {/* Tabs */}
      <Box sx={{ 
        flexShrink: 0,
        marginLeft: 2, // Add margin only to the tabs container
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="main and profile tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '4px 4px 0 0',
              marginRight: 1,
              marginBottom: -1,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            },
            '& .MuiTab-root.Mui-selected': {
              color: 'white',
              backgroundColor: 'rgb(28, 37, 54)', // Same blue background as left nav
              borderBottomColor: 'rgb(28, 37, 54)',
              borderBottom: 'none', // Remove the bottom border line
              '& .MuiSvgIcon-root': {
                color: 'white', // White icons for contrast
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none', // This removes the blue underline
            }
          }}
        >
          {/* Main Tab */}
          {mainTab && (
            <Tab
              key="main-tab"
              icon={
                <Close 
                  onClick={handleCloseMainTab}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { 
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '50%'
                    }
                  }}
                />
              }
              iconPosition="end"
              label={getMainTabInfo(mainTab).label}
              id="main-tab"
              aria-controls="main-tabpanel"
            />
          )}
          
          {/* Inmate Profile Tabs */}
          {students.map((student, index) => {
            const tabIndex = mainTab ? index + 1 : index;
            return (
              <Tab
                key={student.id}
                icon={
                  <Close 
                    onClick={(e) => handleCloseTab(e, student.id)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { 
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '50%'
                      }
                    }}
                  />
                }
                iconPosition="end"
                label={`${student.name} (${student.studentNumber})`}
                id={`profile-tab-${tabIndex}`}
                aria-controls={`profile-tabpanel-${tabIndex}`}
              />
            );
          })}
        </Tabs>
      </Box>

      {/* Content - Scrollable */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {/* Main Tab Content */}
        {mainTab && (
          <TabPanel value={tabValue} index={0}>
            {mainTab === 'census-roster' && <CensusRoster />}
            {mainTab === 'load-inmate' && <LoadInmate />}
          </TabPanel>
        )}
        
        {/* Inmate Profile Content */}
        {students.map((student, index) => {
          const tabIndex = mainTab ? index + 1 : index;
          return (
            <TabPanel key={student.id} value={tabValue} index={tabIndex}>
              <Profile student={student} />
            </TabPanel>
          );
        })}
      </Box>
    </Box>
  );
}
