'use client';

import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

interface TranscriptViewerProps {
  registerNumber: string;
}

export default function TranscriptViewer({ registerNumber }: TranscriptViewerProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Transcript Viewer
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Register Number: {registerNumber}
        </Typography>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Transcript content for register number {registerNumber} will be displayed here.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
