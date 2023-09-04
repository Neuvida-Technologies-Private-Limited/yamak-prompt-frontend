import React from 'react';
import TextField from '@mui/material/TextField';

interface StyledInputProps {
  label: string;
  placeholder: string;
  className?: string;
}

const styledInput: React.FC<StyledInputProps> = ({
  label,
  placeholder,
  className,
}) => {
  return (
    <TextField
      id="outlined-textarea fullWidth"
      label={label}
      placeholder={placeholder}
      className={className}
      multiline
      focused
    />
  );
};

export default styledInput;
