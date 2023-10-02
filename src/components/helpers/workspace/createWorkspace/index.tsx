import React, { useState, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { Button, Input, Modal, Select } from 'components/common';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { createWorkspaceState, keyManagementState } from 'middleware/state';
import {
  isWorkspaceTitleValidated,
  isWorkspaceModalKeyValidated,
} from 'utils/validations';
import { GetKeyList } from 'middleware/api';

interface OptionItems {
  value: string;
  label: string;
}

interface CreateWorkspaceProps {
  btnName: string;
  className?: string;
}

const App: React.FC<CreateWorkspaceProps> = ({ btnName, className }) => {
  const [state, setState] = useRecoilState(createWorkspaceState);
  const [keystate, setKeyState] = useRecoilState(keyManagementState);
  const resetState = useResetRecoilState(createWorkspaceState);

  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState<OptionItems[]>([]);

  const { title, titleError, modal_key, modal_keyError } = state;

  const handleTitleChange = (value: string) => {
    setState(old => ({
      ...old,
      title: value,
      titleError: isWorkspaceTitleValidated(value),
    }));
  };

  const handleSelectChange = (value: string) => {
    setState(old => ({
      ...old,
      modal_key: value,
      modal_keyError: isWorkspaceModalKeyValidated(value),
    }));
  };

  useEffect(() => {
    const getKeyList = async () => {
      try {
        const res = await GetKeyList();
        setKeyState(old => ({
          ...old,
          key_details: Array.isArray(res) ? res : [],
        }));

        const keyTitles = Array.isArray(res)
          ? res.map(item => ({ value: item.title, label: item.title }))
          : [];
        setOptions(keyTitles);
      } catch (error: any) {
        toast.error(error);
      }
    };

    getKeyList();
  }, [setState]);

  return (
    <div className={className}>
      <Button
        onClick={() => setShowModal(true)}
        size={'middle'}
        name={btnName}
        variant={ButtonVariants.PRIMARY}
      />
      <Modal
        title={Workspace.CreateWorkspace}
        centered={true}
        isOpen={showModal}
        sumbitHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={Workspace.Create}
        className="createWorkspace"
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
            variant={InputVariants.Filled}
            error={titleError}
          />
          <label htmlFor="" className="pl-2 font-poppins text-gray300 pb-1">
            {'Select Key'}
          </label>
          <Select
            options={options}
            value={modal_key}
            onChange={handleSelectChange}
            className="filled w-full"
            size="large"
            error={modal_keyError}
          />
          <div className="pt-4">
            <Button
              size={undefined}
              variant={ButtonVariants.SECONDARY_LINK}
              name={Workspace.AddKey}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
