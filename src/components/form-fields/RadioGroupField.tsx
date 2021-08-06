import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  values: number | string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  disabled?: boolean;
  options: RadioOption[];
}
export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl margin="normal" disabled={disabled} component="fieldset" error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.values}
            value={option.values}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
