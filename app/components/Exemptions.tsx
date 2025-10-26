'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button
} from '@mui/material';
import { Print } from '@mui/icons-material';
import { Student } from './Profile';

interface ExemptionsProps {
  student: Student;
}

export default function Exemptions({ student }: ExemptionsProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Print />}
          onClick={handlePrint}
          size="small"
        >
          Print Exemptions
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary">
        No exemptions available for this student.
      </Typography>
    </Box>
  );
}
