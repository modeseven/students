'use client';

import React from 'react';
import { Box } from '@mui/material';
import { Student } from './Profile';
import Transcript from './Transcript';
import Reviews from './Reviews';
import Interview from './Interview';
import Exemptions from './Exemptions';
import Tests from './Tests';

interface EducationTabsProps {
  student: Student;
  activeTab: number;
}

export default function EducationTabs({ student, activeTab }: EducationTabsProps) {
  return (
    <Box sx={{ 
      pt: 2,
      px: 2
    }}>
      {/* Only render the active subtab component for lazy loading */}
      {activeTab === 0 && <Transcript student={student} />}
      {activeTab === 1 && <Reviews student={student} />}
      {activeTab === 2 && <Interview student={student} />}
      {activeTab === 3 && <Exemptions student={student} />}
      {activeTab === 4 && <Tests student={student} />}
    </Box>
  );
}
