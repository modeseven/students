'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { Search, Upload, PersonAdd } from '@mui/icons-material';

export default function LoadInmate() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Load Inmate
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Add new inmates to the system or load existing inmate data
        </Typography>

        {/* Quick Search */}
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Quick Search
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Search by Name, ID, or SSN"
                variant="outlined"
                size="small"
                placeholder="Enter inmate details..."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                startIcon={<Search />}
                fullWidth
                sx={{ height: '40px' }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Action Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonAdd sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">
                    Add New Inmate
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Manually enter inmate information to create a new profile in the system.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Personal Information
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Booking Details
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Medical Information
                </Typography>
                <Typography variant="body2">
                  • Contact Information
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" fullWidth>
                  Start New Inmate
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Upload sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">
                    Bulk Import
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload a CSV or Excel file to import multiple inmates at once.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • CSV/Excel Support
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Data Validation
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Error Reporting
                </Typography>
                <Typography variant="body2">
                  • Preview Before Import
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" fullWidth>
                  Upload File
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No recent inmate loading activity
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
}
