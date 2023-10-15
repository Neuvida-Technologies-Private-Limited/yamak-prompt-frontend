import React, { useState } from 'react';
import { HiPlus } from 'react-icons/hi';

import { Button, Input, Text } from 'components/common';
import {
  ButtonSizes,
  ButtonVariants,
  TextVariants,
  Workspace,
} from 'utils/constants';

interface AddVariableProps {
  onAddVariable: (variableName: string, variableValue: string) => void;
}

const AddVariable: React.FC<AddVariableProps> = ({ onAddVariable }) => {
  const [variableRows, setVariableRows] = useState<number[]>([]);
  const [rowStates, setRowStates] = useState<
    { variableName: string; variableValue: string }[]
  >([]);
  const initialRowState = { variableName: '', variableValue: '' };

  const handleAddRow = () => {
    const newRowId = variableRows.length;
    setVariableRows([...variableRows, newRowId]);
    setRowStates([...rowStates, initialRowState]);
  };

  const handleVariableNameChange = (value: string, rowId: number) => {
    const newStates = [...rowStates];
    newStates[rowId].variableName = value;
    setRowStates(newStates);
  };

  const handleVariableValueChange = (value: string, rowId: number) => {
    const newStates = [...rowStates];
    newStates[rowId].variableValue = value;
    setRowStates(newStates);
  };

  function submitHandler(event: React.FormEvent, rowId: number) {
    event.preventDefault();

    const { variableName, variableValue } = rowStates[rowId];
    onAddVariable(variableName, variableValue);
  }

  return (
    <div className="w-full">
      <Button
        size={ButtonSizes.SMALL}
        name={Workspace.AddVariable}
        icon={<HiPlus />}
        onClick={handleAddRow}
        variant={ButtonVariants.OUTLINED}
      />
      <div className="mt-2">
        {variableRows.length === 0 ? (
          <Text variant={TextVariants.SMALL} children={Workspace.NoVariables} />
        ) : (
          variableRows.map(rowId => (
            <form
              key={rowId}
              onKeyDown={e => {
                if (e.key === 'Enter') submitHandler(e, rowId);
              }}
            >
              <div className="flex bg-primary50 border-b-2 border-white w-full">
                <Input
                  id={`variableName-${rowId}`}
                  name={`variableName-${rowId}`}
                  placeholder={'Enter Variable'}
                  onChange={value => handleVariableNameChange(value, rowId)}
                  variant={'default'}
                  value={rowStates[rowId].variableName}
                />
                <Input
                  id={`variableValue-${rowId}`}
                  name={`variableValue-${rowId}`}
                  placeholder={'Enter Value'}
                  onChange={value => handleVariableValueChange(value, rowId)}
                  variant={'default'}
                  value={rowStates[rowId].variableValue}
                />
              </div>
            </form>
          ))
        )}
      </div>
    </div>
  );
};

export default AddVariable;
