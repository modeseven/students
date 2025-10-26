'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Popover,
  Box,
  Typography,
  Avatar,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Search, Person } from '@mui/icons-material';

interface InmateSearchProps {
  onInmateSelect?: (inmate: any) => void;
}

const InmateSearch: React.FC<InmateSearchProps> = ({ onInmateSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // API call to fetch inmate data
  const fetchInmate = async (regno: string) => {
    try {
      const response = await fetch(`/api/inmates/${regno}`);
      if (response.ok) {
        const data = await response.json();
        return {
          registerNumber: data.regno,
          name: data.fullName,
          facility: data.facility
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching inmate:', error);
      return null;
    }
  };

  // Format input to add dash automatically
  const formatRegisterNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Allow backspacing - if the new value is shorter, just return the digits
    if (digits.length <= 5) {
      return digits;
    }
    
    // Add dash after 5 digits for longer inputs
    if (digits.length > 5) {
      return digits.slice(0, 5) + '-' + digits.slice(5, 8);
    }
    
    return digits;
  };

  // Validate register number format (XXXXX-XXX)
  const isValidRegisterNumber = (value: string): boolean => {
    const regex = /^\d{5}-\d{3}$/;
    return regex.test(value);
  };

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatRegisterNumber(rawValue);
    setSearchValue(formattedValue);

    console.log('Raw value:', rawValue);
    console.log('Formatted value:', formattedValue);
    console.log('Is valid:', isValidRegisterNumber(formattedValue));

    if (isValidRegisterNumber(formattedValue)) {
      console.log('Triggering search for:', formattedValue);
      setIsSearching(true);
      // Set anchor element immediately
      setAnchorEl(inputRef.current);
      
      // Call the API
      fetchInmate(formattedValue).then(foundInmate => {
        console.log('Found inmate:', foundInmate);
        
        if (foundInmate) {
          setSearchResults([foundInmate]);
        } else {
          setSearchResults([{ registerNumber: formattedValue, name: 'Register number not found', facility: '', isNotFound: true }]);
        }
        
        setIsSearching(false);
      });
    } else {
      setAnchorEl(null);
      setSearchResults([]);
    }
  };

  // Handle inmate selection
  const handleInmateSelect = (inmate: any) => {
    if (!inmate.isNotFound) {
      setSearchValue(inmate.registerNumber);
      onInmateSelect?.(inmate);
    }
    setAnchorEl(null);
  };

  // Close popover when clicking outside
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TextField
        ref={inputRef}
        placeholder="Try: 44444-444, 55555-555, or 11111-111"
        variant="outlined"
        size="small"
        fullWidth
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <Search sx={{ color: '#b0bec5', mr: 1 }} />,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            bgcolor: 'rgb(28, 37, 54)',
            '& fieldset': { 
              borderColor: '#b0bec5 !important',
              borderWidth: '2px !important',
            },
            '&:hover fieldset': { 
              borderColor: '#e0e0e0 !important',
              borderWidth: '2px !important',
            },
            '&.Mui-focused fieldset': { 
              borderColor: '#4caf50 !important',
              borderWidth: '2px !important',
            },
          },
          '& .MuiInputBase-input': {
            color: 'white',
            '&::placeholder': {
              color: '#b0bec5',
              opacity: 1,
            },
          },
        }}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            bgcolor: 'rgb(28, 37, 54)',
            color: 'white',
            border: '1px solid #37474f',
            borderRadius: 1,
            minWidth: 300,
            maxWidth: 400,
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          {isSearching ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#b0bec5' }}>
                Searching...
              </Typography>
            </Box>
          ) : (
            <>
              {searchResults.map((inmate, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleInmateSelect(inmate)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                    disabled={inmate.isNotFound}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: inmate.isNotFound ? '#f44336' : '#4caf50' }}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: inmate.isNotFound ? '#f44336' : 'white',
                            fontWeight: inmate.isNotFound ? 'normal' : 'bold'
                          }}
                        >
                          {inmate.name}
                        </Typography>
                      }
                      secondary={
                        !inmate.isNotFound && (
                          <Typography variant="caption" sx={{ color: '#b0bec5' }}>
                            {inmate.facility}
                          </Typography>
                        )
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default InmateSearch;
