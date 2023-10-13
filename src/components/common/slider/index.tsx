import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface SliderProps {
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  defaultValue: number | number[] | undefined;
  step?: number | null | undefined;
  value?: number;
}

const Index: React.FC<SliderProps> = ({
  onValueChange,
  min,
  max,
  defaultValue,
  step,
  value,
}) => {
  // const [Value, setValue] = useState<number>(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      onValueChange(newValue);
    }
  };
  return (
    <Box className="w-full">
      <Slider
        aria-label=""
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        value={value}
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={step}
      />
    </Box>
  );
};

export default Index;
