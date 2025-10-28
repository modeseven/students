'use client';

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import { Close, List, PersonAdd, Person, Description } from '@mui/icons-material';
import Profile from './Profile';
import CensusRoster from './CensusRoster';
import LoadInmate from './LoadInmate';
import Transcript2 from './Transcript2';
import { SELECTED_TAB_BG, SELECTED_TAB_TEXT, TABS_CONTAINER_BG, HOVER_TAB_BG } from '../constants/colors';
import { Inmate } from '../contexts/InmateContext';

export type MainTabType = 'census-roster' | 'load-inmate' | 'sample-page' | null;

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
  inmates: Inmate[];
  mainTab: MainTabType;
  activeTab?: number;
  onTabChange?: (newValue: number) => void;
  onCloseTab?: (inmateId: string) => void;
  onCloseMainTab?: () => void;
}

export default function TabbedProfiles({ 
  inmates, 
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

  const handleCloseTab = (event: React.MouseEvent, inmateId: string) => {
    event.stopPropagation();
    if (onCloseTab) {
      onCloseTab(inmateId);
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
      case 'sample-page':
        return { icon: <Description />, label: 'Transcript 2' };
      default:
        return { icon: undefined, label: '' };
    }
  };

  if (!mainTab && (!inmates || inmates.length === 0)) {
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
      marginTop: 2,
    }}>
      {/* Tabs */}
      <Box sx={{ 
        flexShrink: 0,
        backgroundColor: TABS_CONTAINER_BG,
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="main and profile tabs"
          variant="scrollable"
          scrollButtons={false}
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
              backgroundColor: 'background.paper',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: HOVER_TAB_BG,
                color: 'text.primary',
              }
            },
            '& .MuiTab-root.Mui-selected': {
              backgroundColor: SELECTED_TAB_BG,
              borderBottomColor: SELECTED_TAB_BG,
              borderBottom: 'none',
              fontWeight: 600,
              boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
              zIndex: 1,
              position: 'relative',
              color: SELECTED_TAB_TEXT,
            },
            '& .MuiTabs-indicator': {
              display: 'none', // Remove the blue underline
            }
          }}
        >
          {/* Main Tab */}
          {mainTab && (
            <Tab
              key="main-tab"
              icon={getMainTabInfo(mainTab).icon}
              iconPosition="start"
              label={getMainTabInfo(mainTab).label}
              id="main-tab"
              aria-controls="main-tabpanel"
            />
          )}
          
          {/* Inmate Profile Tabs */}
          {inmates.map((inmate, index) => {
            const tabIndex = mainTab ? index + 1 : index;
            return (
              <Tab
                key={inmate.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person sx={{ fontSize: 20 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span>{inmate.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#757575', fontWeight: 'normal' }}>{inmate.studentNumber}</span>
                    </Box>
                  </Box>
                }
                icon={
                  <Close 
                    onClick={(e) => handleCloseTab(e, inmate.id)}
                    sx={{ 
                      cursor: 'pointer',
                      fontSize: 18,
                      '&:hover': { 
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '50%'
                      }
                    }}
                  />
                }
                iconPosition="end"
                id={`profile-tab-${tabIndex}`}
                aria-controls={`profile-tabpanel-${tabIndex}`}
              />
            );
          })}
        </Tabs>
      </Box>

      {/* Content - Scrollable */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        backgroundColor: tabValue === 0 && mainTab ? SELECTED_TAB_BG : 'white'
      }}>
        {/* Main Tab Content */}
        {mainTab && (
          <TabPanel value={tabValue} index={0}>
            {mainTab === 'census-roster' && <CensusRoster />}
            {mainTab === 'load-inmate' && <LoadInmate />}
            {mainTab === 'sample-page' && <Transcript2 />}
          </TabPanel>
        )}
        
        {/* Inmate Profile Content */}
        {inmates.map((inmate, index) => {
          const tabIndex = mainTab ? index + 1 : index;
          return (
            <TabPanel key={inmate.id} value={tabValue} index={tabIndex}>
              <Profile inmate={inmate} />
            </TabPanel>
          );
        })}
      </Box>
    </Box>
  );
}
