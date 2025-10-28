'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Paper,
  Typography,
  Container
} from '@mui/material';

interface FormatSelectorFormProps {
  onFormatSelect: (format: string, registerNumber: string) => void;
}

const formatOptions = [
  { label: 'Transcript', value: 'transcript' },
  { label: 'Tests', value: 'tests' },
  { label: 'High Tests', value: 'high-tests' }
];

export default function FormatSelectorForm({ onFormatSelect }: FormatSelectorFormProps) {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [registerNumber, setRegisterNumber] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFormat && registerNumber.trim()) {
      onFormatSelect(selectedFormat, registerNumber.trim());
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Format Selector
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <Autocomplete
            options={formatOptions}
            getOptionLabel={(option) => option.label}
            value={formatOptions.find(option => option.value === selectedFormat) || null}
            onChange={(_, newValue) => setSelectedFormat(newValue?.value || null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Format"
                variant="outlined"
                sx={{ minWidth: 200 }}
                required
              />
            )}
            sx={{ minWidth: 200 }}
          />
          
          <TextField
            label="Register Number"
            variant="outlined"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            sx={{ minWidth: 200 }}
            required
          />
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!selectedFormat || !registerNumber.trim()}
            sx={{ minWidth: 120 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
