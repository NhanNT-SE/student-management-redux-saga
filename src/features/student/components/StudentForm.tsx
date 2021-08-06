import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
export interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValue: Student) => void;
}

export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValue,
  });
  return <div></div>;
}
