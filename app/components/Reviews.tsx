'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { Print } from '@mui/icons-material';
import { Student } from './Profile';

interface ReviewsProps {
  student: Student;
}

interface ReviewsData {
  regno: string;
  reviews: any[];
}

export default function Reviews({ student }: ReviewsProps) {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Since reviews are included in transcript data, we'll fetch that
        const response = await fetch(`/api/inmates/${student.studentNumber}/transcript`);
        if (response.ok) {
          const data = await response.json();
          setReviewsData({
            regno: data.regno,
            reviews: data.reviews
          });
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsData();
  }, [student.studentNumber]);

  const handlePrint = () => {
    window.print();
  };

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading reviews data...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Error loading reviews: {error}
        </Alert>
      </Box>
    );
  }

  if (!reviewsData) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning">
          No reviews data available for this inmate.
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
          Print Reviews
        </Button>
      </Box>
      <Grid container spacing={1}>
        {reviewsData.reviews.map((review) => (
          <Grid item xs={12} md={6} key={review.id}>
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">{review.teacher}</Typography>
                  <Typography variant="body2" color="text.secondary">{review.date}</Typography>
                </Box>
                <Typography color="text.secondary" gutterBottom>{review.subject}</Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {getRatingStars(review.rating)}
                </Typography>
                <Typography variant="body2">{review.comment}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
