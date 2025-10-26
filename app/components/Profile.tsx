'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  Avatar,
  Divider,
  Button
} from '@mui/material';
import { 
  School, 
  Gavel, 
  Security, 
  Balance, 
  Psychology, 
  AccountBalance,
  Business,
  Person,
  AccountCircle,
  Description,
  RateReview,
  Quiz,
  Warning
} from '@mui/icons-material';
import EducationTabs from './EducationTabs';
import { useInmateContext } from '../contexts/InmateContext';

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
      id={`student-tabpanel-${index}`}
      aria-labelledby={`student-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 0, px: 2, pb: 2 }}>{children}</Box>}
    </div>
  );
}

interface Student {
  id: string;
  name: string;
  studentNumber: string;
  grade: string;
  gpa: number;
  currentCourses: Course[];
  highTests: Test[];
  reviews: Review[];
  allTests: Test[];
  interview: Interview;
}

interface Course {
  id: string;
  name: string;
  teacher: string;
  grade: string;
  credits: number;
  status: 'current' | 'completed';
}

interface Test {
  id: string;
  name: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  type: 'high' | 'standard';
}

interface Review {
  id: string;
  teacher: string;
  subject: string;
  rating: number;
  comment: string;
  date: string;
}

interface Interview {
  id: string;
  date: string;
  interviewer: string;
  notes: string;
  recommendations: string[];
  status: 'scheduled' | 'completed' | 'pending';
}

interface ProfileProps {
  student: Student;
}

export default function Profile({ student }: ProfileProps) {
  const { tabStates, handleMainTabChange, handleEducationTabChange: contextHandleEducationTabChange } = useInmateContext();
  
  // Get current tab state for this student, default to 0 if not found
  const currentTabState = tabStates[student.id] || { mainTab: 0, educationTab: 0 };
  const tabValue = currentTabState.mainTab;
  const educationTabValue = currentTabState.educationTab;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    handleMainTabChange(student.id, newValue);
  };

  const handleEducationTabChange = (event: React.SyntheticEvent, newValue: number) => {
    contextHandleEducationTabChange(student.id, newValue);
  };


  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header with Tabs and Student Info */}
      <Box sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 10, 
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Paper elevation={3} sx={{ borderRadius: 0 }}>
          {/* Main Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="student profile tabs" 
              variant="scrollable" 
              scrollButtons="auto"
              sx={{ 
                minHeight: 'auto',
                '& .MuiTab-root': {
                  minHeight: 48,
                  textTransform: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  minWidth: 'auto',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                },
                '& .MuiTab-root.Mui-selected': {
                  color: 'primary.main',
                  backgroundColor: 'action.selected',
                }
              }}
            >
              <Tab 
                icon={<AccountCircle />} 
                iconPosition="start" 
                label="Profile" 
                sx={{ minHeight: 'auto', py: 1 }}
              />
              <Tab 
                icon={<School />} 
                iconPosition="start" 
                label="Education" 
                sx={{ minHeight: 'auto', py: 1 }}
              />
              <Tab 
                icon={<Gavel />} 
                iconPosition="start" 
                label="Sentencing" 
                sx={{ minHeight: 'auto', py: 1 }}
              />
              <Tab 
                icon={<Security />} 
                iconPosition="start" 
                label="Designations/Custody" 
                sx={{ minHeight: 'auto', py: 1 }}
              />
              <Tab 
                icon={<Balance />} 
                iconPosition="start" 
                label="Remedies" 
                sx={{ minHeight: 'auto', py: 1 }}
              />
              <Tab 
                icon={<Psychology />} 
                iconPosition="start" 
                label="Discipline" 
                sx={{ minHeight: 'auto', py: 1 }}
              />
              <Tab 
                icon={<AccountBalance />} 
                iconPosition="start" 
                label="Financial" 
                sx={{ minHeight: 'auto', py: 1 }}
              />
            </Tabs>
          </Box>

          {/* Student Header */}
          <Box sx={{ p: 1.5, bgcolor: 'rgb(220, 224, 230)', color: 'rgb(33, 37, 41)' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar sx={{ width: 60, height: 60, bgcolor: 'rgb(28, 37, 54)', color: 'white' }}>
                  <AccountCircle sx={{ fontSize: 40 }} />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h5">{student.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1">{student.studentNumber}</Typography>
                  <Chip
                    icon={<Business />}
                    label="DAN- Danbury FCI"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ px: 1 }}
                  />
                </Box>
              </Grid>
              <Grid item>
                <Chip
                  icon={<Warning />}
                  label="WitSec"
                  color="error"
                  variant="filled"
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    px: 2,
                    py: 1,
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    '& .MuiChip-icon': {
                      color: 'white',
                      fontSize: '1.2rem'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Education Sub-tabs - Only show when Education tab is selected */}
          {tabValue === 1 && (
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              bgcolor: 'background.paper'
            }}>
              <Tabs 
                value={educationTabValue} 
                onChange={handleEducationTabChange} 
                aria-label="education tabs" 
                variant="scrollable" 
                scrollButtons="auto"
                sx={{ 
                  minHeight: 'auto',
                  '& .MuiTab-root': {
                    minHeight: 48,
                    textTransform: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    minWidth: 'auto',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  },
                  '& .MuiTab-root.Mui-selected': {
                    color: 'primary.main',
                    backgroundColor: 'action.selected',
                  }
                }}
              >
                <Tab 
                  icon={<Description />} 
                  iconPosition="start" 
                  label="Transcript" 
                  sx={{ minHeight: 'auto', py: 1 }}
                />
                <Tab 
                  icon={<RateReview />} 
                  iconPosition="start" 
                  label="Reviews" 
                  sx={{ minHeight: 'auto', py: 1 }}
                />
                <Tab 
                  icon={<Person />} 
                  iconPosition="start" 
                  label="Interview" 
                  sx={{ minHeight: 'auto', py: 1 }}
                />
                <Tab 
                  icon={<School />} 
                  iconPosition="start" 
                  label="Exemptions" 
                  sx={{ minHeight: 'auto', py: 1 }}
                />
                <Tab 
                  icon={<Quiz />} 
                  iconPosition="start" 
                  label="Tests" 
                  sx={{ minHeight: 'auto', py: 1 }}
                />
              </Tabs>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Scrollable Content Area */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>

      {/* Profile Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ pt: 0, px: 2, pb: 2 }}>
          <Typography variant="h5" gutterBottom>Student Profile</Typography>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Basic Information</Typography>
                  <Typography><strong>Name:</strong> {student.name}</Typography>
                  <Typography><strong>Student Number:</strong> {student.studentNumber}</Typography>
                  <Typography><strong>Grade:</strong> {student.grade}</Typography>
                  <Typography><strong>GPA:</strong> {student.gpa}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Current Status</Typography>
                  <Typography><strong>Current Courses:</strong> {student.currentCourses.length}</Typography>
                  <Typography><strong>High Test Scores:</strong> {student.highTests.length}</Typography>
                  <Typography><strong>Reviews:</strong> {student.reviews.length}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Education Tab */}
      <TabPanel value={tabValue} index={1}>
        <EducationTabs student={student} activeTab={educationTabValue} />
      </TabPanel>

      {/* Sentencing Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ pt: 0, px: 2, pb: 2 }}>
          <Typography variant="h5" gutterBottom>Sentencing Information</Typography>
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Sentencing information will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Designations/Custody Tab */}
      <TabPanel value={tabValue} index={3}>
        <Box sx={{ pt: 0, px: 2, pb: 2 }}>
          <Typography variant="h5" gutterBottom>Designations/Custody</Typography>
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Designations and custody information will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Remedies Tab */}
      <TabPanel value={tabValue} index={4}>
        <Box sx={{ pt: 0, px: 2, pb: 2 }}>
          <Typography variant="h5" gutterBottom>Remedies</Typography>
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Remedies information will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Discipline Tab */}
      <TabPanel value={tabValue} index={5}>
        <Box sx={{ pt: 0, px: 2, pb: 2 }}>
          <Typography variant="h5" gutterBottom>Discipline</Typography>
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Discipline information will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>

      {/* Financial Tab */}
      <TabPanel value={tabValue} index={6}>
        <Box sx={{ pt: 0, px: 2, pb: 2 }}>
          <Typography variant="h5" gutterBottom>Financial</Typography>
          <Card>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                Financial information will be displayed here.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </TabPanel>
      </Box>
    </Box>
  );
}

// Export types for use in other components
export type { Student, Course, Test, Review, Interview };
