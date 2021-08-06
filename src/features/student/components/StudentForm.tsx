import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/form-fields';
import { citySelectors } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';

export interface StudentFormProps {
  initialValue?: Student;
  onSubmit?: (formValue: Student) => void;
}
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;
      const parts = value.split(' ') || [];
      return parts.filter((x) => !!x).length >= 2;
    }),
  age: yup
    .number()
    .positive('Please enter a positive number.')
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .integer('Please enter an integer.')
    .required('Please enter age.')
    .typeError('Please enter a valid number.'),
  mark: yup
    .number()
    .positive()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .required('Please enter mark')
    .typeError('Please enter a valid number.'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select either male or female')
    .required('Please select gender.'),
  city: yup.string().required('Please select city.'),
});
export default function StudentForm({ initialValue, onSubmit }: StudentFormProps) {
  const [err, setErr] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const cityOptions = useAppSelector(citySelectors.selectCityOptions);
  const handleFormSubmit = async (formValue: Student) => {
    try {
      setErr('');
      await onSubmit?.(formValue);
    } catch (error) {
      setErr(error.message);
    }
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* FORM FIELDS    */}
        <InputField name="name" control={control} label="Full name" />

        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', values: 'male' },
            { label: 'Female', values: 'female' },
          ]}
        />
        <InputField name="age" type="number" control={control} label="Age" />
        <InputField name="mark" type="number" control={control} label="Mark" />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}
        {err && <Alert severity="error">{err}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
