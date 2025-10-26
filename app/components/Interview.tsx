'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Button
} from '@mui/material';
import { Print } from '@mui/icons-material';
import { Student } from './Profile';

interface InterviewProps {
  student: Student;
}

export default function Interview({ student }: InterviewProps) {
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
          Print Interview
        </Button>
      </Box>
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Interview Details</Typography>
              <Typography><strong>Date:</strong> {student.interview.date}</Typography>
              <Typography><strong>Interviewer:</strong> {student.interview.interviewer}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography><strong>Status:</strong></Typography>
                <Chip
                  label={student.interview.status}
                  color={student.interview.status === 'completed' ? 'success' : 'warning'}
                  size="small"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="h6" gutterBottom>Interview Notes</Typography>
              <Typography variant="body1" paragraph>
                {student.interview.notes}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Recommendations</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {student.interview.recommendations.map((rec, index) => (
                  <Typography key={index} variant="body2">
                    • {rec}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
