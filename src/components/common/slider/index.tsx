import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface SliderProps {
  onValueChange: (value: number) => void;
  min: number;
  max: number;
}

const Index: React.FC<SliderProps> = ({ onValueChange, min, max }) => {
  const [value, setValue] = useState<number>(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    onValueChange(newValue as number);
  };

  return (
    <Box className="w-full">
      <Slider
        aria-label=""
        defaultValue={0}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        value={typeof value === 'number' ? value : 0}
        min={min}
        max={max}
      />
    </Box>
  );
};

export default Index;
