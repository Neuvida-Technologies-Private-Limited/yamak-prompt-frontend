import React, { useState } from 'react';
import { FiInfo, FiSliders } from 'react-icons/fi';
import { useRecoilState } from 'recoil';

import { Button, Input, Tooltip, Modal, Slider } from 'components/common';
import { Workspace, InputVariants, ButtonVariants } from 'utils/constants';
import { Types } from './types';
import {
  generateChatOutputState,
  generateOutputState,
  workspaceInfoState,
} from 'middleware/state';

const handleChange = () => {};

const Parameters: React.FC = () => {
  const [{ activeTab }] = useRecoilState(workspaceInfoState);
  const [showModal, setShowModal] = useState(false);
  const [outputState, setOutputState] = useRecoilState(
    activeTab === '1' ? generateOutputState : generateChatOutputState
  );

  const {
    parameters: {
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
      logit_bias,
    },
  } = outputState;

  const temperatureSliderChange = (temperature: number) => {
    setOutputState(old => ({
      ...old,
      parameters: {
        ...old.parameters,
        temperature,
      },
    }));
  };
  const max_tokensSliderChange = (max_tokens: number) => {
    setOutputState(old => ({
      ...old,
      parameters: {
        ...old.parameters,
        max_tokens,
      },
    }));
  };
  const topPSliderChange = (top_p: number) => {
    setOutputState(old => ({
      ...old,
      parameters: {
        ...old.parameters,
        top_p,
      },
    }));
  };
  const frequencyPenaltySliderChange = (frequency_penalty: number) => {
    setOutputState(old => ({
      ...old,
      parameters: {
        ...old.parameters,
        frequency_penalty,
      },
    }));
  };
  const presencePenaltySliderChange = (presence_penalty: number) => {
    setOutputState(old => ({
      ...old,
      parameters: {
        ...old.parameters,
        presence_penalty,
      },
    }));
  };
  const logit_biasChange = (logit_bias: number) => {
    setOutputState(old => ({
      ...old,
      parameters: {
        ...old.parameters,
        logit_bias,
      },
    }));
  };

  const parametersInputs: Types[] = [
    {
      label: 'Temperature',
      input: (
        <Slider
          onValueChange={temperatureSliderChange}
          min={0}
          max={2}
          defaultValue={1}
          step={0.01}
          value={temperature}
        />
      ),
      title: 'Temperature Info',
    },
    {
      label: 'Maximum Tokens',
      input: (
        <Slider
          onValueChange={max_tokensSliderChange}
          min={0}
          max={500}
          defaultValue={256}
          value={max_tokens}
        />
      ),
      title: 'Max Tokens Info * 10',
    },
    {
      label: 'Top P',
      input: (
        <Slider
          onValueChange={topPSliderChange}
          min={0}
          max={1}
          defaultValue={1}
          step={0.01}
          value={top_p}
        />
      ),
      title: 'Top Info',
    },
    {
      label: 'Frequency Penalty',
      input: (
        <Slider
          onValueChange={frequencyPenaltySliderChange}
          min={0}
          max={2}
          defaultValue={0}
          step={0.01}
          value={frequency_penalty}
        />
      ),
      title: 'Frequency Penalty Info',
    },
    {
      label: 'Presence Penalty',
      input: (
        <Slider
          onValueChange={presencePenaltySliderChange}
          min={0}
          max={2}
          defaultValue={0}
          value={presence_penalty}
          step={0.01}
        />
      ),
      title: 'Presence Penalty Info',
    },
    {
      label: 'Logit Bias',
      input: (
        <Input
          id={''}
          name={''}
          placeholder={'0'}
          onChange={value => logit_biasChange(Number(value))}
          className="!w-2/3"
          variant={InputVariants.Filled}
          value={logit_bias.toString()}
        />
      ),
      title: 'Logit Bias Info',
    },
  ];

  return (
    <>
      {/* Button visible in tab and desktop view */}
      <Button
        onClick={() => setShowModal(true)}
        size={'middle'}
        variant={ButtonVariants.PRIMARY_LINK}
        type="text"
        name={Workspace.Parameters}
        className="md:flex sm:hidden"
      />
      {/* Button visible in mobile view */}
      <Button
        onClick={() => setShowModal(true)}
        size={'middle'}
        variant={ButtonVariants.OUTLINED_LIGHT}
        icon={<FiSliders />}
        className="sm:flex md:!hidden"
      />
      <Modal
        title={Workspace.Parameters}
        centered={true}
        isOpen={showModal}
        sumbitHandler={() => setShowModal(true)}
        cancelModalHandler={() => setShowModal(false)}
        okText={Workspace.AddPrompt}
        className="parameters em:!w-1/2 sm:!w-full"
      >
        <div className="flex flex-col">
          <form action="#" method="post">
            <div className="flex w-full flex-col">
              {parametersInputs.map((items, index) => (
                <div
                  key={`parameter-item-${index}`}
                  className="flex sm:!flex-wrap items-center"
                >
                  <div className="em:w-1/3 sm:w-full flex items-center">
                    <label className="p-3">{items.label}</label>
                    <Tooltip element={<FiInfo />} title={items.title} />
                  </div>
                  <div className="em:w-2/3 sm:w-full">{items.input}</div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Parameters;
