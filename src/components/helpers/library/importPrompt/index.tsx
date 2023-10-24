import React, { useEffect } from 'react';

import { toast } from 'react-toastify';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { Button, Modal, Select, Text } from 'components/common';
import {
  keyOptionsState,
  workspaceState,
  importPromptState,
  generateOutputState,
} from 'middleware/state';
import { ButtonVariants, Paths, TextVariants } from 'utils/constants';
import { GetAllWorkspaces } from 'middleware/api';
import { Link, useNavigate } from 'react-router-dom';
import { isWorkspaceIDValidated } from 'utils/validations';

interface ImportPromptProps {
  isOpen: boolean;
  cancelModalHandler: React.Dispatch<React.SetStateAction<boolean>>;
  tags: [];
  promptTitle: string;
  systemMessage: string;
  userMessage: string;
  promptID: string;
  bookmarked: boolean;
  sample_output: [];
}

const ImportPrompt: React.FC<ImportPromptProps> = ({
  isOpen,
  cancelModalHandler,
  tags,
  promptTitle,
  systemMessage,
  userMessage,
  promptID,
  bookmarked,
  sample_output,
}) => {
  const navigate = useNavigate();

  const [{ options }, setOptionsState] = useRecoilState(keyOptionsState);
  const [, setOutputState] = useRecoilState(generateOutputState);
  const [importState, setImportState] = useRecoilState(importPromptState);
  const [, setWorkspaceState] = useRecoilState(workspaceState);

  const resetImportPromptState = useResetRecoilState(importPromptState);

  const { workspaceID, workspaceIdError } = importState;

  const handleSelectChange = (workspaceID: string) => {
    setImportState(old => ({
      ...old,
      workspaceID,
      workspaceIdError: isWorkspaceIDValidated(workspaceID),
    }));
  };

  const handleSubmit = () => {
    if (workspaceID === '') {
      setImportState(old => ({
        ...old,
        workspaceIdError: isWorkspaceIDValidated(workspaceID),
      }));
      return;
    }
    const formattedTags = tags.map(tag => tag).join(', ');
    setOutputState(old => ({
      ...old,
      title: promptTitle,
      prompt_type: 'Completion',
      is_public: false,
      workspace: workspaceID,
      tags: formattedTags,
      system_message: systemMessage,
      user_message: userMessage,
      uuid: promptID,
      bookmarked: bookmarked,
      isLoading: false,
      output: sample_output,
    }));
    navigate(`/home/workspace/${workspaceID}`);
    resetImportPromptState();
  };

  useEffect(() => {
    const getAllWorkspaces = async () => {
      try {
        const response = await GetAllWorkspaces();

        if (response.status === 200) {
          const res = response.data;
          setWorkspaceState(old => ({
            ...old,
            workspace_details: Array.isArray(res.results) ? res.results : [],
          }));

          const workspaceInfo = Array.isArray(res.results)
            ? res.results.map((item: { id: any; title: any }) => ({
                value: item.id,
                label: item.title,
              }))
            : [];

          setOptionsState(old => ({
            ...old,
            options: workspaceInfo,
          }));
          return;
        } else {
          return;
        }
      } catch (error: any) {
        toast.error(error);
      }
    };

    if (isOpen) getAllWorkspaces();
  }, [setWorkspaceState, setOptionsState, isOpen]);

  return (
    <Modal
      title={'Import Prompt'}
      centered={true}
      isOpen={isOpen}
      okText={'Import'}
      className="library"
      cancelModalHandler={() => {
        cancelModalHandler(false);
        resetImportPromptState();
      }}
      sumbitHandler={handleSubmit}
    >
      <div>
        <label htmlFor="" className="pl-2 font-poppins text-gray300 pb-1">
          {'Select Workspace'}
        </label>
        <Select
          options={options}
          value={workspaceID}
          onChange={handleSelectChange}
          className="filled w-full"
          size="large"
          error={workspaceIdError}
        />
        <div className="w-full text-center pt-2">
          <Text variant={TextVariants.MEDIUM} children={'OR'} />
        </div>
        <div className="w-full justify-center">
          <Link to={Paths.Workspace}>
            <Button
              variant={ButtonVariants.SECONDARY_LINK}
              name={'Create Workspace'}
            />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ImportPrompt;
