'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { Print } from '@mui/icons-material';
import { Student } from './Profile';

interface TestsProps {
  student: Student;
}

interface TestsData {
  regno: string;
  tests: any[];
}

export default function Tests({ student }: TestsProps) {
  const [testsData, setTestsData] = useState<TestsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/inmates/${student.studentNumber}/tests`);
        if (response.ok) {
          const data = await response.json();
          setTestsData(data);
        } else {
          throw new Error('Failed to fetch tests');
        }
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch tests');
      } finally {
        setLoading(false);
      }
    };

    fetchTestsData();
  }, [student.studentNumber]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading tests data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Error loading tests: {error}
        </Alert>
      </Box>
    );
  }

  if (!testsData) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">
          No tests data available for this inmate.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Print />}
          onClick={handlePrint}
          size="small"
        >
          Print Tests
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testsData.tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.name}</TableCell>
                <TableCell>{test.subject}</TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    {test.score}/{test.maxScore}
                  </Typography>
                </TableCell>
                <TableCell>{test.date}</TableCell>
                <TableCell>
                  <Chip
                    label={test.type}
                    color={test.type === 'high' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
