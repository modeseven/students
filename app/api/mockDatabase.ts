// Mock database with 5 unique inmates and their educational data
export const mockDatabase = {
  inmates: [
    {
      regno: '44444-444',
      firstName: 'John',
      lastName: 'Smith',
      facility: 'Danbury FCI',
      courses: [
        { id: '1', name: 'Basic Mathematics', teacher: 'Dr. Smith', grade: 'B+', credits: 3, status: 'completed' },
        { id: '2', name: 'English Composition', teacher: 'Ms. Davis', grade: 'A-', credits: 3, status: 'completed' },
        { id: '3', name: 'Life Skills', teacher: 'Mr. Wilson', grade: 'A', credits: 2, status: 'completed' },
        { id: '4', name: 'Vocational Training', teacher: 'Prof. Brown', grade: 'B', credits: 4, status: 'current' },
        { id: '5', name: 'Substance Abuse Counseling', teacher: 'Dr. Lee', grade: 'A-', credits: 2, status: 'current' },
      ],
      tests: [
        { id: '1', name: 'GED Practice Test', subject: 'General', score: 85, maxScore: 100, date: '2024-01-15', type: 'standard' },
        { id: '2', name: 'Math Assessment', subject: 'Mathematics', score: 78, maxScore: 100, date: '2024-01-20', type: 'standard' },
        { id: '3', name: 'Reading Comprehension', subject: 'English', score: 92, maxScore: 100, date: '2024-01-25', type: 'standard' },
        { id: '4', name: 'Science Fundamentals', subject: 'Science', score: 81, maxScore: 100, date: '2024-01-30', type: 'standard' },
        { id: '5', name: 'Social Studies Exam', subject: 'History', score: 76, maxScore: 100, date: '2024-02-05', type: 'standard' },
        { id: '6', name: 'Algebra Basics', subject: 'Mathematics', score: 72, maxScore: 100, date: '2024-02-10', type: 'standard' },
        { id: '7', name: 'Grammar Test', subject: 'English', score: 88, maxScore: 100, date: '2024-02-15', type: 'standard' },
        { id: '8', name: 'Biology Assessment', subject: 'Science', score: 79, maxScore: 100, date: '2024-02-20', type: 'standard' },
        { id: '9', name: 'World History Quiz', subject: 'History', score: 83, maxScore: 100, date: '2024-02-25', type: 'quiz' },
        { id: '10', name: 'Geometry Test', subject: 'Mathematics', score: 75, maxScore: 100, date: '2024-03-01', type: 'standard' },
        { id: '11', name: 'Literature Analysis', subject: 'English', score: 90, maxScore: 100, date: '2024-03-05', type: 'standard' },
        { id: '12', name: 'Chemistry Basics', subject: 'Science', score: 77, maxScore: 100, date: '2024-03-10', type: 'standard' },
        { id: '13', name: 'US History Exam', subject: 'History', score: 84, maxScore: 100, date: '2024-03-15', type: 'standard' },
        { id: '14', name: 'Trigonometry Test', subject: 'Mathematics', score: 68, maxScore: 100, date: '2024-03-20', type: 'standard' },
        { id: '15', name: 'Writing Skills Assessment', subject: 'English', score: 86, maxScore: 100, date: '2024-03-25', type: 'standard' },
        { id: '16', name: 'Physics Concepts', subject: 'Science', score: 73, maxScore: 100, date: '2024-03-30', type: 'standard' },
        { id: '17', name: 'Government Test', subject: 'History', score: 80, maxScore: 100, date: '2024-04-05', type: 'standard' },
        { id: '18', name: 'Statistics Quiz', subject: 'Mathematics', score: 82, maxScore: 100, date: '2024-04-10', type: 'quiz' },
        { id: '19', name: 'Vocabulary Test', subject: 'English', score: 91, maxScore: 100, date: '2024-04-15', type: 'standard' },
        { id: '20', name: 'Earth Science Exam', subject: 'Science', score: 78, maxScore: 100, date: '2024-04-20', type: 'standard' },
        { id: '21', name: 'Economics Test', subject: 'History', score: 85, maxScore: 100, date: '2024-04-25', type: 'standard' },
        { id: '22', name: 'Calculus Basics', subject: 'Mathematics', score: 69, maxScore: 100, date: '2024-04-30', type: 'standard' },
        { id: '23', name: 'Poetry Analysis', subject: 'English', score: 87, maxScore: 100, date: '2024-05-05', type: 'standard' },
        { id: '24', name: 'Environmental Science', subject: 'Science', score: 81, maxScore: 100, date: '2024-05-10', type: 'standard' },
        { id: '25', name: 'Geography Quiz', subject: 'History', score: 79, maxScore: 100, date: '2024-05-15', type: 'quiz' },
        { id: '26', name: 'Pre-Calculus Test', subject: 'Mathematics', score: 74, maxScore: 100, date: '2024-05-20', type: 'standard' },
        { id: '27', name: 'Drama Literature', subject: 'English', score: 89, maxScore: 100, date: '2024-05-25', type: 'standard' },
        { id: '28', name: 'Astronomy Test', subject: 'Science', score: 76, maxScore: 100, date: '2024-05-30', type: 'standard' },
        { id: '29', name: 'Civics Exam', subject: 'History', score: 83, maxScore: 100, date: '2024-06-05', type: 'standard' },
        { id: '30', name: 'Probability Test', subject: 'Mathematics', score: 77, maxScore: 100, date: '2024-06-10', type: 'standard' },
        { id: '31', name: 'Shakespeare Analysis', subject: 'English', score: 92, maxScore: 100, date: '2024-06-15', type: 'standard' },
        { id: '32', name: 'Anatomy Quiz', subject: 'Science', score: 80, maxScore: 100, date: '2024-06-20', type: 'quiz' },
        { id: '33', name: 'Psychology Test', subject: 'History', score: 86, maxScore: 100, date: '2024-06-25', type: 'standard' },
        { id: '34', name: 'Linear Algebra', subject: 'Mathematics', score: 71, maxScore: 100, date: '2024-06-30', type: 'standard' },
        { id: '35', name: 'Modern Literature', subject: 'English', score: 88, maxScore: 100, date: '2024-07-05', type: 'standard' },
        { id: '36', name: 'Genetics Test', subject: 'Science', score: 82, maxScore: 100, date: '2024-07-10', type: 'standard' },
        { id: '37', name: 'Sociology Exam', subject: 'History', score: 84, maxScore: 100, date: '2024-07-15', type: 'standard' },
        { id: '38', name: 'Discrete Mathematics', subject: 'Mathematics', score: 75, maxScore: 100, date: '2024-07-20', type: 'standard' },
        { id: '39', name: 'Comparative Literature', subject: 'English', score: 90, maxScore: 100, date: '2024-07-25', type: 'standard' },
        { id: '40', name: 'Microbiology Quiz', subject: 'Science', score: 78, maxScore: 100, date: '2024-07-30', type: 'quiz' },
        { id: '41', name: 'Anthropology Test', subject: 'History', score: 81, maxScore: 100, date: '2024-08-05', type: 'standard' },
        { id: '42', name: 'Number Theory', subject: 'Mathematics', score: 73, maxScore: 100, date: '2024-08-10', type: 'standard' },
        { id: '43', name: 'Rhetoric Analysis', subject: 'English', score: 87, maxScore: 100, date: '2024-08-15', type: 'standard' },
        { id: '44', name: 'Botany Exam', subject: 'Science', score: 79, maxScore: 100, date: '2024-08-20', type: 'standard' },
        { id: '45', name: 'Philosophy Test', subject: 'History', score: 85, maxScore: 100, date: '2024-08-25', type: 'standard' },
        { id: '46', name: 'Differential Equations', subject: 'Mathematics', score: 68, maxScore: 100, date: '2024-08-30', type: 'standard' },
        { id: '47', name: 'Linguistics Quiz', subject: 'English', score: 91, maxScore: 100, date: '2024-09-05', type: 'quiz' },
        { id: '48', name: 'Zoology Test', subject: 'Science', score: 83, maxScore: 100, date: '2024-09-10', type: 'standard' },
        { id: '49', name: 'Art History Exam', subject: 'History', score: 88, maxScore: 100, date: '2024-09-15', type: 'standard' },
        { id: '50', name: 'Advanced Calculus', subject: 'Mathematics', score: 72, maxScore: 100, date: '2024-09-20', type: 'standard' },
        { id: '51', name: 'Critical Thinking Assessment', subject: 'English', score: 89, maxScore: 100, date: '2024-09-25', type: 'standard' },
        { id: '52', name: 'Marine Biology Test', subject: 'Science', score: 80, maxScore: 100, date: '2024-09-30', type: 'standard' },
        { id: '53', name: 'Music History Quiz', subject: 'History', score: 86, maxScore: 100, date: '2024-10-05', type: 'quiz' },
      ],
      reviews: [
        { id: '1', teacher: 'Dr. Smith', subject: 'Basic Mathematics', rating: 4, comment: 'Shows improvement in mathematical concepts and problem-solving skills.', date: '2024-01-20' },
        { id: '2', teacher: 'Ms. Davis', subject: 'English Composition', rating: 5, comment: 'Excellent writing ability and critical thinking skills. Very engaged in class discussions.', date: '2024-01-22' },
        { id: '3', teacher: 'Mr. Wilson', subject: 'Life Skills', rating: 4, comment: 'Demonstrates good leadership qualities and interpersonal skills.', date: '2024-01-19' },
      ],
      gpa: 3.2,
      interview: {
        id: '44444-444',
        date: '2024-02-15',
        interviewer: 'Dr. Sarah Miller',
        notes: 'Educational assessment for inmate 44444-444. Shows potential for continued education and rehabilitation. Demonstrates motivation to improve academic skills.',
        recommendations: [
          'Continue with vocational training program',
          'Consider advanced mathematics courses',
          'Explore GED preparation program'
        ],
        status: 'scheduled'
      }
    },
    {
      regno: '12345-678',
      firstName: 'Jane',
      lastName: 'Doe',
      facility: 'Danbury FCI',
      courses: [
        { id: '1', name: 'Advanced Mathematics', teacher: 'Dr. Johnson', grade: 'A', credits: 4, status: 'completed' },
        { id: '2', name: 'Creative Writing', teacher: 'Ms. Williams', grade: 'A+', credits: 3, status: 'completed' },
        { id: '3', name: 'Computer Programming', teacher: 'Mr. Chen', grade: 'B+', credits: 4, status: 'completed' },
        { id: '4', name: 'Business Management', teacher: 'Prof. Martinez', grade: 'A-', credits: 3, status: 'current' },
        { id: '5', name: 'Psychology', teacher: 'Dr. Thompson', grade: 'A', credits: 3, status: 'current' },
      ],
      tests: [
        { id: '1', name: 'SAT Practice Test', subject: 'General', score: 1250, maxScore: 1600, date: '2024-01-10', type: 'standard' },
        { id: '2', name: 'Advanced Math Test', subject: 'Mathematics', score: 95, maxScore: 100, date: '2024-01-18', type: 'standard' },
        { id: '3', name: 'Writing Assessment', subject: 'English', score: 88, maxScore: 100, date: '2024-01-28', type: 'standard' },
        { id: '4', name: 'Computer Science Exam', subject: 'Technology', score: 92, maxScore: 100, date: '2024-02-05', type: 'standard' },
      ],
      reviews: [
        { id: '1', teacher: 'Dr. Johnson', subject: 'Advanced Mathematics', rating: 5, comment: 'Exceptional mathematical ability and analytical thinking. Consistently performs above expectations.', date: '2024-01-18' },
        { id: '2', teacher: 'Ms. Williams', subject: 'Creative Writing', rating: 5, comment: 'Outstanding creative writing skills with unique voice and perspective. Shows great potential.', date: '2024-01-28' },
        { id: '3', teacher: 'Mr. Chen', subject: 'Computer Programming', rating: 4, comment: 'Strong logical thinking and problem-solving abilities. Quick learner with programming concepts.', date: '2024-02-05' },
      ],
      gpa: 3.8,
      interview: {
        id: '12345-678',
        date: '2024-02-20',
        interviewer: 'Dr. Michael Rodriguez',
        notes: 'High-performing student with exceptional academic abilities. Shows strong potential for college-level coursework and career advancement.',
        recommendations: [
          'Consider college preparation courses',
          'Explore advanced computer science programs',
          'Apply for academic scholarships'
        ],
        status: 'completed'
      }
    },
    {
      regno: '98765-432',
      firstName: 'Bob',
      lastName: 'Johnson',
      facility: 'Danbury FCI',
      courses: [
        { id: '1', name: 'Basic Reading', teacher: 'Ms. Adams', grade: 'C+', credits: 2, status: 'completed' },
        { id: '2', name: 'Basic Math', teacher: 'Mr. Taylor', grade: 'C', credits: 2, status: 'completed' },
        { id: '3', name: 'Job Readiness', teacher: 'Ms. Clark', grade: 'B-', credits: 2, status: 'completed' },
        { id: '4', name: 'Basic Computer Skills', teacher: 'Mr. White', grade: 'C+', credits: 2, status: 'current' },
        { id: '5', name: 'Anger Management', teacher: 'Dr. Green', grade: 'B', credits: 1, status: 'current' },
      ],
      tests: [
        { id: '1', name: 'Basic Skills Assessment', subject: 'General', score: 65, maxScore: 100, date: '2024-01-12', type: 'standard' },
        { id: '2', name: 'Reading Test', subject: 'English', score: 58, maxScore: 100, date: '2024-01-22', type: 'standard' },
        { id: '3', name: 'Math Basics', subject: 'Mathematics', score: 62, maxScore: 100, date: '2024-01-30', type: 'standard' },
      ],
      reviews: [
        { id: '1', teacher: 'Ms. Adams', subject: 'Basic Reading', rating: 3, comment: 'Making steady progress in reading comprehension. Needs continued practice and support.', date: '2024-01-22' },
        { id: '2', teacher: 'Mr. Taylor', subject: 'Basic Math', rating: 2, comment: 'Struggles with mathematical concepts but shows effort. Requires additional tutoring.', date: '2024-01-30' },
        { id: '3', teacher: 'Ms. Clark', subject: 'Job Readiness', rating: 3, comment: 'Demonstrates improvement in workplace skills and communication. Building confidence.', date: '2024-02-02' },
      ],
      gpa: 2.1,
      interview: {
        id: '98765-432',
        date: '2024-02-10',
        interviewer: 'Ms. Jennifer Foster',
        notes: 'Student requires additional support in basic academic skills. Shows motivation to improve but needs individualized attention.',
        recommendations: [
          'Continue with remedial education program',
          'Provide additional tutoring in mathematics',
          'Focus on building confidence and self-esteem'
        ],
        status: 'scheduled'
      }
    },
    {
      regno: '55555-555',
      firstName: 'Mike',
      lastName: 'Wilson',
      facility: 'Danbury FCI',
      courses: [
        { id: '1', name: 'Carpentry Fundamentals', teacher: 'Mr. Davis', grade: 'A-', credits: 4, status: 'completed' },
        { id: '2', name: 'Electrical Basics', teacher: 'Mr. Roberts', grade: 'B+', credits: 3, status: 'completed' },
        { id: '3', name: 'Blueprint Reading', teacher: 'Ms. Turner', grade: 'A', credits: 2, status: 'completed' },
        { id: '4', name: 'Advanced Carpentry', teacher: 'Mr. Davis', grade: 'A', credits: 4, status: 'current' },
        { id: '5', name: 'Safety Certification', teacher: 'Mr. Roberts', grade: 'A-', credits: 2, status: 'current' },
      ],
      tests: [
        { id: '1', name: 'Carpentry Skills Test', subject: 'Vocational', score: 88, maxScore: 100, date: '2024-01-14', type: 'practical' },
        { id: '2', name: 'Electrical Safety Exam', subject: 'Safety', score: 95, maxScore: 100, date: '2024-01-24', type: 'standard' },
        { id: '3', name: 'Blueprint Reading Test', subject: 'Technical', score: 92, maxScore: 100, date: '2024-02-01', type: 'standard' },
      ],
      reviews: [
        { id: '1', teacher: 'Mr. Davis', subject: 'Carpentry Fundamentals', rating: 5, comment: 'Excellent craftsmanship and attention to detail. Natural talent for woodworking.', date: '2024-01-14' },
        { id: '2', teacher: 'Mr. Roberts', subject: 'Electrical Basics', rating: 4, comment: 'Strong understanding of electrical concepts and safety protocols. Reliable worker.', date: '2024-01-24' },
        { id: '3', teacher: 'Ms. Turner', subject: 'Blueprint Reading', rating: 5, comment: 'Exceptional ability to read and interpret technical drawings. Shows leadership potential.', date: '2024-02-01' },
      ],
      gpa: 3.6,
      interview: {
        id: '55555-555',
        date: '2024-02-18',
        interviewer: 'Mr. Robert Kim',
        notes: 'Highly skilled in vocational trades with excellent work ethic. Shows strong potential for employment in construction industry.',
        recommendations: [
          'Complete advanced carpentry certification',
          'Apply for construction apprenticeship programs',
          'Consider starting own contracting business'
        ],
        status: 'completed'
      }
    },
    {
      regno: '11111-111',
      firstName: 'Sarah',
      lastName: 'Brown',
      facility: 'Danbury FCI',
      courses: [
        { id: '1', name: 'Art Therapy', teacher: 'Ms. Garcia', grade: 'A+', credits: 2, status: 'completed' },
        { id: '2', name: 'Music Appreciation', teacher: 'Mr. Jackson', grade: 'A', credits: 2, status: 'completed' },
        { id: '3', name: 'Creative Writing', teacher: 'Ms. Williams', grade: 'A-', credits: 3, status: 'completed' },
        { id: '4', name: 'Digital Art', teacher: 'Ms. Garcia', grade: 'A', credits: 3, status: 'current' },
        { id: '5', name: 'Poetry Workshop', teacher: 'Ms. Williams', grade: 'A+', credits: 2, status: 'current' },
      ],
      tests: [
        { id: '1', name: 'Art Portfolio Review', subject: 'Creative', score: 98, maxScore: 100, date: '2024-01-16', type: 'portfolio' },
        { id: '2', name: 'Creative Writing Assessment', subject: 'English', score: 94, maxScore: 100, date: '2024-01-26', type: 'standard' },
        { id: '3', name: 'Music Theory Test', subject: 'Arts', score: 89, maxScore: 100, date: '2024-02-03', type: 'standard' },
      ],
      reviews: [
        { id: '1', teacher: 'Ms. Garcia', subject: 'Art Therapy', rating: 5, comment: 'Exceptional artistic talent and emotional expression through art. Inspiring to other students.', date: '2024-01-16' },
        { id: '2', teacher: 'Mr. Jackson', subject: 'Music Appreciation', rating: 4, comment: 'Deep understanding of musical concepts and cultural significance. Very insightful.', date: '2024-02-03' },
        { id: '3', teacher: 'Ms. Williams', subject: 'Creative Writing', rating: 5, comment: 'Outstanding creative voice and storytelling ability. Shows great potential as a writer.', date: '2024-01-26' },
      ],
      gpa: 3.9,
      interview: {
        id: '11111-111',
        date: '2024-02-25',
        interviewer: 'Dr. Elizabeth Chen',
        notes: 'Highly creative individual with exceptional artistic abilities. Shows strong potential for careers in creative fields and art therapy.',
        recommendations: [
          'Explore art therapy certification programs',
          'Consider publishing creative works',
          'Apply for art scholarships and grants'
        ],
        status: 'scheduled'
      }
    }
  ]
};

// Helper function to get inmate by regno
export function getInmateByRegno(regno: string) {
  return mockDatabase.inmates.find(inmate => inmate.regno === regno);
}

// Helper function to get transcript data for an inmate
export function getTranscriptByRegno(regno: string) {
  const inmate = getInmateByRegno(regno);
  if (!inmate) return null;

  return {
    regno: inmate.regno,
    gpa: inmate.gpa,
    currentCourses: inmate.courses.filter(c => c.status === 'current'),
    completedCourses: inmate.courses.filter(c => c.status === 'completed'),
    allCourses: inmate.courses,
    tests: inmate.tests,
    reviews: inmate.reviews,
    interview: inmate.interview
  };
}

// Helper function to get tests data for an inmate
export function getTestsByRegno(regno: string) {
  const inmate = getInmateByRegno(regno);
  if (!inmate) return null;

  return {
    regno: inmate.regno,
    tests: inmate.tests
  };
}
