import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { HiPlus } from 'react-icons/hi';

import { Button, Input, Text } from 'components/common';
import {
  ButtonSizes,
  ButtonVariants,
  InputVariants,
  TextVariants,
  Workspace,
} from 'utils/constants';
import {
  generateOutputState,
  variablesRowNumberState,
  variablesRowState,
} from 'middleware/state';
import { message } from 'antd';

interface AddVariableProps {
  // onAddVariable: (variableName: string, variableValue: string) => void;
}

const AddVariable: React.FC<AddVariableProps> = () => {
  const [outputState, setOutputState] = useRecoilState(generateOutputState);
  const [rowStates, setRowStates] = useRecoilState(variablesRowState);
  const [variableRows, setVariableRows] = useRecoilState(
    variablesRowNumberState
  );

  const initialRowState = { variableName: '', variableValue: '' };

  const { variables } = outputState;

  const handleAddRow = () => {
    const newRowId = variableRows.length;
    setVariableRows([...variableRows, newRowId]);
    setRowStates([...rowStates, initialRowState]);
  };

  const handleVariableNameChange = (value: string, rowId: number) => {
    const newStates = [...rowStates];
    newStates[rowId] = {
      ...newStates[rowId],
      variableName: value,
    };
    setRowStates(newStates);
  };

  const handleVariableValueChange = (value: string, rowId: number) => {
    const newStates = [...rowStates];
    newStates[rowId] = {
      ...newStates[rowId],
      variableValue: value,
    };
    setRowStates(newStates);
  };
  const handleSaveVariables = () => {
    debugger;
    const newVariables = { ...variables };
    let hasError = false;

    if (rowStates.length === 0) {
      message.warning('No variables added');
      return;
    }

    rowStates.forEach(rowState => {
      const { variableName, variableValue } = rowState;

      if (variableName && variableValue) {
        newVariables[variableName] = variableValue;
      } else {
        hasError = true;
      }
    });

    if (hasError) {
      message.error(
        'Please provide both variable name and value for all variables.'
      );
    } else {
      setOutputState(old => ({
        ...old,
        variables: newVariables,
      }));
      message.success('Variable(s) added');
    }
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
          name={Workspace.Save}
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
                  variant={InputVariants.Default}
                  value={rowStates[rowId].variableName}
                />
                <Input
                  id={`variableValue-${rowId}`}
                  name={`variableValue-${rowId}`}
                  placeholder={'Enter Value'}
                  onChange={value => handleVariableValueChange(value, rowId)}
                  variant={InputVariants.Default}
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
