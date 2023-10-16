import React, { useEffect, useState } from 'react';

import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';

import { promptModalState } from 'middleware/state/library';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipContainer = () => {
  const [input, setInput] = useState('');
  const [{ tags }, setPromptState] = useRecoilState(promptModalState);
  const [chipData, setChipData] = React.useState<ChipData[]>([]);
  const maxChipLength = 100;

  function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);

    if (
      event.target.value.at(-1) === ' ' &&
      event.target.value.length <= maxChipLength + 1
    ) {
      setChipData(prev => [...prev, { key: Date.now(), label: input }]);
      setInput('');
    }
  }

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  useEffect(() => {
    const tags = chipData.map(chip => chip.label).join(', ');
    setPromptState(old => ({ ...old, tags }));
  }, [chipData, setPromptState]);

  useEffect(() => {
    if (tags === '') setChipData([]);
  }, [tags]);

  return (
    <div className="font-poppins flex flex-col my-4">
      {chipData.length !== 5 && (
        <>
          <label className="pl-2 text-gray300">Enter tags (optional)</label>
          <input
            onChange={inputChangeHandler}
            value={input}
            disabled={chipData.length === 5}
            className="bg-gray50 rounded-lg px-4 py-2 focus:outline-0"
          />
        </>
      )}
      <div className="flex flex-wrap mt-2">
        {chipData.map(data => {
          return (
            <ListItem key={data.key}>
              <Chip
                label={data.label}
                className="!font-poppins"
                onDelete={handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </div>
    </div>
  );
};

export default ChipContainer;
