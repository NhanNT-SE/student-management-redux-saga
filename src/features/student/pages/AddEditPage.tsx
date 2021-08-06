import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { studentApi } from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<Student>();
  const history = useHistory();
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
  const handleStudentFormSubmit = async (formValue: Student) => {
    console.log('Submit', formValue);
    if (isEdit) {
      await studentApi.update(formValue);
    } else {
      await studentApi.add(formValue);
    }
    toast.success('Save student successfully!');
    history.push('/admin/student');
  };
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
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
