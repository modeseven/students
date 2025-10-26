'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import { School, Close } from '@mui/icons-material';
import Profile, { Student } from './Profile';

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
  activeTab?: number;
  onTabChange?: (newValue: number) => void;
  onCloseTab?: (studentId: string) => void;
}

export default function TabbedProfiles({ 
  students, 
  activeTab = 0, 
  onTabChange, 
  onCloseTab 
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

  if (!students || students.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" color="text.secondary" align="center">
          No inmate profiles open
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Search for an inmate to open their profile
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
      {/* Profile Tabs */}
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider', 
        flexShrink: 0,
        marginLeft: 2, // Add margin only to the tabs container
      }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="student profiles tabs"
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
              color: 'primary.main',
              backgroundColor: 'background.paper',
              borderBottomColor: 'background.paper',
            }
          }}
        >
          {students.map((student, index) => (
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
              id={`profile-tab-${index}`}
              aria-controls={`profile-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Profile Content - Scrollable */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {students.map((student, index) => (
          <TabPanel key={student.id} value={tabValue} index={index}>
            <Profile student={student} />
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}
