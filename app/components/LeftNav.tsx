'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import {
  AccountCircle,
  Nature,
  ExpandLess,
  ExpandMore,
  People,
  Assignment,
  Assessment,
  Settings,
} from '@mui/icons-material';
import MenuItem from './MenuItem';
import InmateSearch from './InmateSearch';
import { useInmateContext } from '../contexts/InmateContext';

const LeftNav: React.FC = () => {
  const { handleInmateSelect, handleMainTabOpen } = useInmateContext();
  const [accountOpen, setAccountOpen] = useState(false);

  const handleAccountClick = () => {
    setAccountOpen(!accountOpen);
  };

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        bgcolor: 'rgb(28, 37, 54)', // Dark blue background
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header Section */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1 }}>
            Inmate Rooster
          </Typography>
          <Nature sx={{ ml: 'auto', color: '#b0bec5' }} />
        </Box>
        
        {/* Search Bar */}
        <InmateSearch 
          onInmateSelect={handleInmateSelect}
        />
      </Box>

      <Divider sx={{ borderColor: '#37474f' }} />

      {/* Menu Section */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2 }}>
        <List sx={{ px: 0 }}>
          <MenuItem
            icon={<People />}
            label="Inmates"
            subItems={[
              { id: 'census-roster', label: 'Census/Roster (PP30)', onClick: () => handleMainTabOpen('census-roster') },
              { id: 'name-search', label: 'Name Search', onClick: () => console.log('Name Search clicked') },
              { id: 'load-inmate', label: 'Load Inmate', onClick: () => handleMainTabOpen('load-inmate') },
              { id: 'population-report', label: 'Population Report', onClick: () => console.log('Population Report clicked') },
              { id: 'sample-page', label: 'Transcript 2', onClick: () => handleMainTabOpen('sample-page') },
            ]}
            defaultExpanded={true}
          />
          
          <MenuItem
            icon={<Assignment />}
            label="Assignments"
            subItems={[
              { id: 'facility-assignments', label: 'Facility Assignments', onClick: () => console.log('Facility Assignments clicked') },
              { id: 'future-assignments', label: 'Future Assignments', onClick: () => console.log('Future Assignments clicked') },
              { id: 'reports', label: 'Reports', onClick: () => console.log('Reports clicked') },
              { id: 'quarters-assignment', label: 'Quarters Assignment', onClick: () => console.log('Quarters Assignment clicked') },
            ]}
          />
          
          <MenuItem
            icon={<Assessment />}
            label="Reports"
            subItems={[
              { id: 'daily-reports', label: 'Daily Reports', onClick: () => console.log('Daily Reports clicked') },
              { id: 'monthly-reports', label: 'Monthly Reports', onClick: () => console.log('Monthly Reports clicked') },
              { id: 'incident-reports', label: 'Incident Reports', onClick: () => console.log('Incident Reports clicked') },
            ]}
          />
          
          <MenuItem
            icon={<Settings />}
            label="Administration"
            subItems={[
              { id: 'user-management', label: 'User Management', onClick: () => console.log('User Management clicked') },
              { id: 'system-settings', label: 'System Settings', onClick: () => console.log('System Settings clicked') },
              { id: 'backup-restore', label: 'Backup & Restore', onClick: () => console.log('Backup & Restore clicked') },
            ]}
          />
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2 }}>
        <List sx={{ px: 1 }}>
          {/* User Info */}
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleAccountClick}
              sx={{ 
                borderRadius: 1, 
                mb: 0.5,
                flexDirection: 'column',
                alignItems: 'flex-start',
                py: 1.5
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 0.5 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#4caf50', mr: 1.5 }}>
                  <AccountCircle />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                    Joe Bloggs
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#b0bec5', display: 'flex', alignItems: 'center' }}>
                    <Nature sx={{ fontSize: 14, mr: 0.5 }} />
                    Danbury FCI
                  </Typography>
                </Box>
                {accountOpen ? <ExpandLess /> : <ExpandMore />}
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default LeftNav;
