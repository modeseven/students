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
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { Print } from '@mui/icons-material';
import { Student } from './Profile';

interface TranscriptProps {
  student: Student;
}

interface TranscriptData {
  regno: string;
  gpa: number;
  currentCourses: any[];
  completedCourses: any[];
  allCourses: any[];
  tests: any[];
  reviews: any[];
  interview: any;
}

export default function Transcript({ student }: TranscriptProps) {
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscriptData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/inmates/${student.studentNumber}/transcript`);
        if (response.ok) {
          const data = await response.json();
          setTranscriptData(data);
        } else {
          throw new Error('Failed to fetch transcript');
        }
      } catch (err) {
        console.error('Error fetching transcript:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch transcript');
      } finally {
        setLoading(false);
      }
    };

    fetchTranscriptData();
  }, [student.studentNumber]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading transcript data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Error loading transcript: {error}
        </Alert>
      </Box>
    );
  }

  if (!transcriptData) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">
          No transcript data available for this inmate.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Education Information Table */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Education Information</Typography>
        <Button
          variant="outlined"
          startIcon={<Print />}
          onClick={handlePrint}
          size="small"
        >
          Print Transcript
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Facility</TableCell>
              <TableCell>Assignment</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Stop Date</TableCell>
              <TableCell>Stop Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Sample Facility</TableCell>
              <TableCell>Student Assignment</TableCell>
              <TableCell>2023-09-01</TableCell>
              <TableCell>08:00 AM</TableCell>
              <TableCell>2024-06-15</TableCell>
              <TableCell>03:00 PM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Education Courses Table */}
      <Typography variant="h5" gutterBottom>Education Courses</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sub-Facility</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Stop Date</TableCell>
              <TableCell>Event AC</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transcriptData.currentCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>Sub-Facility A</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>2023-09-01</TableCell>
                <TableCell>2024-06-15</TableCell>
                <TableCell>AC001</TableCell>
                <TableCell>Level {course.credits}</TableCell>
                <TableCell>{course.credits * 3}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* High Test Scores Table */}
      <Typography variant="h5" gutterBottom>High Test Scores</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test</TableCell>
              <TableCell>Subtest</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Test Date</TableCell>
              <TableCell>Test Facility</TableCell>
              <TableCell>Form State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transcriptData.tests.filter((test: any) => test.type === 'high').map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.name}</TableCell>
                <TableCell>{test.subject}</TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    {test.score}/{test.maxScore}
                  </Typography>
                </TableCell>
                <TableCell>{test.date}</TableCell>
                <TableCell>Test Facility A</TableCell>
                <TableCell>Complete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
