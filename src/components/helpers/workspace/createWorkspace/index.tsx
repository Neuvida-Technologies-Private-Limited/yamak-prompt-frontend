import React, { useState, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Input, Modal, Select } from 'components/common';
import {
  Workspace,
  InputVariants,
  ButtonVariants,
  Paths,
} from 'utils/constants';
import {
  createWorkspaceState,
  keyManagementState,
  keyOptionsState,
} from 'middleware/state';
import {
  isWorkspaceTitleValidated,
  isWorkspaceModalKeyValidated,
  IsCreateWorkspaceFormValidated,
} from 'utils/validations';
import { getKeyList } from 'middleware/api';
import { paginationState } from 'middleware/state/pagination';

interface CreateWorkspaceProps {
  btnName: string;
  className?: string;
  createWorkspace: () => Promise<boolean>;
}

const App: React.FC<CreateWorkspaceProps> = ({
  btnName,
  className,
  createWorkspace,
}) => {
  const [state, setState] = useRecoilState(createWorkspaceState);
  const [keystate, setKeyState] = useRecoilState(keyManagementState);
  const [optionsState, setOptionsState] = useRecoilState(keyOptionsState);
  const resetState = useResetRecoilState(createWorkspaceState);
  const [pagination, setPaginationState] = useRecoilState(paginationState);

  const [showModal, setShowModal] = useState(false);

  const { title, titleError, model_key, model_keyError } = state;
  const { options } = optionsState;

  const handleTitleChange = (title: string) => {
    setState(old => ({
      ...old,
      title,
      titleError: isWorkspaceTitleValidated(title),
    }));
  };
  const handleSelectChange = (model_key: string) => {
    setState(old => ({
      ...old,
      model_key,
      model_keyError: isWorkspaceModalKeyValidated(model_key),
    }));
  };

  //handling submit in modal -> api call to create workspace
  const handleSubmit = async () => {
    setState(old => ({
      ...old,
      isLoading: true,
      titleError: isWorkspaceTitleValidated(title),
      model_keyError: isWorkspaceModalKeyValidated(model_key),
    }));

    if (!IsCreateWorkspaceFormValidated(title, model_key)) {
      return;
    }

    if (await createWorkspace()) {
      setShowModal(false);
      resetState();
    } else {
      toast.error('Error in creating key or token expired, Login again !');
    }
  };
  //api call to get key list in select
  useEffect(() => {
    const getKeys = async () => {
      try {
        const res = await getKeyList(pagination.currentPage);

        setKeyState(old => ({
          ...old,
          results: Array.isArray(res.results) ? res.results : [],
        }));

        const keyInfo = Array.isArray(res.results)
          ? res.results.map((item: { uuid: any; title: any }) => ({
              value: item.uuid,
              label: item.title,
            }))
          : [];

        setOptionsState(old => ({
          ...old,
          options: keyInfo,
        }));
      } catch (error: any) {
        toast.error(error);
      }
    };

    getKeys();
  }, [pagination.currentPage, setKeyState, setOptionsState]);

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
        sumbitHandler={handleSubmit}
        cancelModalHandler={() => {
          setShowModal(false);
          resetState();
        }}
        okText={Workspace.Create}
        className="createWorkspace" //TODO: Will discuss that without classname , how to implement only one button
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
            value={title}
            variant={InputVariants.Filled}
            error={titleError}
          />
          <label htmlFor="" className="pl-2 font-poppins text-gray300 pb-1">
            {Workspace.SelectKey}
          </label>
          <Select
            options={options}
            value={model_key}
            onChange={handleSelectChange}
            className="filled w-full"
            size="large"
            error={model_keyError}
          />
          <div className="pt-4">
            <Link to={Paths.KeyManagement}>
              <Button
                size={undefined}
                variant={ButtonVariants.SECONDARY_LINK}
                name={Workspace.AddKey}
              />
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
