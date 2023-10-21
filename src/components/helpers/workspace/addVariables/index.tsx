import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { HiPlus } from 'react-icons/hi';

import { Button, Input, Text } from 'components/common';
import {
  ButtonSizes,
  ButtonVariants,
  TextVariants,
  Workspace,
} from 'utils/constants';
import { generateOutputState, variablesState } from 'middleware/state';
import { Variables } from 'types';

interface AddVariableProps {
  // onAddVariable: (variableName: string, variableValue: string) => void;
}

const AddVariable: React.FC<AddVariableProps> = () => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);

  const [variableRows, setVariableRows] = useState<number[]>([]);
  const [rowStates, setRowStates] = useState<
    { variableName: string; variableValue: string }[]
  >([]);
  const initialRowState = { variableName: '', variableValue: '' };

  const { variables } = outputState;

  const handleAddRow = () => {
    const newRowId = variableRows.length;
    setVariableRows([...variableRows, newRowId]);
    setRowStates([...rowStates, initialRowState]);
  };

  const handleVariableNameChange = (variableName: string, rowId: number) => {
    const newStates = [...rowStates];
    newStates[rowId].variableName = variableName;
    setRowStates(newStates);
  };

  const handleVariableValueChange = (variableValue: string, rowId: number) => {
    const newStates = [...rowStates];
    newStates[rowId].variableValue = variableValue;
    setRowStates(newStates);
  };
  const handleSaveVariables = () => {
    // Create a dictionary of variables from rowStates
    const newVariables: Variables = {};
    rowStates.forEach(rowState => {
      const { variableName, variableValue } = rowState;
      if (variableName && variableValue) {
        newVariables[variableName] = variableValue;
      }
    });

    // Update the output state with the new variables using the previous state callback
    setOutputState(prevState => ({
      ...prevState,
      variables: newVariables,
    }));
  };

  return (
    <div className="w-full h-full py-2">
      <div className="w-full justify-between flex">
        <Button
          size={ButtonSizes.SMALL}
          name={Workspace.AddVariable}
          icon={<HiPlus />}
          onClick={handleAddRow}
          variant={ButtonVariants.OUTLINED}
        />
        <Button
          size={ButtonSizes.SMALL}
          name={'save'}
          onClick={handleSaveVariables}
          variant={ButtonVariants.SECONDARY_LINK}
        />
      </div>
      <div className="mt-2 h-full overflow-y-scroll">
        {variableRows.length === 0 ? (
          <Text variant={TextVariants.SMALL} children={Workspace.NoVariables} />
        ) : (
          variableRows.map(rowId => (
            <form key={rowId}>
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
