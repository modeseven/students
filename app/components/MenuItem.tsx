'use client';

import React, { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

interface SubMenuItem {
  id: string;
  label: string;
  onClick?: () => void;
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  subItems: SubMenuItem[];
  defaultExpanded?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  label, 
  subItems, 
  defaultExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton 
          onClick={handleClick}
          sx={{ 
            borderRadius: 1, 
            mb: 0.5, 
            py: 1,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: '#b0bec5' }}>
            {icon}
          </ListItemIcon>
          <ListItemText 
            primary={label}
            primaryTypographyProps={{ 
              fontSize: '0.875rem',
              color: 'white'
            }}
          />
          {isExpanded ? <ExpandLess sx={{ color: '#b0bec5' }} /> : <ExpandMore sx={{ color: '#b0bec5' }} />}
        </ListItemButton>
      </ListItem>
      
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2 }}>
          {subItems.map((subItem) => (
            <ListItem key={subItem.id} disablePadding>
              <ListItemButton 
                onClick={subItem.onClick}
                sx={{ 
                  borderRadius: 1, 
                  mb: 0.5, 
                  py: 0.5,
                  pl: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.05)',
                  }
                }}
              >
                <ListItemText 
                  primary={subItem.label}
                  primaryTypographyProps={{ 
                    fontSize: '0.8rem',
                    color: '#b0bec5'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default MenuItem;
