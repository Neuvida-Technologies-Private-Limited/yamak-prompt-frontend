import React, { SetStateAction, Dispatch, useState } from 'react';
import { message } from 'antd';
import { useRecoilState } from 'recoil';

import { Input, Modal, Select } from 'components/common';
import { Workspace, InputVariants } from 'utils/constants';
import { keyOptionsState } from 'middleware/state';
import { isWorkspaceTitleValidated } from 'utils/validations';

interface UpdateModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  heading: string;
  modelKey: string;
  updateWorkspace: (update: any, id: string) => Promise<boolean | undefined>;
  id: string;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  showModal,
  setShowModal,
  heading,
  modelKey,
  updateWorkspace,
  id,
}) => {
  const [optionsState] = useRecoilState(keyOptionsState);
  const [updatedData, setUpdatedData] = useState({
    title: heading,
    model_key: modelKey,
  });
  const [updatedTitleError, setUpdatedTitleError] = useState('');
  const { options } = optionsState;

  const handleTitleChange = (value: string) => {
    // Update the title in the updatedData state
    setUpdatedData({ ...updatedData, title: value });
  };
  const handleSelectChange = (model_key: string) => {
    setUpdatedData({ ...updatedData, model_key: model_key });
  };

  const handleUpdateWorkspace = async (updatedData: any, id: string) => {
    if (isWorkspaceTitleValidated(updatedData.title) === '') {
      const res = await updateWorkspace(updatedData, id);
      if (res) {
        setShowModal(false);
      } else {
        message.error('Error in updating workspace');
      }
    } else {
      setUpdatedTitleError('Title is required !');
    }
  };

  return (
    <div>
      <Modal
        title={Workspace.UpdateWorkspace}
        centered={true}
        isOpen={showModal}
        cancelModalHandler={() => setShowModal(false)}
        okText={Workspace.Update}
        className="createWorkspace" //TODO: Will discuss that without classname , how to implement only one button
        sumbitHandler={() => handleUpdateWorkspace(updatedData, id)}
      >
        <div className="flex flex-col">
          <p className="text-gray500 pb-3">{Workspace.Subhead3}</p>
          <label htmlFor="" className="pl-2 font-poppins text-gray300 pb-1">
            {Workspace.Name}
          </label>
          <Input
            id={Workspace.Name}
            name={Workspace.Name}
            onChange={handleTitleChange}
            value={updatedData.title}
            variant={InputVariants.Filled}
            error={updatedTitleError}
          />
          <label htmlFor="" className="pl-2 font-poppins text-gray300 pb-1">
            {Workspace.SelectKey}
          </label>
          <Select
            options={options}
            value={updatedData.model_key}
            onChange={handleSelectChange}
            className="filled w-full"
            size="large"
          />
        </div>
      </Modal>
    </div>
  );
};

export default UpdateModal;
