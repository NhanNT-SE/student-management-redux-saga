import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { studentApi } from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log('Failed to get student info', error);
      }
    })();
  }, [studentId]);
  const handleStudentFormSubmit = (formValue: Student) => {};
  const isEdit = Boolean(studentId);
  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;
  return (
    <Box>
      <Link to="/admin/student" style={{ textDecoration: 'none' }}>
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> &nbsp; Back to student list
        </Typography>
      </Link>
      <Typography variant="h4"> {isEdit ? 'Update student' : 'Add new student'} </Typography>
      {!isEdit ||
        (Boolean(student) && (
          <Box mt={3}>
            <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
          </Box>
        ))}
    </Box>
  );
}
