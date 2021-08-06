import { Box, Button } from '@material-ui/core';
import InputField from 'components/form-fields/InputField';
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
  const handleFormSubmit = (formValue: Student) => {
    console.log(formValue);
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* FORM FIELDS    */}
        <InputField name="name" control={control} label="Full name" />
        <InputField name="age" control={control} label="Age" />
        <InputField name="mark" control={control} label="Mark" />
        <InputField name="gender" control={control} label="Gender" />
        <InputField name="city" control={control} label="City" />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
